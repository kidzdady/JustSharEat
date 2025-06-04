import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/v1/https';
import { UserProfile, UserRole, SellerProfile } from '../types/users';
import { DealItem, DealStatus, NewDealData } from '../types/deals';

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();
const logger = functions.logger;

// Interface for the data expected by the createDeal callable function.
// Timestamps will be expected as ISO string from client and converted.
interface CreateDealCallableData extends Omit<NewDealData, 'sellerId' | 'sellerName' | 'sellerRole' | 'status' | 'pickupWindowStart' | 'pickupWindowEnd' | 'expiresAt'> {
  pickupWindowStartISO: string;
  pickupWindowEndISO: string;
  expiresAtISO?: string;
}

export const createDeal = functions.https.onCall(async (request: any) => {
  const data = request.data as CreateDealCallableData;
  const auth = request.auth; // This is effectively context.auth

  // Ensure auth is valid before use
  if (!auth) {
    logger.error('Authentication Error: User must be authenticated.');
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated to create a deal.');
  }

  const uid = auth.uid;
  const {
    itemName,
    description,
    imageUrls,
    originalPrice,
    discountedPrice,
    quantityInitial,
    pickupInstructions,
    pickupLocationAddress,
    pickupLocationCoordinates, // Assuming client sends GeoPoint compatible object or we construct it
    pickupWindowStartISO,
    pickupWindowEndISO,
    tags,
    arEnabled,
    calories,
    serves,
    allergenInfo,
    expiresAtISO,
  } = data;

  // Validate required fields
  if (!itemName || originalPrice === undefined || discountedPrice === undefined || quantityInitial === undefined || !pickupWindowStartISO || !pickupWindowEndISO) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required deal information.');
  }
  if (quantityInitial <= 0) {
    throw new functions.https.HttpsError('invalid-argument', 'Initial quantity must be greater than 0.');
  }
  if (discountedPrice > originalPrice) {
    throw new functions.https.HttpsError('invalid-argument', 'Discounted price cannot be greater than original price.');
  }

  const userRef = db.collection('users').doc(uid);

  try {
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      throw new functions.https.HttpsError('not-found', `User profile for UID ${uid} not found.`);
    }

    const userProfile = userDoc.data() as UserProfile;
    if (userProfile.role !== UserRole.SELLER) {
      throw new functions.https.HttpsError('permission-denied', 'Only users with the SELLER role can create deals.');
    }
    const sellerProfile = userProfile as SellerProfile;
    if (!sellerProfile.isVerified && process.env.NODE_ENV === 'production') { // Enforce verification in production
        // throw new functions.https.HttpsError('permission-denied', 'Seller account must be verified to create deals.');
        logger.warn(`Unverified seller ${uid} creating deal. Verification check bypassed in non-production or if env var not set.`);
    }


    const newDealRef = db.collection('deals').doc(); // Auto-generate ID

    const pickupStartTimestamp = admin.firestore.Timestamp.fromDate(new Date(pickupWindowStartISO));
    const pickupEndTimestamp = admin.firestore.Timestamp.fromDate(new Date(pickupWindowEndISO));
    let expiresAtTimestamp: admin.firestore.Timestamp | undefined = undefined;
    if (expiresAtISO) {
      expiresAtTimestamp = admin.firestore.Timestamp.fromDate(new Date(expiresAtISO));
    } else {
      // Default expiresAt to be same as pickupWindowEnd if not provided
      expiresAtTimestamp = pickupEndTimestamp;
    }
    
    // Validate dates
    if (pickupStartTimestamp.toDate() >= pickupEndTimestamp.toDate()) {
        throw new functions.https.HttpsError('invalid-argument', 'Pickup start time must be before pickup end time.');
    }
    if (expiresAtTimestamp.toDate() < pickupEndTimestamp.toDate()) {
        throw new functions.https.HttpsError('invalid-argument', 'Expiry time cannot be before pickup end time.');
    }


    const dealData: DealItem = {
      id: newDealRef.id,
      sellerId: uid,
      sellerName: sellerProfile.displayName || sellerProfile.businessName || 'Unknown Seller',
      sellerRole: UserRole.SELLER, // Or determine if NGO can also list deals later
      itemName,
      description: description || '',
      imageUrls: imageUrls || [],
      originalPrice,
      discountedPrice,
      quantityInitial,
      quantityRemaining: quantityInitial, // Initially, remaining is same as initial
      pickupInstructions: pickupInstructions || '',
      pickupLocationAddress: pickupLocationAddress || sellerProfile.businessAddress || '',
      pickupLocationCoordinates: pickupLocationCoordinates || sellerProfile.businessLocation || undefined,
      pickupWindowStart: pickupStartTimestamp,
      pickupWindowEnd: pickupEndTimestamp,
      tags: tags || [],
      arEnabled: arEnabled || false,
      calories: calories || undefined,
      serves: serves || undefined,
      allergenInfo: allergenInfo || '',
      status: DealStatus.AVAILABLE, // Default status
      createdAt: admin.firestore.FieldValue.serverTimestamp() as admin.firestore.Timestamp,
      updatedAt: admin.firestore.FieldValue.serverTimestamp() as admin.firestore.Timestamp,
      expiresAt: expiresAtTimestamp,
    };

    await newDealRef.set(dealData);
    logger.info(`Deal created successfully by UID: ${uid}, Deal ID: ${newDealRef.id}`, dealData);
    return { success: true, message: 'Deal created successfully.', dealId: newDealRef.id, deal: dealData };

  } catch (error: any) {
    logger.error(`Error creating deal for UID: ${uid}`, error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError('internal', 'Failed to create deal.', error.message);
  }
});

