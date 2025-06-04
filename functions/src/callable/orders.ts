import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/v1/https';
import { UserProfile, UserRole, ConsumerProfile, SellerProfile } from '../types/users'; // Added SellerProfile
import { DealItem, DealStatus } from '../types/deals';
import { Order, OrderItem, OrderStatus, CollectionType, PaymentMethod, PaymentStatus, PlaceOrderData } from '../types/orders';

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();
const logger = functions.logger;

export const placeOrder = functions.https.onCall(async (request: any) => { // Let context type be inferred
  const auth = request.auth;
  if (!auth) { // Guard auth
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated to place an order.');
  }

  const uid = auth.uid;
  const orderData = request.data as PlaceOrderData;
  const { cartItems, collectionType, pickupNotes, paymentMethod } = orderData;

  logger.info(`Attempting to place order for UID: ${uid}`, orderData);

  if (!cartItems || cartItems.length === 0) {
    throw new functions.https.HttpsError('invalid-argument', 'Cart cannot be empty.');
  }
  if (!collectionType) {
    throw new functions.https.HttpsError('invalid-argument', 'Collection type is required.');
  }

  // For Phase 1: Only Pickup and Pay on Pickup are supported
  if (collectionType !== CollectionType.PICKUP) {
    throw new functions.https.HttpsError('invalid-argument', `Collection type '${collectionType}' is not supported yet.`);
  }
  if (paymentMethod && paymentMethod !== PaymentMethod.PAY_ON_PICKUP) {
    throw new functions.https.HttpsError('invalid-argument', `Payment method '${paymentMethod}' is not supported yet for pickup.`);
  }
  
  const finalPaymentMethod = paymentMethod || PaymentMethod.PAY_ON_PICKUP; // Default for Phase 1 pickup

  const userRef = db.collection('users').doc(uid);

  try {
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      throw new functions.https.HttpsError('not-found', `User profile for UID ${uid} not found.`);
    }
    const consumerProfile = userDoc.data() as ConsumerProfile; // Assuming consumer places order

    const orderItems: OrderItem[] = [];
    let subtotalAmount = 0;
    const sellerIdsInOrder: Set<string> = new Set();

    // Use a Firestore transaction to ensure atomicity when reading deals and updating quantities
    await db.runTransaction(async (transaction) => {
      for (const cartItem of cartItems) {
        const dealRef = db.collection('deals').doc(cartItem.dealId);
        const dealDoc = await transaction.get(dealRef);

        if (!dealDoc.exists) {
          throw new functions.https.HttpsError('not-found', `Deal with ID ${cartItem.dealId} not found.`);
        }

        const deal = dealDoc.data() as DealItem;

        if (deal.status !== DealStatus.AVAILABLE) {
          throw new functions.https.HttpsError('failed-precondition', `Deal '${deal.itemName}' is no longer available.`);
        }
        if (deal.quantityRemaining < cartItem.quantity) {
          throw new functions.https.HttpsError('failed-precondition', `Not enough quantity for '${deal.itemName}'. Available: ${deal.quantityRemaining}.`);
        }

        orderItems.push({
          dealId: deal.id,
          dealSnapshot: { // Store a partial snapshot
            itemName: deal.itemName,
            imageUrls: deal.imageUrls,
            sellerId: deal.sellerId,
            sellerName: deal.sellerName,
            originalPrice: deal.originalPrice,
            discountedPrice: deal.discountedPrice,
          },
          quantity: cartItem.quantity,
          pricePerItem: deal.discountedPrice,
          itemName: deal.itemName,
          sellerId: deal.sellerId,
        });
        subtotalAmount += deal.discountedPrice * cartItem.quantity;
        sellerIdsInOrder.add(deal.sellerId);

        // Decrease quantityRemaining for the deal
        const newQuantityRemaining = deal.quantityRemaining - cartItem.quantity;
        const newStatus = newQuantityRemaining === 0 ? DealStatus.SOLD_OUT : deal.status;
        transaction.update(dealRef, {
          quantityRemaining: newQuantityRemaining,
          status: newStatus,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      }
    }); // End of transaction

    const totalAmount = subtotalAmount; // For Phase 1, no delivery/service fees
    const newOrderRef = db.collection('orders').doc(); // Auto-generate ID

    const orderPayload: Order = {
      orderId: newOrderRef.id,
      consumerId: uid,
      consumerName: consumerProfile.displayName || undefined,
      consumerPhoneNumber: consumerProfile.phoneNumber || undefined,
      items: orderItems,
      sellerIds: Array.from(sellerIdsInOrder),
      subtotalAmount,
      totalAmount,
      status: OrderStatus.PENDING_CONFIRMATION, // Seller needs to confirm for "Pay on Pickup"
      collectionType: CollectionType.PICKUP,
      pickupNotes: pickupNotes || '',
      paymentMethod: finalPaymentMethod,
      paymentStatus: PaymentStatus.NOT_APPLICABLE, // For "Pay on Pickup", actual payment is later
      createdAt: admin.firestore.FieldValue.serverTimestamp() as admin.firestore.Timestamp,
      updatedAt: admin.firestore.FieldValue.serverTimestamp() as admin.firestore.Timestamp,
    };

    await newOrderRef.set(orderPayload);
    logger.info(`Order placed successfully by UID: ${uid}, Order ID: ${newOrderRef.id}`, orderPayload);

    // TODO: Send notification to seller(s) involved in `sellerIdsInOrder`

    return { success: true, message: 'Order placed successfully.', orderId: newOrderRef.id, order: orderPayload };

  } catch (error: any) {
    logger.error(`Error placing order for UID: ${uid}`, error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError('internal', 'Failed to place order.', error.message);
  }
});


interface UpdateOrderStatusData {
  orderId: string;
  newStatus: OrderStatus;
  // Optional: if seller cancels, they might provide a reason
  cancellationReason?: string;
  // Optional: if marking as paid for pay_on_pickup
  paymentReceived?: boolean;
}

export const updateOrderStatusBySeller = functions.https.onCall(async (request: any) => { // Explicitly type context
  const auth = request.auth;
  if (!auth) { // auth should be checked directly
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated.');
  }
  const uid = auth.uid;
  const { orderId, newStatus, cancellationReason, paymentReceived } = request.data as UpdateOrderStatusData;

  logger.info(`Seller ${uid} attempting to update order ${orderId} to status ${newStatus}`);

  if (!orderId || !newStatus) {
    throw new functions.https.HttpsError('invalid-argument', 'Order ID and new status are required.');
  }

  // Validate allowed status transitions by seller
  const allowedSellerStatuses = [
    OrderStatus.PROCESSING, // Confirming PENDING_CONFIRMATION
    OrderStatus.READY_FOR_PICKUP,
    OrderStatus.COMPLETED, // After consumer picks up
    OrderStatus.CANCELLED_BY_SELLER,
  ];
  if (!allowedSellerStatuses.includes(newStatus)) {
    throw new functions.https.HttpsError('invalid-argument', `Status ${newStatus} is not a valid transition by seller.`);
  }

  const orderRef = db.collection('orders').doc(orderId);
  const sellerUserRef = db.collection('users').doc(uid);

  try {
    const sellerDoc = await sellerUserRef.get();
    if (!sellerDoc.exists || (sellerDoc.data() as SellerProfile).role !== UserRole.SELLER) {
        throw new functions.https.HttpsError('permission-denied', 'Only sellers can update order status.');
    }

    await db.runTransaction(async (transaction) => {
      const orderDoc = await transaction.get(orderRef);
      if (!orderDoc.exists) {
        throw new functions.https.HttpsError('not-found', `Order ${orderId} not found.`);
      }
      const order = orderDoc.data() as Order;

      // Verify this seller is part of the order
      if (!order.sellerIds.includes(uid)) {
        throw new functions.https.HttpsError('permission-denied', 'You are not authorized to update this order.');
      }

      // Basic state machine logic (can be expanded)
      if (order.status === OrderStatus.COMPLETED || order.status === OrderStatus.CANCELLED_BY_CONSUMER || order.status === OrderStatus.CANCELLED_BY_SELLER || order.status === OrderStatus.CANCELLED_SYSTEM) {
        throw new functions.https.HttpsError('failed-precondition', `Order is already finalized or cancelled and cannot be updated to ${newStatus}.`);
      }
      
      if (order.status === OrderStatus.PENDING_CONFIRMATION && newStatus !== OrderStatus.PROCESSING && newStatus !== OrderStatus.CANCELLED_BY_SELLER) {
          throw new functions.https.HttpsError('failed-precondition', `Order pending confirmation can only be moved to PROCESSING or CANCELLED_BY_SELLER.`);
      }
      // Add more specific transition checks as needed...


      const updatePayload: Partial<Order> & { updatedAt: admin.firestore.Timestamp } = {
        status: newStatus,
        updatedAt: admin.firestore.FieldValue.serverTimestamp() as admin.firestore.Timestamp,
      };

      if (newStatus === OrderStatus.CANCELLED_BY_SELLER) {
        updatePayload.cancellationReason = cancellationReason || 'Cancelled by seller.';
        updatePayload.completedAt = admin.firestore.FieldValue.serverTimestamp() as admin.firestore.Timestamp;
        // TODO: Logic to revert deal quantities if order is cancelled by seller before pickup
        // This requires careful handling, especially if part of the deal was already sold.
        // For now, we'll skip automatic quantity reversion for simplicity in Phase 1.
        logger.info(`Order ${orderId} cancelled by seller. Deal quantity not automatically reverted in this phase.`);
      }
      
      if (newStatus === OrderStatus.COMPLETED) {
        updatePayload.completedAt = admin.firestore.FieldValue.serverTimestamp() as admin.firestore.Timestamp;
        if (order.paymentMethod === PaymentMethod.PAY_ON_PICKUP && paymentReceived) {
            updatePayload.paymentStatus = PaymentStatus.SUCCESSFUL;
            updatePayload.paidAt = admin.firestore.FieldValue.serverTimestamp() as admin.firestore.Timestamp;
        }
      }
      
      if (newStatus === OrderStatus.PROCESSING && order.status !== OrderStatus.PENDING_CONFIRMATION) {
          // This check is a bit redundant due to earlier checks but good for clarity
          throw new functions.https.HttpsError('failed-precondition', `Order status cannot be moved to PROCESSING from ${order.status}.`);
      }


      transaction.update(orderRef, updatePayload);
    }); // End transaction

    logger.info(`Order ${orderId} status updated to ${newStatus} by seller ${uid}.`);
    // TODO: Send notification to consumer about status update.

    const updatedOrderDoc = await orderRef.get();
    return { success: true, message: `Order status updated to ${newStatus}.`, order: updatedOrderDoc.data() };

  } catch (error: any) {
    logger.error(`Error updating order ${orderId} status by seller ${uid}:`, error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError('internal', 'Failed to update order status.', error.message);
  }
});