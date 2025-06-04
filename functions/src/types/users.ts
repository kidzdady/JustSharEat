import * as admin from 'firebase-admin';

// Firestore specific types
type Timestamp = admin.firestore.Timestamp;
type GeoPoint = admin.firestore.GeoPoint;

export enum UserRole {
  CONSUMER = 'consumer',
  SELLER = 'seller',
  NGO = 'ngo',
  ADMIN = 'admin', // Added admin role for future use
}

export interface BaseUserProfile {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  role: UserRole;
  phoneNumber?: string | null;
  photoURL?: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isActive: boolean; // To handle soft deletes or deactivation
  lastLogin?: Timestamp;
}

export interface ConsumerProfile extends BaseUserProfile {
  role: UserRole.CONSUMER;
  // Consumer-specific fields, e.g., preferences, saved addresses
  // For now, it's the same as BaseUserProfile
}

export interface SellerProfile extends BaseUserProfile {
  role: UserRole.SELLER;
  businessName: string;
  businessAddress?: string; // Physical address of the business
  businessLocation?: GeoPoint; // For map features
  pickupInstructions?: string;
  isVerified: boolean;
  verificationDocuments?: string[]; // URLs to documents
  // Other seller-specific fields like ratings, bank details for payouts (later)
}

export interface NgoProfile extends BaseUserProfile {
  role: UserRole.NGO;
  ngoName: string;
  registrationDetails?: string; // Registration number or document link
  ngoAddress?: string;
  ngoLocation?: GeoPoint;
  missionStatement?: string;
  isVerified: boolean;
  verificationDocuments?: string[]; // URLs to documents
  // Other NGO-specific fields like wishlist items, impact reports (later)
}

export interface AdminProfile extends BaseUserProfile {
  role: UserRole.ADMIN;
  permissions?: string[]; // e.g., ['manageUsers', 'moderateContent']
}

// A union type for any user profile
export type UserProfile = ConsumerProfile | SellerProfile | NgoProfile | AdminProfile;

// Data structure for creating a new user in Firestore,
// typically after Firebase Auth user creation.
export interface NewUserFirestoreData {
  email?: string | null;
  displayName?: string | null;
  role: UserRole;
  phoneNumber?: string | null;
  photoURL?: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isActive: boolean;
  // Role specific initial data
  businessName?: string; // if seller
  ngoName?: string; // if ngo
}