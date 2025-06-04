'use client'; // Add 'use client' because we'll use a hook (useAuth)

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import LanguageToggle from './LanguageToggle';
import { useAuth } from '@/context/AuthContext'; // Restore useAuth
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signOutUser } from '@/lib/api/auth';
import { useCart } from '@/context/CartContext';
import { Modal } from '@/components/ui/Modal';
import { consumerNavItems, sellerNavItems, ngoNavItems } from './BottomNav';

// Placeholder Icons
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-text-secondary">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);
const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.106A2.25 2.25 0 0 0 2.869 3H2.25m0 0a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M12 14.25a3 3 0 0 0-3 3h6.75a3 3 0 0 0-3-3m-3.375-3h10.75M12 14.25 14.625 7.5" />
  </svg>
);

// Mock authentication status is no longer needed

export default function Header() {
  const { currentUser, loading, logout } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [mobileSearch, setMobileSearch] = useState('');
  const [language, setLanguage] = useState('en');
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper to get dashboard path by role
  const getDashboardPath = (role?: string) => {
    switch (role) {
      case 'seller':
        return '/seller';
      case 'ngo':
        return '/ngo';
      case 'consumer':
        return '/consumer';
      default:
        return '/';
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      router.push('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim()) {
      // Route to consumer page with query param for food search
      router.push(`/consumer?query=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleMobileSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mobileSearch.trim()) {
      router.push(`/consumer?query=${encodeURIComponent(mobileSearch.trim())}`);
    }
  };

  // Determine nav items based on user role
  let navItems = consumerNavItems;
  if (currentUser?.role === 'seller') navItems = sellerNavItems;
  if (currentUser?.role === 'ngo') navItems = ngoNavItems;

  // currentUser and loading are now from useAuth()

  return (
    <header className="bg-surface shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left Section: Menu (mobile) & Logo */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <MenuIcon />
          </Button>
          <span
            className="text-2xl font-bold text-primary font-display cursor-pointer"
            onClick={() => {
              if (!loading && currentUser && currentUser.role) {
                router.push(getDashboardPath(currentUser.role));
              } else {
                router.push('/');
              }
            }}
          >
            SharEat
          </span>
        </div>

        {/* Middle Section: Search Bar (desktop) */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <form className="relative w-full" onSubmit={handleSearch}>
            <Input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for deals, restaurants, or items..."
              className="pl-10 pr-4 py-2.5 rounded-lg border-border focus:border-primary"
            />
            <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2">
              <SearchIcon />
            </button>
          </form>
        </div>

        {/* Right Section: Actions & User */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {!loading && currentUser ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Link href="/cart" aria-label="View Cart">
                  <CartIcon />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </Button>
              <Link href="/profile">
                <Avatar
                  src={currentUser.photoURL || undefined}
                  fallback={currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : (currentUser.email ? currentUser.email.charAt(0).toUpperCase() : 'U')}
                  size="md"
                />
              </Link>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : !loading ? (
            <>
              <Button variant="ghost" asChild className="hidden sm:inline-flex">
                <Link href="/auth">Log In</Link>
              </Button>
              <Button variant="primary" asChild>
                <Link href="/auth?mode=signup">Sign Up</Link>
              </Button>
            </>
          ) : (
            <div className="h-10 w-24 animate-pulse bg-gray-200 rounded-md"></div>
          )}
          <LanguageToggle className="hidden sm:inline-flex" />
        </div>
      </div>
      {/* Search Bar (mobile) - Appears below header */}
      <div className="md:hidden px-4 pb-3 border-b border-border">
        <form className="relative w-full" onSubmit={handleMobileSearch}>
          <Input
            type="search"
            value={mobileSearch}
            onChange={e => setMobileSearch(e.target.value)}
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-lg border-border focus:border-primary"
          />
          <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </button>
        </form>
      </div>
      {/* Mobile Menu Drawer */}
      <Modal isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} dialogClassName="fixed inset-0 z-[100] flex items-start justify-end md:hidden" className="w-64 h-full bg-white shadow-lg p-0">
        <div className="flex flex-col h-full w-full">
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
            <span className="text-xl font-bold text-primary">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu" className="text-gray-500 hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto">
            <ul className="py-2">
              {navItems.map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="flex items-center px-6 py-3 text-lg text-gray-700 hover:bg-orange-50 hover:text-primary transition-colors w-full" onClick={() => setMobileMenuOpen(false)}>
                    <item.icon className="mr-3 text-2xl" isActive={false} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Modal>
    </header>
  );
}