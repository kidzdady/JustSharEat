import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions/v1';
import { UserRecord } from 'firebase-functions/v1/auth';
import { UserProfile, UserRole, NewUserFirestoreData } from './types/users';
import { Order } from './types/orders'; // Import Order type

// Import callable functions
import { setUserRoleAndProfile } from './callable/setUserRoleAndProfile';
import {
  createDeal,
  getSellerDeals,
  getDealById,
  updateDeal,
  deleteDeal,
  browseAvailableDeals
} from './callable/deals';
import { placeOrder, updateOrderStatusBySeller } from './callable/orders';

// Initialize Firebase Admin SDK
// This should be done only once per function deployment.
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

/**
 * Triggered when a new Firebase Authentication user is created.
 * This function creates a corresponding user profile document in Firestore.
 */
export const onUserCreate = functions.auth.user().onCreate(async (user: UserRecord) => { // Explicitly type user
  const { uid, email, displayName, photoURL, phoneNumber } = user;
  const logger = functions.logger;

  logger.info(`New user signed up: UID: ${uid}, Email: ${email}`);

  // Default role for new users will be 'consumer'.
  // The role can be updated later through a separate function or admin action,
  // or if the client provides it during a custom sign-up flow.
  const defaultRole = UserRole.CONSUMER;

  const newUserProfileData: NewUserFirestoreData = {
    email: email || null,
    displayName: displayName || null,
    role: defaultRole,
    phoneNumber: phoneNumber || null,
    photoURL: photoURL || null,
    createdAt: admin.firestore.FieldValue.serverTimestamp() as admin.firestore.Timestamp,
    updatedAt: admin.firestore.FieldValue.serverTimestamp() as admin.firestore.Timestamp,
    isActive: true,
  };

  const userRef = db.collection('users').doc(uid);

  try {
    await userRef.set(newUserProfileData);
    logger.info(`User profile created in Firestore for UID: ${uid}`, newUserProfileData);

    // You could add more logic here, e.g., sending a welcome email.

  } catch (error) {
    logger.error(`Error creating user profile in Firestore for UID: ${uid}`, error);
    // Optionally, you could try to delete the Auth user if Firestore creation fails,
    // or add to a retry queue, depending on desired error handling strategy.
  }
});

/**
 * Triggered when a new Order document is created in Firestore.
 * This function will log a notification for the seller(s).
 */
export const onOrderCreateNotifySeller = functions.firestore
  .document('orders/{orderId}')
  .onCreate(async (snapshot, context) => {
    const logger = functions.logger;
    const orderId = context.params.orderId;
    const order = snapshot.data() as Order;

    if (!order) {
      logger.error(`Order data not found for onOrderCreate trigger, orderId: ${orderId}`);
      return;
    }

    logger.info(`New order created: ${orderId}, for consumer: ${order.consumerId}. Notifying sellers.`);

    // In a real app, you would look up seller details (e.g., FCM token, email)
    // and send them a proper notification (push, email, etc.)
    // For now, we just log for each seller involved.
    if (order.sellerIds && order.sellerIds.length > 0) {
      order.sellerIds.forEach(sellerId => {
        logger.info(`[Notification Simulation] Seller ${sellerId} has a new order: ${orderId}. Items: ${order.items.map(item => item.itemName).join(', ')}`);
        // Example: db.collection('users').doc(sellerId).collection('notifications').add({...});
      });
    } else {
      logger.warn(`Order ${orderId} has no sellerIds specified.`);
    }
  });

// Placeholder for future functions
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Export callable functions
export {
  setUserRoleAndProfile,
  createDeal,
  getSellerDeals,
  getDealById,
  updateDeal,
  deleteDeal,
  browseAvailableDeals,
  // placeOrder, // This was already added in the file content from previous step
  updateOrderStatusBySeller,
};