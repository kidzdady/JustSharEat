'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

// Helper to combine class names
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

export interface NavItem {
  href: string;
  label: string;
  icon: (props: { className?: string; isActive: boolean }) => JSX.Element; // Icon component
  activePaths?: string[]; // For more complex active state matching, e.g. /consumer and /consumer/map both highlight "Home"
}

interface BottomNavProps {
  navItems: NavItem[];
  className?: string;
  // Add a prop to hide on certain viewports if needed, though typically controlled by parent via className="md:hidden"
}

// Placeholder Icons (replace with actual icons from a library like Lucide React or SVGs)
// These are just examples and should be defined or imported properly in a real scenario.
export const HomeIcon = ({ className, isActive }: { className?: string; isActive: boolean }) => <span className={cn("text-2xl", isActive ? 'text-primary' : 'text-text-secondary', className)}>🏠</span>;
export const MapIcon = ({ className, isActive }: { className?: string; isActive: boolean }) => <span className={cn("text-2xl", isActive ? 'text-primary' : 'text-text-secondary', className)}>🗺️</span>;
export const DonateIcon = ({ className, isActive }: { className?: string; isActive: boolean }) => <span className={cn("text-2xl", isActive ? 'text-primary' : 'text-text-secondary', className)}>❤️</span>;
export const ProfileIcon = ({ className, isActive }: { className?: string; isActive: boolean }) => <span className={cn("text-2xl", isActive ? 'text-primary' : 'text-text-secondary', className)}>👤</span>;
export const DashboardIcon = ({ className, isActive }: { className?: string; isActive: boolean }) => <span className={cn("text-2xl", isActive ? 'text-primary' : 'text-text-secondary', className)}>📊</span>;
export const ListingsIcon = ({ className, isActive }: { className?: string; isActive: boolean }) => <span className={cn("text-2xl", isActive ? 'text-primary' : 'text-text-secondary', className)}>📝</span>;
export const AnalyticsIcon = ({ className, isActive }: { className?: string; isActive: boolean }) => <span className={cn("text-2xl", isActive ? 'text-primary' : 'text-text-secondary', className)}>📈</span>;
export const WishlistIcon = ({ className, isActive }: { className?: string; isActive: boolean }) => <span className={cn("text-2xl", isActive ? 'text-primary' : 'text-text-secondary', className)}>📜</span>;
export const ReceivedIcon = ({ className, isActive }: { className?: string; isActive: boolean }) => <span className={cn("text-2xl", isActive ? 'text-primary' : 'text-text-secondary', className)}>📦</span>;


export default function BottomNav({ navItems, className }: BottomNavProps) {
  const pathname = usePathname();

  if (!navItems || navItems.length === 0) {
    return null;
  }

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 bg-surface shadow-t-lg border-t border-border z-40 md:hidden', // shadow-t-lg for a more pronounced top shadow
        className
      )}
    >
      <div className="container mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => {
          // Check if current path starts with item.href or matches any of activePaths
          const isActive = item.activePaths 
            ? item.activePaths.some(p => pathname.startsWith(p))
            : pathname.startsWith(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center text-xs w-full h-full transition-colors',
                isActive ? 'text-primary' : 'text-text-secondary hover:text-primary'
              )}
            >
              <item.icon className="mb-0.5" isActive={isActive} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

// Example Nav Item configurations (can be moved to a constants file or defined in respective layouts)
export const consumerNavItems: NavItem[] = [
  { href: '/consumer', label: 'Home', icon: HomeIcon, activePaths: ['/consumer', '/deal'] }, // Home active for /deal too
  { href: '/consumer/map', label: 'Map', icon: MapIcon },
  { href: '/donate', label: 'Donate', icon: DonateIcon }, // Assuming /donate is a general page
  { href: '/profile', label: 'Profile', icon: ProfileIcon }, // Assuming /profile is general
];

export const sellerNavItems: NavItem[] = [
  { href: '/seller', label: 'Dashboard', icon: DashboardIcon, activePaths: ['/seller'] },
  { href: '/seller/listings', label: 'Listings', icon: ListingsIcon }, // Assuming /seller/listings page
  { href: '/seller/analytics', label: 'Analytics', icon: AnalyticsIcon },
  { href: '/profile', label: 'Profile', icon: ProfileIcon },
];

export const ngoNavItems: NavItem[] = [
  { href: '/ngo', label: 'Dashboard', icon: DashboardIcon, activePaths: ['/ngo'] },
  { href: '/ngo/wishlist', label: 'Wishlist', icon: WishlistIcon },
  { href: '/ngo/received', label: 'Received', icon: ReceivedIcon }, // Assuming /ngo/received page
  { href: '/profile', label: 'Profile', icon: ProfileIcon },
];