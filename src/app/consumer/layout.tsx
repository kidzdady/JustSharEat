import React from 'react';
import BottomNav, { consumerNavItems } from '@/components/layout/BottomNav'; // Import BottomNav and specific nav items

// Placeholder components - these would be actual components from src/components/layout/
const ConsumerHeaderPlaceholder = () => ( // This would eventually be replaced by the global Header or a variant
  <header className="bg-surface shadow-md p-4 sticky top-0 z-40">
    <div className="container mx-auto flex justify-between items-center">
      <span className="font-bold text-primary font-display">SharEat (Consumer View)</span>
      <div>
        {/* Location Pin and Language Toggle would likely be part of the global Header */}
        <span className="text-sm mr-2">(Location Pin)</span>
        <span className="text-sm">(Lang Toggle)</span>
      </div>
    </div>
  </header>
);

// ConsumerBottomNavPlaceholder is removed as we'll use the actual BottomNav component

export default function ConsumerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* The global Header from root layout will likely cover this, or a specific variant might be used.
          For now, keeping this placeholder to illustrate where a consumer-specific header might go if different.
          If the global Header is sufficient, this ConsumerHeaderPlaceholder can be removed.
      */}
      {/* <ConsumerHeaderPlaceholder /> */} {/* Commenting out if global Header is used */}
      <main className="flex-grow container mx-auto p-4 pb-20 md:pb-4"> {/* pb-20 for BottomNav space on mobile */}
        {children}
      </main>
      <BottomNav navItems={consumerNavItems} />
      {/* The global Footer from root layout will be used. */}
    </div>
  );
}