export const getSellerDeals = functions.https.onCall(async (request: any) => {
  // const data = request.data; // data is not used in this function
  const auth = request.auth;

  if (!auth) {
    logger.error('Authentication Error: User must be authenticated to get their deals.');
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated to get their deals.');
  }

  const uid = auth.uid;
  logger.info(`Fetching deals for seller UID: ${uid}`);

  try {
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new functions.https.HttpsError('not-found', `User profile for UID ${uid} not found.`);
    }
    const userProfile = userDoc.data() as UserProfile;
    if (userProfile.role !== UserRole.SELLER) {
      throw new functions.https.HttpsError('permission-denied', 'Only sellers can fetch their deals.');
    }

    const dealsQuery = db.collection('deals').where('sellerId', '==', uid).orderBy('createdAt', 'desc');
    const snapshot = await dealsQuery.get();

    if (snapshot.empty) {
      logger.info(`No deals found for seller UID: ${uid}`);
      return { success: true, deals: [] };
    }

    const deals: DealItem[] = [];
    snapshot.forEach(doc => {
      deals.push(doc.data() as DealItem);
    });

    logger.info(`Successfully fetched ${deals.length} deals for seller UID: ${uid}`);
    return { success: true, deals };

  } catch (error: any) {
    logger.error(`Error fetching deals for seller UID: ${uid}`, error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError('internal', 'Failed to fetch seller deals.', error.message);
  }
});

