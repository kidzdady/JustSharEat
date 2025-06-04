"use client";

import Link from 'next/link';
import type { DealDetails } from './types';
import { useState } from 'react';

// Icons (we'll recreate them here for the client component)
const BackArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ARIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.935-2.186 2.25 2.25 0 00-3.935 2.186z" />
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-400">
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 0115 0z" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

// Client-side image component
const DealImage = ({ src, alt }: { src: string; alt: string }) => (
  <img 
    src={src} 
    alt={alt} 
    className="w-full h-full object-cover"
    onError={(e) => {
      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkVGM0UyIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiNGOTc5MTYiLz4KPHRLEHU+8J+NvTwvdGV4dD4KPC9zdmc+';
    }}
  />
);

interface DealClientProps {
  deal: DealDetails;
}

export function DealClient({ deal }: DealClientProps) {
  const [showAuthModal, setShowAuthModal] = useState<null | 'login' | 'signup'>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-yellow-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm p-4 sticky top-0 z-50 border-b border-orange-100">
        <div className="container mx-auto flex items-center justify-between">
          <Link 
            href="/consumer" 
            className="w-10 h-10 bg-orange-100 hover:bg-orange-200 rounded-full flex items-center justify-center transition-colors"
          >
            <BackArrowIcon />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              SharEat
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-4 py-1 rounded-full border border-orange-300 text-orange-600 font-semibold bg-white hover:bg-orange-50 transition-colors"
              onClick={() => setShowAuthModal('login')}
            >
              Log In
            </button>
            <button
              className="px-4 py-1 rounded-full border border-orange-500 text-white font-semibold bg-orange-500 hover:bg-orange-600 transition-colors"
              onClick={() => setShowAuthModal('signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              onClick={() => setShowAuthModal(null)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">{showAuthModal === 'login' ? 'Log In' : 'Sign Up'}</h2>
            <p className="text-gray-600 mb-6">This is a static demo. Authentication is not available on static pages.</p>
            <button
              className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all mb-3"
              onClick={() => {
                setShowAuthModal(null);
                window.location.href = '/consumer';
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 6 .9 8.3 2.7l6.2-6.2C34.2 4.5 29.4 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.3-.1-2.7-.5-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c3.1 0 6 .9 8.3 2.7l6.2-6.2C34.2 4.5 29.4 3 24 3c-7.2 0-13 5.8-13 13 0 2.2.5 4.3 1.3 6.2z"/><path fill="#FBBC05" d="M24 45c5.1 0 9.8-1.7 13.4-4.7l-6.2-5.1C29.9 36.1 27.1 37 24 37c-6.1 0-10.7-3.1-11.7-7.5l-7 5.4C7.9 42.2 15.4 45 24 45z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.7 5.5-8.7 5.5-5.1 0-9.3-4.2-9.3-9.5s4.2-9.5 9.3-9.5c2.6 0 5 .9 6.8 2.6l6.2-6.2C34.2 4.5 29.4 3 24 3c-7.2 0-13 5.8-13 13s5.8 13 13 13c5.1 0 9.3-4.2 9.3-9.5 0-.7-.1-1.4-.2-2z"/></g></svg>
              {showAuthModal === 'login' ? 'Sign In with Google' : 'Sign Up with Google'}
            </button>
            <button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all"
              onClick={() => setShowAuthModal(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white">
              <div className="aspect-video relative">
                <DealImage 
                  src={deal.imageSrc} 
                  alt={deal.itemName}
                />
                {deal.countdown && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    ⏰ {deal.countdown}
                  </div>
                )}
                {deal.arEnabled && (
                  <button 
                    className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all hover:scale-105"
                    onClick={() => console.log('AR Preview clicked')}
                  >
                    <ARIcon />
                  </button>
                )}
              </div>
            </div>

            {/* Main Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                      {deal.sourceType}
                    </span>
                    {deal.isVerifiedSeller && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{deal.itemName}</h1>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="font-medium">{deal.sellerName}</span>
                    {deal.sellerRating && (
                      <div className="flex items-center gap-1">
                        <StarIcon />
                        <span className="font-medium">{deal.sellerRating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-green-600">Ksh {deal.discountedPrice}</span>
                <span className="text-lg text-gray-400 line-through">Ksh {deal.originalPrice}</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                  {Math.round(((deal.originalPrice - deal.discountedPrice) / deal.originalPrice) * 100)}% OFF
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm">🍽️</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Quantity</div>
                    <div className="font-medium">{deal.quantityDescription}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <ClockIcon />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Pickup Time</div>
                    <div className="font-medium">{deal.pickupTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-sm">✨</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Freshness</div>
                    <div className="font-medium text-sm">{deal.freshnessDescription}</div>
                  </div>
                </div>
                {deal.locationDistance && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <LocationIcon />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Distance</div>
                      <div className="font-medium">{deal.locationDistance}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews */}
            {deal.reviews && deal.reviews.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="text-amber-400">⭐</span>
                    Reviews ({deal.reviews.length})
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  {deal.reviews.slice(0, 2).map((review: { user: string; comment: string; rating: number }, index: number) => (
                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
                        {review.user[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{review.user}</span>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <StarIcon key={i} />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                  {deal.reviews.length > 2 && (
                    <button className="w-full py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors">
                      Show all reviews →
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Ingredients */}
            {deal.ingredients && deal.ingredients.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span>🥬</span>
                    Ingredients
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {deal.ingredients.map((ingredient: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Seller Info */}
            {deal.sellerInfo && (
              <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span>👨‍🍳</span>
                    About {deal.sellerName}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed">{deal.sellerInfo}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Actions & Map */}
          <div className="lg:col-span-4 space-y-6">
            {/* Action Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-orange-100 sticky top-24">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Ready to order?</h3>
                <div className="space-y-3">
                  <Link href={`/checkout?dealId=${deal.id}`}>
                    <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg">
                      Buy Now - Ksh {deal.discountedPrice}
                    </button>
                  </Link>
                  <Link href={`/checkout?dealId=${deal.id}&donate=true`}>
                    <button className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                      <HeartIcon />
                      Donate This
                    </button>
                  </Link>
                </div>
                
                {/* Share */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center mb-3">Share this deal</p>
                  <div className="flex justify-center gap-3">
                    <button className="w-10 h-10 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition-colors">
                      <span className="text-green-600">📱</span>
                    </button>
                    <button className="w-10 h-10 bg-purple-100 hover:bg-purple-200 rounded-full flex items-center justify-center transition-colors">
                      <ShareIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Card */}
            {deal.mapSnippetSrc && (
              <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <LocationIcon />
                    Pickup Location
                  </h3>
                </div>
                <div className="p-6">
                  <div className="relative rounded-xl overflow-hidden mb-4">
                    <DealImage 
                      src={deal.mapSnippetSrc} 
                      alt="Pickup location map"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                      📍 {deal.locationDistance}
                    </div>
                  </div>
                  <button className="w-full py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium rounded-xl transition-colors">
                    Open in Maps →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
