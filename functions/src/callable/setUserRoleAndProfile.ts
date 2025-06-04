import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/v1/https'; // Corrected import for CallableContext
import { UserRole, SellerProfile, NgoProfile, ConsumerProfile, UserProfile } from '../types/users';

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();
const logger = functions.logger;

interface SetUserRoleData {
  role: UserRole;
  // Seller specific
  businessName?: string;
  businessAddress?: string;
  // NGO specific
  ngoName?: string;
  ngoAddress?: string;
  // Common fields that might be updated during role selection
  displayName?: string;
  phoneNumber?: string;
}

export const setUserRoleAndProfile = functions.https.onCall(async (request: any) => { // Accept data as any
  const auth = request.auth;
  if (!auth) {
    logger.error('Authentication Error: User must be authenticated to set role.');
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated to set role.');
  }

  const uid = auth.uid;
  // Cast data to the expected type. Add validation here in a real app (e.g., with Zod).
  const { role, businessName, ngoName, displayName, phoneNumber, businessAddress, ngoAddress } = request.data as SetUserRoleData;

  logger.info(`Attempting to set role for UID: ${uid} to ${role}`, request.data);

  const userRef = db.collection('users').doc(uid);

  try {
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      logger.error(`User document not found for UID: ${uid}. This should not happen if onUserCreate trigger is working.`);
      throw new functions.https.HttpsError('not-found', `User profile for UID ${uid} not found.`);
    }

    const existingProfile = userDoc.data() as UserProfile; // Keep this to access existing common fields
    
    // Use Record<string, any> for the object being passed to Firestore update
    // to accommodate FieldValue.delete() without TypeScript strict type checking issues.
    const updatePayload: Record<string, any> = {
      role,
      updatedAt: admin.firestore.FieldValue.serverTimestamp() as admin.firestore.Timestamp,
    };

    // Update common fields if provided
    if (displayName !== undefined) updatePayload.displayName = displayName;
    if (phoneNumber !== undefined) updatePayload.phoneNumber = phoneNumber;

    switch (role) {
      case UserRole.CONSUMER:
        updatePayload.role = UserRole.CONSUMER;
        // Explicitly delete fields from other roles
        updatePayload.businessName = admin.firestore.FieldValue.delete();
        updatePayload.businessAddress = admin.firestore.FieldValue.delete();
        updatePayload.isVerified = admin.firestore.FieldValue.delete(); // Assuming isVerified is not on Consumer
        updatePayload.ngoName = admin.firestore.FieldValue.delete();
        updatePayload.ngoAddress = admin.firestore.FieldValue.delete();
        // Retain other common fields from existingProfile if not explicitly changed
        // No specific new fields for consumer in this update
        break;
      case UserRole.SELLER:
        if (!businessName) {
          throw new functions.https.HttpsError('invalid-argument', 'Business name is required for seller role.');
        }
        updatePayload.role = UserRole.SELLER;
        updatePayload.businessName = businessName;
        updatePayload.businessAddress = businessAddress || '';
        // Retain verification if already seller, otherwise set to false (or initial state)
        updatePayload.isVerified = (existingProfile.role === UserRole.SELLER && (existingProfile as SellerProfile).isVerified !== undefined)
                                      ? (existingProfile as SellerProfile).isVerified
                                      : false;
        // Delete NGO specific fields
        updatePayload.ngoName = admin.firestore.FieldValue.delete();
        updatePayload.ngoAddress = admin.firestore.FieldValue.delete();
        break;
      case UserRole.NGO:
        if (!ngoName) {
          throw new functions.https.HttpsError('invalid-argument', 'NGO name is required for NGO role.');
        }
        updatePayload.role = UserRole.NGO;
        updatePayload.ngoName = ngoName;
        updatePayload.ngoAddress = ngoAddress || '';
        updatePayload.isVerified = (existingProfile.role === UserRole.NGO && (existingProfile as NgoProfile).isVerified !== undefined)
                                      ? (existingProfile as NgoProfile).isVerified
                                      : false;
        // Delete Seller specific fields
        updatePayload.businessName = admin.firestore.FieldValue.delete();
        updatePayload.businessAddress = admin.firestore.FieldValue.delete();
        break;
      default:
        logger.error(`Invalid role specified: ${role}`);
        throw new functions.https.HttpsError('invalid-argument', 'Invalid role specified.');
    }

    await userRef.update(updatePayload);
    logger.info(`Successfully updated role and profile for UID: ${uid} to ${role}.`, updatePayload);
    // Fetch the updated document to return the complete profile
    const updatedDoc = await userRef.get();
    return { success: true, message: `User role updated to ${role}.`, profile: updatedDoc.data() as UserProfile };

  } catch (error: any) {
    logger.error(`Error setting user role for UID: ${uid}`, error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError('internal', 'Failed to set user role.', error.message);
  }
});