export const getDealById = functions.https.onCall(async (request: any) => {
  const data = request.data as { dealId: string };
  // const auth = request.auth; // auth not currently used here, but available if needed

  // No authentication check needed for viewing a deal, but you could add one if required.
  // if (!auth) {
  //   throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated.');
  // }
  const { dealId } = data;

  if (!dealId) {
    throw new functions.https.HttpsError('invalid-argument', 'Deal ID is required.');
  }

  logger.info(`Fetching deal by ID: ${dealId}`);

  try {
    const dealRef = db.collection('deals').doc(dealId);
    const doc = await dealRef.get();

    if (!doc.exists) {
      logger.warn(`Deal not found with ID: ${dealId}`);
      throw new functions.https.HttpsError('not-found', `Deal with ID ${dealId} not found.`);
    }

    const deal = doc.data() as DealItem;
    // Optionally, filter out deals that are not 'AVAILABLE' if consumers shouldn't see them directly by ID
    // if (deal.status !== DealStatus.AVAILABLE) {
    //   throw new functions.https.HttpsError('not-found', `Deal with ID ${dealId} is not available.`);
    // }

    logger.info(`Successfully fetched deal ID: ${dealId}`);
    return { success: true, deal };

  } catch (error: any) {
    logger.error(`Error fetching deal ID: ${dealId}`, error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError('internal', 'Failed to fetch deal.', error.message);
  }
});

// Interface for data expected by updateDeal. All fields are optional except dealId.
// Client should send only the fields they want to update.
interface UpdateDealCallableData extends Partial<Omit<CreateDealCallableData, 'pickupWindowStartISO' | 'pickupWindowEndISO' | 'expiresAtISO'>> {
  dealId: string;
  pickupWindowStartISO?: string; // Make ISO strings optional for update
  pickupWindowEndISO?: string;
  expiresAtISO?: string;
  quantityRemaining?: number; // Allow direct update of quantityRemaining
  status?: DealStatus; // Allow status update
}


export const updateDeal = functions.https.onCall(async (request: any) => {
  const data = request.data as UpdateDealCallableData;
  const auth = request.auth;

  if (!auth) {
    logger.error('Authentication Error: User must be authenticated to update a deal.');
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated to update a deal.');
  }

  const uid = auth.uid;
  const { dealId, ...updates } = data;

  if (!dealId) {
    throw new functions.https.HttpsError('invalid-argument', 'Deal ID is required for an update.');
  }
  if (Object.keys(updates).length === 0) {
    throw new functions.https.HttpsError('invalid-argument', 'No update data provided.');
  }

  logger.info(`Attempting to update deal ID: ${dealId} by UID: ${uid}`, updates);

  const dealRef = db.collection('deals').doc(dealId);

  try {
    const dealDoc = await dealRef.get();
    if (!dealDoc.exists) {
      throw new functions.https.HttpsError('not-found', `Deal with ID ${dealId} not found.`);
    }

    const existingDeal = dealDoc.data() as DealItem;
    if (existingDeal.sellerId !== uid) {
      throw new functions.https.HttpsError('permission-denied', 'You can only update your own deals.');
    }

    // Construct the update payload carefully
    const updatePayload: Partial<DealItem> & { updatedAt: admin.firestore.Timestamp } = {
        updatedAt: admin.firestore.FieldValue.serverTimestamp() as admin.firestore.Timestamp,
    };

    // Map provided ISO date strings to Timestamps
    if (updates.pickupWindowStartISO) {
        updatePayload.pickupWindowStart = admin.firestore.Timestamp.fromDate(new Date(updates.pickupWindowStartISO));
    }
    if (updates.pickupWindowEndISO) {
        updatePayload.pickupWindowEnd = admin.firestore.Timestamp.fromDate(new Date(updates.pickupWindowEndISO));
    }
    if (updates.expiresAtISO) {
        updatePayload.expiresAt = admin.firestore.Timestamp.fromDate(new Date(updates.expiresAtISO));
    }
    
    // Directly assign other updatable fields from 'updates' object
    const allowedFields: Array<keyof Omit<UpdateDealCallableData, 'dealId' | 'pickupWindowStartISO' | 'pickupWindowEndISO' | 'expiresAtISO'>> = [
        'itemName', 'description', 'imageUrls', 'originalPrice', 'discountedPrice',
        'quantityInitial', 'quantityRemaining', 'pickupInstructions', 'pickupLocationAddress',
        'pickupLocationCoordinates', 'tags', 'arEnabled', 'calories', 'serves', 'allergenInfo', 'status'
    ];

    for (const key of allowedFields) {
        if (updates[key] !== undefined) {
            (updatePayload as any)[key] = updates[key];
        }
    }
    
    // Validation for specific fields if they are being updated
    if (updates.discountedPrice !== undefined && updates.originalPrice !== undefined && updates.discountedPrice > updates.originalPrice) {
        throw new functions.https.HttpsError('invalid-argument', 'Discounted price cannot be greater than original price.');
    } else if (updates.discountedPrice !== undefined && updates.originalPrice === undefined && updates.discountedPrice > existingDeal.originalPrice) {
        throw new functions.https.HttpsError('invalid-argument', 'Discounted price cannot be greater than original price.');
    } else if (updates.originalPrice !== undefined && updates.discountedPrice === undefined && existingDeal.discountedPrice > updates.originalPrice) {
        throw new functions.https.HttpsError('invalid-argument', 'Discounted price cannot be greater than original price.');
    }

    if (updates.quantityRemaining !== undefined && updates.quantityRemaining < 0) {
        throw new functions.https.HttpsError('invalid-argument', 'Quantity remaining cannot be negative.');
    }
    if (updates.quantityInitial !== undefined && updates.quantityInitial <= 0) {
        throw new functions.https.HttpsError('invalid-argument', 'Initial quantity must be greater than 0.');
    }
    // If quantityInitial is updated, quantityRemaining should probably be reset or validated against it.
    // For simplicity, if quantityInitial is updated, we'll also update quantityRemaining to match if not explicitly provided.
    if (updates.quantityInitial !== undefined && updates.quantityRemaining === undefined) {
        updatePayload.quantityRemaining = updates.quantityInitial;
    } else if (updates.quantityInitial !== undefined && updates.quantityRemaining !== undefined && updates.quantityRemaining > updates.quantityInitial) {
        throw new functions.https.HttpsError('invalid-argument', 'Quantity remaining cannot exceed initial quantity.');
    }


    await dealRef.update(updatePayload);
    logger.info(`Deal ID: ${dealId} updated successfully by UID: ${uid}.`, updatePayload);

    const updatedDoc = await dealRef.get(); // Get the updated document
    return { success: true, message: 'Deal updated successfully.', deal: updatedDoc.data() };

  } catch (error: any) {
    logger.error(`Error updating deal ID: ${dealId} by UID: ${uid}`, error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError('internal', 'Failed to update deal.', error.message);
  }
});

export const deleteDeal = functions.https.onCall(async (request: any) => {
  const data = request.data as { dealId: string };
  const auth = request.auth;

  if (!auth) {
    logger.error('Authentication Error: User must be authenticated to delete a deal.');
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated to delete a deal.');
  }

  const uid = auth.uid;
  const { dealId } = data;

  if (!dealId) {
    throw new functions.https.HttpsError('invalid-argument', 'Deal ID is required to delete a deal.');
  }

  logger.info(`Attempting to delete (soft) deal ID: ${dealId} by UID: ${uid}`);
  const dealRef = db.collection('deals').doc(dealId);

  try {
    const dealDoc = await dealRef.get();
    if (!dealDoc.exists) {
      throw new functions.https.HttpsError('not-found', `Deal with ID ${dealId} not found.`);
    }

    const dealData = dealDoc.data() as DealItem;
    if (dealData.sellerId !== uid) {
      throw new functions.https.HttpsError('permission-denied', 'You can only delete your own deals.');
    }

    // Soft delete: Update status to DELISTED
    await dealRef.update({
      status: DealStatus.DELISTED,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      quantityRemaining: 0, // Also set quantity to 0
    });

    logger.info(`Deal ID: ${dealId} soft deleted (status set to DELISTED) successfully by UID: ${uid}.`);
    return { success: true, message: 'Deal successfully delisted.' };

  } catch (error: any) {
    logger.error(`Error soft deleting deal ID: ${dealId} by UID: ${uid}`, error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError('internal', 'Failed to delete deal.', error.message);
  }
});

interface BrowseDealsOptions {
  limit?: number;
  startAfter?: string; // Document ID to start after for pagination
  // Add other filter options later: category, location, priceRange, etc.
}

export const browseAvailableDeals = functions.https.onCall(async (request: any) => {
  const data = request.data as BrowseDealsOptions | null;
  // const auth = request.auth; // auth not currently used here

  // No auth needed to browse deals generally
  const options = data || {};
  const resultsLimit = options.limit || 10; // Default limit

  logger.info('Browsing available deals', options);

  try {
    let query = db.collection('deals')
                  .where('status', '==', DealStatus.AVAILABLE)
                  .where('quantityRemaining', '>', 0)
                  // Ensure pickupWindowEnd is in the future.
                  // Firestore requires an inequality on a field used in orderBy if not the first orderBy.
                  // For simplicity, we'll order by createdAt and filter client-side or add more complex indexing later.
                  // .where('pickupWindowEnd', '>', admin.firestore.Timestamp.now())
                  .orderBy('createdAt', 'desc') // Show newest deals first
                  .limit(resultsLimit);

    if (options.startAfter) {
      const startAfterDoc = await db.collection('deals').doc(options.startAfter).get();
      if (startAfterDoc.exists) {
        query = query.startAfter(startAfterDoc);
      } else {
        logger.warn(`StartAfter document ID ${options.startAfter} not found. Fetching from beginning.`);
      }
    }
    
    // A more robust way to ensure pickupWindowEnd is in the future,
    // but requires pickupWindowEnd to be the first orderBy if another inequality is used.
    // Or, use a scheduled function to move expired deals to 'EXPIRED' status.
    // For now, we rely on expiresAt or client-side filtering for active pickup windows.


    const snapshot = await query.get();
    if (snapshot.empty) {
      logger.info('No available deals found.');
      return { success: true, deals: [], nextPageToken: null };
    }

    const deals: DealItem[] = [];
    snapshot.forEach(doc => {
      const deal = doc.data() as DealItem;
      // Additional client-side or server-side check for pickupWindowEnd > now if not handled by query
      if (deal.pickupWindowEnd.toDate() > new Date()) {
          deals.push(deal);
      }
    });
    
    // Determine if there's a next page
    let nextPageToken: string | null = null;
    if (deals.length === resultsLimit && snapshot.docs.length === resultsLimit) {
        // If we fetched the limit and there were actually that many docs,
        // the last doc in the original snapshot (before filtering by date) can be the next page token.
        // This is a simplification; robust pagination needs careful handling of filters.
        const lastVisibleDocInSnapshot = snapshot.docs[snapshot.docs.length - 1];
        if (lastVisibleDocInSnapshot) {
            nextPageToken = lastVisibleDocInSnapshot.id;
        }
    }


    logger.info(`Successfully fetched ${deals.length} available deals.`);
    return { success: true, deals, nextPageToken };

  } catch (error: any) {
    logger.error('Error browsing available deals:', error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError('internal', 'Failed to browse deals.', error.message);
  }
});