import * as admin from 'firebase-admin';
import { UserRole } from './users'; // Assuming users.ts is in the same directory

// Firestore specific types
type Timestamp = admin.firestore.Timestamp;
type GeoPoint = admin.firestore.GeoPoint;

export enum DealStatus {
  AVAILABLE = 'available',
  SOLD_OUT = 'sold_out',
  EXPIRED = 'expired',
  DELISTED = 'delisted', // Manually taken down by seller or admin
  PENDING_APPROVAL = 'pending_approval', // For admin moderation if implemented
}

export interface DealItem {
  id: string; // Corresponds to the Deal document ID
  sellerId: string; // UID of the seller
  sellerName: string; // Denormalized for easier display
  sellerRole?: UserRole.SELLER | UserRole.NGO; // Could be a seller or an NGO listing surplus

  itemName: string;
  description?: string;
  imageUrls?: string[]; // URLs to images in Firebase Storage

  originalPrice: number;
  discountedPrice: number;

  quantityInitial: number;
  quantityRemaining: number;

  // Pickup details
  pickupInstructions?: string;
  pickupLocationAddress?: string;
  pickupLocationCoordinates?: GeoPoint; // For map integration
  pickupWindowStart: Timestamp; // Start time for pickup
  pickupWindowEnd: Timestamp;   // End time for pickup

  // Optional details from frontend DealCardProps and consumer page
  tags?: string[]; // e.g., "Restaurant", "Vegan", "Bakery", "Event Surplus"
  arEnabled?: boolean;
  calories?: number; // Estimated calories
  serves?: number; // Estimated number of people it serves
  allergenInfo?: string; // e.g., "Contains nuts, gluten-free"

  status: DealStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  expiresAt?: Timestamp; // Optional: if the deal has a hard expiry different from pickupWindowEnd

  // Future fields
  // averageRating?: number;
  // reviewCount?: number;
}

// Data structure for creating a new deal
export interface NewDealData {
  sellerId: string;
  sellerName: string;
  sellerRole?: UserRole.SELLER | UserRole.NGO;

  itemName: string;
  description?: string;
  imageUrls?: string[];

  originalPrice: number;
  discountedPrice: number;

  quantityInitial: number;

  pickupInstructions?: string;
  pickupLocationAddress?: string;
  pickupLocationCoordinates?: GeoPoint;
  pickupWindowStart: Timestamp;
  pickupWindowEnd: Timestamp;

  tags?: string[];
  arEnabled?: boolean;
  calories?: number;
  serves?: number;
  allergenInfo?: string;

  status?: DealStatus; // Defaults to AVAILABLE or PENDING_APPROVAL
  expiresAt?: Timestamp;
}