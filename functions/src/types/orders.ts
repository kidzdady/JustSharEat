import * as admin from 'firebase-admin';
import { UserRole } from './users'; // Assuming users.ts is in the same directory
import { DealItem } from './deals'; // Assuming deals.ts is in the same directory

type Timestamp = admin.firestore.Timestamp;
// type GeoPoint = admin.firestore.GeoPoint; // Not directly needed for order types but good to have if location is involved

export enum OrderStatus {
  PENDING_PAYMENT = 'pending_payment', // For online payments, awaiting confirmation
  PENDING_CONFIRMATION = 'pending_confirmation', // Seller needs to confirm the order
  PROCESSING = 'processing', // Seller confirmed, preparing food
  READY_FOR_PICKUP = 'ready_for_pickup',
  // OUT_FOR_DELIVERY = 'out_for_delivery', // For future delivery feature
  COMPLETED = 'completed', // Picked up by consumer / Delivered
  CANCELLED_BY_CONSUMER = 'cancelled_by_consumer',
  CANCELLED_BY_SELLER = 'cancelled_by_seller',
  CANCELLED_SYSTEM = 'cancelled_system', // e.g., payment failed, deal expired before pickup
  DONATED = 'donated', // If the order was a donation
  // REFUNDED = 'refunded', // For future
}

export enum CollectionType {
  PICKUP = 'pickup',
  // DELIVERY = 'delivery', // For future
  DONATION = 'donation',
}

export enum PaymentMethod {
  PAY_ON_PICKUP = 'pay_on_pickup', // Cash or M-PESA at store
  MPESA_ONLINE = 'mpesa_online', // STK Push
  // CARD_ONLINE = 'card_online', // Future
}

export enum PaymentStatus {
  NOT_APPLICABLE = 'not_applicable', // e.g. for pay_on_pickup before actual payment, or free donation
  PENDING = 'pending', // Online payment initiated, awaiting confirmation
  SUCCESSFUL = 'successful',
  FAILED = 'failed',
  REFUNDED = 'refunded', // Future
}

// Represents a single item within an order
export interface OrderItem {
  dealId: string;
  dealSnapshot: Partial<DealItem>; // A snapshot of the deal at the time of order
  quantity: number;
  pricePerItem: number; // Price at which it was sold (discountedPrice from DealItem)
  itemName: string; // Denormalized from DealItem for convenience
  sellerId: string; // Denormalized
}

// Main Order document structure
export interface Order {
  orderId: string; // Document ID
  consumerId: string; // UID of the consumer
  consumerName?: string; // Denormalized
  consumerPhoneNumber?: string; // Denormalized

  items: OrderItem[]; // Array of items in the order
  
  sellerIds: string[]; // Array of unique seller UIDs involved in this order (usually one, but could be multiple if cart allows from diff sellers)

  subtotalAmount: number; // Sum of (pricePerItem * quantity) for all items
  // deliveryFee: number; // For future
  // serviceFee: number; // Optional
  totalAmount: number; // Final amount to be paid

  status: OrderStatus;
  collectionType: CollectionType;
  
  // Pickup details (if collectionType is PICKUP)
  // Pickup location is implicitly the seller's location from the deal(s)
  pickupNotes?: string; // Consumer's notes for pickup

  // Payment details
  paymentMethod?: PaymentMethod; // Undefined if donation
  paymentStatus: PaymentStatus;
  paymentTransactionId?: string; // e.g., M-PESA transaction code
  paidAt?: Timestamp;

  // Donation details (if collectionType is DONATION)
  donatedToNgoId?: string; // UID of the NGO if specified, or if auto-matched
  isAnonymousDonation?: boolean;

  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
  // estimatedPickupTime?: Timestamp; // Could be derived or set by seller
  completedAt?: Timestamp; // When order status becomes COMPLETED or CANCELLED
  cancellationReason?: string; // Reason if order is cancelled
}

// Data structure for creating a new order (callable function input)
export interface PlaceOrderData {
  cartItems: Array<{
    dealId: string;
    quantity: number;
  }>;
  collectionType: CollectionType;
  pickupNotes?: string;
  paymentMethod?: PaymentMethod; // Required if not a donation
  // For M-PESA online
  mpesaPhoneNumber?: string; // If paymentMethod is MPESA_ONLINE

  // For donation
  donatedToNgoId?: string;
  isAnonymousDonation?: boolean;
}