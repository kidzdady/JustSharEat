export interface DealDetails {
  id: string;
  imageSrc: string;
  sellerName: string;
  itemName: string;
  sourceType: 'Restaurant' | 'Event' | 'Home';
  originalPrice: number;
  discountedPrice: number;
  quantityDescription: string;
  freshnessDescription: string;
  pickupTime: string;
  countdown?: string;
  locationDistance?: string;
  mapSnippetSrc?: string;
  arEnabled?: boolean;
  isVerifiedSeller?: boolean;
  sellerRating?: number;
  reviews?: { user: string; comment: string; rating: number }[];
  ingredients?: string[];
  sellerInfo?: string;
}
