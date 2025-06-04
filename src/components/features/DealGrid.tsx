import React from 'react';
import DealCard, { DealCardProps } from './DealCard'; // Assuming DealCard is in the same directory

interface DealGridProps {
  deals: DealCardProps[];
  className?: string;
  // Potentially add props for loading states, empty states, pagination controls, etc.
  // isLoading?: boolean;
  // onFetchMore?: () => void;
}

export default function DealGrid({ deals, className }: DealGridProps) {
  if (!deals || deals.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-text-secondary text-lg">No deals found matching your criteria.</p>
        {/* Optionally, add a CTA to adjust filters or browse all */}
      </div>
    );
  }

  return (
    <div
      className={[
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {deals.map((deal) => (
        <DealCard key={deal.id} {...deal} />
      ))}
    </div>
  );
}