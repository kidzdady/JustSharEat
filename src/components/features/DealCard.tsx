import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/Badge';

// Placeholder for AR Icon - consider using an icon library like Lucide React later
const ARIcon = () => <span className="text-lg">🕶️</span>; // Or use an SVG

export interface DealCardProps {
  id: string;
  imageSrc: string;
  itemName: string;
  sellerName: string;
  originalPrice: number;
  discountedPrice: number;
  pickupTime: string;
  countdown?: string;
  tags?: string[]; // e.g., "Restaurant", "Vegan", "Event"
  arEnabled?: boolean;
  className?: string; // Allow passing additional classes
  // Add other relevant props like ratings, distance, etc. as needed
}

export default function DealCard({
  id,
  imageSrc,
  itemName,
  sellerName,
  originalPrice,
  discountedPrice,
  pickupTime,
  countdown,
  // tags, // Tags can be displayed if needed, e.g., within CardContent
  arEnabled,
  className,
}: DealCardProps) {
  return (
    <Card className={['overflow-hidden flex flex-col h-full group', className].filter(Boolean).join(' ')}>
      <Link href={`/deal/${id}`} className="block">
        <div className="relative">
          {/* In a real app, use Next/Image for optimized images */}
          <img
            src={imageSrc || "https://via.placeholder.com/300x200?text=Food+Image"}
            alt={itemName}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {countdown && (
            <Badge variant="destructive" className="absolute top-2 right-2 px-2 py-1 text-xs">
              {countdown}
            </Badge>
          )}
        </div>
      </Link>
      <CardHeader className="pb-2 pt-4 px-4">
        <Link href={`/deal/${id}`} className="block hover:text-primary">
          <CardTitle className="text-lg leading-tight font-semibold line-clamp-2" title={itemName}>
            {itemName}
          </CardTitle>
        </Link>
        <CardDescription className="text-sm mt-1 line-clamp-1" title={sellerName}>
          {sellerName}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3 px-4 flex-grow">
        <div className="flex items-baseline space-x-2 mb-1">
          <p className="text-xl font-bold text-primary">Ksh {discountedPrice}</p>
          {originalPrice > discountedPrice && (
            <p className="text-sm text-text-secondary line-through">Ksh {originalPrice}</p>
          )}
        </div>
        <p className="text-xs text-text-secondary">Pickup: {pickupTime}</p>
      </CardContent>
      <CardFooter className="flex-col items-stretch space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 p-3 border-t">
        <Button asChild size="sm" className="flex-1 text-sm py-2">
          <Link href={`/deal/${id}`}>View Deal</Link>
        </Button>
        {/* Optional: Direct "Add to Cart" or "Donate" if applicable from grid view */}
        {/* <Button asChild variant="secondary" size="sm" className="flex-1 text-sm py-2">
          <Link href={`/deal/${id}?donate=true`}>Donate</Link>
        </Button> */}
        {arEnabled && (
          <Button variant="accent" size="icon" title="AR Preview" className="p-2 h-auto"> {/* Adjusted padding for icon button */}
            <ARIcon />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}