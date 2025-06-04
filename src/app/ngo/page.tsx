"use client";

import React, { useState } from 'react';
import { Search, Plus, Heart, MapPin, Clock, Users, Star, Camera, Send, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

// Sample Data Structures
interface AvailableDonation {
  id: string;
  itemName: string;
  sourceName: string;
  distance?: string;
  imageSrc?: string;
  quantity?: string;
  calories?: string;
  servings?: string;
  timeLeft?: string;
  featured?: boolean;
}

interface WishlistItem {
  id: string;
  itemNeeded: string;
  details?: string;
  urgency?: 'High' | 'Medium' | 'Low';
}

interface ReceivedDonation {
  id: string;
  itemName: string;
  donorName: string;
  sourceType: 'Home' | 'Restaurant' | 'Event';
  dateReceived: string;
  blockchainHash?: string;
}

const sampleAvailableDonations: AvailableDonation[] = [
  { 
    id: 'D1', 
    itemName: 'Fresh samosas', 
    sourceName: "Mama's Kitchen", 
    distance: '1.5 km', 
    quantity: '20 pieces',
    calories: '45 calories',
    servings: '4 servings',
    timeLeft: '2 hours left',
    featured: true
  },
  { 
    id: 'D2', 
    itemName: 'Wedding pilau leftovers', 
    sourceName: 'Elite Events', 
    distance: '5 km', 
    quantity: 'Large portion',
    calories: '180 calories',
    servings: '12 servings',
    timeLeft: '4 hours left'
  },
  { 
    id: 'D3', 
    itemName: 'Mixed vegetable stew', 
    sourceName: 'Green Garden Restaurant', 
    distance: '3.2 km', 
    quantity: 'Medium pot',
    calories: '95 calories',
    servings: '8 servings',
    timeLeft: '1 hour left'
  },
  { 
    id: 'D4', 
    itemName: 'Chapati bundle', 
    sourceName: 'Community Kitchen', 
    distance: '2.8 km', 
    quantity: '15 pieces',
    calories: '65 calories',
    servings: '6 servings',
    timeLeft: '3 hours left'
  },
  { 
    id: 'D5', 
    itemName: 'Fresh fruit salad', 
    sourceName: 'Healthy Corner', 
    distance: '1.8 km', 
    quantity: '8 bowls',
    calories: '85 calories',
    servings: '8 servings',
    timeLeft: '5 hours left'
  },
  { 
    id: 'D6', 
    itemName: 'Grilled chicken portions', 
    sourceName: 'BBQ Palace', 
    distance: '4.2 km', 
    quantity: '12 pieces',
    calories: '220 calories',
    servings: '6 servings',
    timeLeft: '2 hours left'
  }
];

const sampleWishlist: WishlistItem[] = [
  { id: 'W1', itemNeeded: 'Rice', details: 'For 50 children daily meals', urgency: 'High' },
  { id: 'W2', itemNeeded: 'Cooking Oil', details: '10 Liters needed weekly', urgency: 'Medium' },
  { id: 'W3', itemNeeded: 'Maize Flour', details: 'Basic staple food', urgency: 'High' },
  { id: 'W4', itemNeeded: 'Fresh Vegetables', details: 'For nutritious meals', urgency: 'Low' },
];

const sampleReceivedDonations: ReceivedDonation[] = [
  { id: 'RC1', itemName: '5 meals (Ugali & Stew)', donorName: 'Amina H.', sourceType: 'Home', dateReceived: '2024-05-30', blockchainHash: '0x123...abc' },
  { id: 'RC2', itemName: 'Bread Loaves (10)', donorName: "City Bakers", sourceType: 'Restaurant', dateReceived: '2024-05-28' },
  { id: 'RC3', itemName: 'Fresh Fruits Mix', donorName: 'Local Market', sourceType: 'Restaurant', dateReceived: '2024-05-27' },
];

const categories = [
  { name: 'Meals', icon: '🍽️', active: true },
  { name: 'Grains', icon: '🌾', active: false },
  { name: 'Vegetables', icon: '🥬', active: false },
  { name: 'Fruits', icon: '🍎', active: false },
  { name: 'Drinks', icon: '🥤', active: false },
  { name: 'Snacks', icon: '🍪', active: false }
];

const foodEmojis = ['🍽️', '🍲', '🥘', '🍛', '🥗', '🍕', '🥙', '🌮'];

type NetflixCardType = 'donation' | 'wishlist' | 'received';

export default function NgoDashboardPage() {
  const [activeCategory, setActiveCategory] = useState('Meals');
  const [thankYouMessage, setThankYouMessage] = useState('');
  const [thankYouWall, setThankYouWall] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState(sampleWishlist);
  const [receivedDonations, setReceivedDonations] = useState(sampleReceivedDonations);
  const [showAddWishlist, setShowAddWishlist] = useState(false);
  const [newWishlistItem, setNewWishlistItem] = useState<{ itemNeeded: string; details: string; urgency: 'High' | 'Medium' | 'Low' }>({ itemNeeded: '', details: '', urgency: 'Low' });
  const [photo, setPhoto] = useState<File | null>(null);
  const [claimMessage, setClaimMessage] = useState<string | null>(null);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'bg-red-500 text-white';
      case 'Medium': return 'bg-orange-500 text-white';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  // Unified NetflixCard for all types
  const NetflixCard = ({
    data,
    index,
    type,
    onClaim,
    onVerify
  }: {
    data: any,
    index: number,
    type: NetflixCardType,
    onClaim?: () => void,
    onVerify?: () => void
  }) => {
    // Card content varies by type
    return (
      <div className={`relative group w-full ${type === 'donation' ? 'max-w-xs' : 'max-w-md'} mx-auto`}>
        <div className={`relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ${type === 'donation' ? 'hover:scale-105 hover:z-10' : ''}`}>
          {/* Image/Emoji Container */}
          <div className={`relative ${type === 'donation' ? 'h-72' : 'h-32'} bg-gradient-to-br from-orange-400 via-red-400 to-pink-500`}>
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <div className={`text-${type === 'donation' ? '6xl' : '4xl'} filter drop-shadow-lg`}>
                {foodEmojis[index % foodEmojis.length]}
              </div>
            </div>
            {/* Badges */}
            {type === 'donation' && (
              <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-bold">
                {data.timeLeft}
              </div>
            )}
            {type === 'donation' && data.featured && (
              <div className="absolute top-3 right-3 bg-yellow-500 text-black px-2 py-1 rounded-lg text-xs font-bold">
                ⭐ Featured
              </div>
            )}
            {type === 'wishlist' && (
              <div className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold ${getUrgencyColor(data.urgency || 'Low')}`}>{data.urgency}</div>
            )}
            {type === 'received' && data.blockchainHash && (
              <div className="absolute top-3 right-3 bg-green-600 text-white px-2 py-1 rounded-lg text-xs font-bold">✓ Verified</div>
            )}
            {/* Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            {/* Bottom Info */}
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <h3 className="font-bold text-base mb-1 line-clamp-2">
                {type === 'donation' && data.itemName}
                {type === 'wishlist' && data.itemNeeded}
                {type === 'received' && data.itemName}
              </h3>
              <div className="flex items-center text-xs opacity-90">
                {type === 'donation' && <><MapPin className="w-3 h-3 mr-1" /><span>{data.sourceName}</span></>}
                {type === 'wishlist' && data.details && <span>{data.details}</span>}
                {type === 'received' && <span>from {data.donorName}</span>}
              </div>
            </div>
          </div>
          {/* Hover Details or Expanded Info */}
          <div className={`absolute inset-0 bg-black bg-opacity-95 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between ${type === 'donation' ? '' : 'pointer-events-none'}`}>
            <div>
              <h3 className="font-bold text-lg mb-2">
                {type === 'donation' && data.itemName}
                {type === 'wishlist' && data.itemNeeded}
                {type === 'received' && data.itemName}
              </h3>
              <div className="space-y-2 text-sm">
                {type === 'donation' && (
                  <>
                    <div className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-orange-400" /><span>{data.sourceName} • {data.distance}</span></div>
                    <div className="flex items-center"><Users className="w-4 h-4 mr-2 text-green-400" /><span>{data.servings}</span></div>
                    <div className="flex items-center"><Clock className="w-4 h-4 mr-2 text-red-400" /><span>{data.calories}</span></div>
                  </>
                )}
                {type === 'wishlist' && data.details && <div className="text-gray-300">{data.details}</div>}
                {type === 'received' && <div className="text-gray-300">Received: {data.dateReceived}</div>}
              </div>
            </div>
            {type === 'donation' && (
              <button onClick={onClaim} className="bg-white text-black py-3 px-4 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center justify-center mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Claim Now
              </button>
            )}
            {type === 'wishlist' && (
              <div className="mt-4 text-xs text-gray-400">Urgency: {data.urgency}</div>
            )}
            {type === 'received' && (
              <div className="mt-4 text-xs text-gray-400">Source: {data.sourceType}</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Handlers
  const handleClaim = (itemName: string) => {
    setClaimMessage(`You have claimed "${itemName}"!`);
    setTimeout(() => setClaimMessage(null), 2000);
  };

  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handlePostThankYou = () => {
    if (thankYouMessage.trim()) {
      setThankYouWall([thankYouMessage, ...thankYouWall]);
      setThankYouMessage('');
      setPhoto(null);
    }
  };

  const handleAddWishlist = () => {
    if (newWishlistItem.itemNeeded.trim()) {
      setWishlist([
        { id: `W${wishlist.length + 1}`, ...newWishlistItem },
        ...wishlist
      ]);
      setShowAddWishlist(false);
      setNewWishlistItem({ itemNeeded: '', details: '', urgency: 'Low' });
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#FAF7F2', color: '#2D3748', fontFamily: 'Lato, sans-serif' }}>
      <style jsx global>{`
        :root {
          --color-primary: #FF8C00;
          --color-secondary: #32CD32;
          --color-accent: #FFD700;
          --color-premium: #FFC107;
          --color-background: #FAF7F2;
          --color-surface: #FFFFFF;
          --color-text-primary: #2D3748;
          --color-text-secondary: #718096;
          --color-border: #E2E8F0;
          --color-success: #4CAF50;
          --color-error: #F44336;
          --font-sans: 'Lato', sans-serif;
          --font-display: 'Montserrat', sans-serif;
          --radius-sm: 6px;
          --radius-md: 12px;
          --radius-lg: 20px;
          --radius-xl: 32px;
          --radius-full: 9999px;
          --shadow-card: 0 2px 12px 0 rgba(44, 62, 80, 0.08);
          --shadow-elevated: 0 4px 24px 0 rgba(44, 62, 80, 0.12);
        }
        body {
          background: var(--color-background);
          color: var(--color-text-primary);
          font-family: var(--font-sans);
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .netflix-scroll {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Header */}
      {/* ...existing code... */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="relative py-16">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', background: 'linear-gradient(90deg, #FF8C00, #FFD700, #FFC107)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Available Donations
            </h2>
            <p className="text-xl mb-8" style={{ color: '#718096' }}>Fresh food waiting to make a difference</p>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`flex-shrink-0 flex items-center space-x-3 px-6 py-3 rounded-full transition-all font-medium ${
                  category.name === activeCategory 
                    ? 'shadow-lg' 
                    : 'hover:shadow-card'
                }`}
                style={{
                  background: category.name === activeCategory ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: category.name === activeCategory ? '#fff' : 'var(--color-text-secondary)',
                  border: `1px solid ${category.name === activeCategory ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  fontFamily: 'Lato, sans-serif',
                  boxShadow: category.name === activeCategory ? 'var(--shadow-card)' : 'none',
                }}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Netflix-style Donation Cards */}
        <div className="mb-16">
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide netflix-scroll pb-8">
            {sampleAvailableDonations.map((donation, index) => (
              <NetflixCard
                key={donation.id}
                data={donation}
                index={index}
                type="donation"
                onClaim={() => handleClaim(donation.itemName)}
              />
            ))}
          </div>
          {claimMessage && (
            <div className="mt-4 text-center font-bold" style={{ color: 'var(--color-success)' }}>{claimMessage}</div>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
          {/* Wishlist Card */}
          <div className="p-6 border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'Montserrat, sans-serif' }}>Our Wishlist</h3>
              <button
                style={{ background: 'var(--color-primary)', color: '#fff', borderRadius: 'var(--radius-full)', boxShadow: 'var(--shadow-card)' }}
                className="p-3 transition-colors"
                onClick={() => setShowAddWishlist(true)}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {wishlist.map((item, idx) => (
                <NetflixCard
                  key={item.id}
                  data={item}
                  index={idx}
                  type="wishlist"
                />
              ))}
            </div>
            {/* Add Wishlist Modal */}
            {showAddWishlist && (
              <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(44, 62, 80, 0.4)' }}>
                <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-elevated)' }} className="p-8 w-full max-w-md">
                  <h4 className="text-xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: 'var(--color-text-primary)' }}>Add Wishlist Item</h4>
                  <input
                    type="text"
                    placeholder="Item Needed"
                    className="w-full mb-2 p-2 rounded border"
                    style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-md)' }}
                    value={newWishlistItem.itemNeeded}
                    onChange={e => setNewWishlistItem({ ...newWishlistItem, itemNeeded: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Details"
                    className="w-full mb-2 p-2 rounded border"
                    style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-md)' }}
                    value={newWishlistItem.details}
                    onChange={e => setNewWishlistItem({ ...newWishlistItem, details: e.target.value })}
                  />
                  <select
                    className="w-full mb-4 p-2 rounded border"
                    style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-md)' }}
                    value={newWishlistItem.urgency}
                    onChange={e => setNewWishlistItem({ ...newWishlistItem, urgency: e.target.value as 'High' | 'Medium' | 'Low' })}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <div className="flex justify-end space-x-2">
                    <button
                      className="px-4 py-2 rounded"
                      style={{ background: 'var(--color-border)', color: 'var(--color-text-secondary)', borderRadius: 'var(--radius-md)' }}
                      onClick={() => setShowAddWishlist(false)}
                    >Cancel</button>
                    <button
                      className="px-4 py-2 font-bold rounded"
                      style={{ background: 'var(--color-success)', color: '#fff', borderRadius: 'var(--radius-md)' }}
                      onClick={handleAddWishlist}
                    >Add</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recent Donations Card */}
          <div className="p-6 border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' }}>
            <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text-primary)', fontFamily: 'Montserrat, sans-serif' }}>Recent Donations</h3>
            <div className="space-y-4">
              {receivedDonations.map((donation, idx) => (
                <NetflixCard
                  key={donation.id}
                  data={donation}
                  index={idx}
                  type="received"
                />
              ))}
            </div>
          </div>

          {/* Impact Summary Card */}
          <div style={{ background: 'linear-gradient(135deg, #FF8C00 0%, #FFC107 100%)', borderRadius: 'var(--radius-lg)', color: '#2D3748', boxShadow: 'var(--shadow-elevated)' }} className="p-6">
            <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>Impact Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span style={{ color: '#FF8C00' }}>Total Donations</span>
                <span className="text-2xl font-bold">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: '#32CD32' }}>People Fed</span>
                <span className="text-2xl font-bold">1,240</span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: '#718096' }}>This Month</span>
                <span className="text-2xl font-bold" style={{ color: '#FFD700' }}>+23%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Thank You Wall */}
        <div className="p-8 mb-16 border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-card)' }}>
          <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)', fontFamily: 'Montserrat, sans-serif' }}>Thank You Wall</h3>
          <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>Share your gratitude with donors and the community</p>
          <div className="space-y-4">
            <textarea
              value={thankYouMessage}
              onChange={e => setThankYouMessage(e.target.value)}
              placeholder="Write your heartfelt thank you message here..."
              rows={4}
              className="w-full border resize-none"
              style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-lg)', padding: '16px', fontFamily: 'Lato, sans-serif' }}
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 transition-colors cursor-pointer" style={{ color: 'var(--color-text-secondary)' }}>
                <Camera className="w-5 h-5" />
                <span>Add Photo</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleAddPhoto} />
              </label>
              <button
                className="px-8 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-colors"
                style={{ background: 'var(--color-success)', color: '#fff', fontFamily: 'Montserrat, sans-serif', borderRadius: 'var(--radius-lg)' }}
                onClick={handlePostThankYou}
              >
                <Send className="w-4 h-4" />
                <span>Post Thank You</span>
              </button>
            </div>
            {photo && (
              <div className="text-sm" style={{ color: 'var(--color-success)' }}>Photo selected: {photo.name}</div>
            )}
          </div>
          {/* Thank You Wall List */}
          {thankYouWall.length > 0 && (
            <div className="mt-8 space-y-4">
              <h4 className="text-xl font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif', color: 'var(--color-text-primary)' }}>Messages</h4>
              {thankYouWall.map((msg, idx) => (
                <div key={idx} className="p-4" style={{ background: 'var(--color-background)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-primary)', boxShadow: 'var(--shadow-card)' }}>{msg}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}