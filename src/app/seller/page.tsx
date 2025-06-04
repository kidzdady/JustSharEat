'use client';  // This file is a React component for a seller dashboard in a food surplus listing application.
import React, { useState } from 'react';
import { Plus, Edit, Gift, Tag, TrendingUp, DollarSign, Users, Heart, Star, Clock, MapPin, Phone, Mail } from 'lucide-react';

// Mock data for active listings
const activeListings = [
  {
    id: 'L1',
    itemName: 'Surplus Samosas',
    description: 'Crispy triangular delights with spiced potato filling',
    price: 200,
    originalPrice: 300,
    quantity: '10 pieces',
    pickupTime: '7:00-9:00 PM',
    status: '3 orders pending',
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    rating: 4.8,
    preparationTime: '15 mins',
    location: 'Westlands'
  },
  {
    id: 'L2',
    itemName: 'Event Pilau',
    description: 'Fragrant spiced rice with tender meat - serves 5',
    price: 400,
    originalPrice: 600,
    quantity: 'Serves 5',
    pickupTime: 'ASAP - By 10 PM',
    status: 'Listed',
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
    rating: 4.9,
    preparationTime: '30 mins',
    location: 'CBD'
  },
  {
    id: 'L3',
    itemName: 'Fresh Bread Loaves',
    description: 'Soft, warm bread perfect for breakfast',
    price: 100,
    originalPrice: 150,
    quantity: '2 loaves',
    pickupTime: 'End of Day',
    status: '1 order pending',
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
    rating: 4.7,
    preparationTime: '5 mins',
    location: 'Karen'
  },
  {
    id: 'L4',
    itemName: 'Chapati Bundle',
    description: 'Soft, homemade chapatis - perfect with stew',
    price: 80,
    originalPrice: 120,
    quantity: '8 pieces',
    pickupTime: '6:00-8:00 PM',
    status: '2 orders pending',
    category: 'Bread',
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop',
    rating: 4.6,
    preparationTime: '10 mins',
    location: 'Kileleshwa'
  },
  {
    id: 'L5',
    itemName: 'Mandazi Pack',
    description: 'Sweet, fluffy donuts - traditional Kenyan treat',
    price: 120,
    originalPrice: 180,
    quantity: '12 pieces',
    pickupTime: '5:00-7:00 PM',
    status: 'Listed',
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    rating: 4.8,
    preparationTime: '20 mins',
    location: 'Langata'
  },
  {
    id: 'L6',
    itemName: 'Ugali & Sukuma',
    description: 'Traditional meal with collard greens',
    price: 150,
    originalPrice: 220,
    quantity: 'Serves 3',
    pickupTime: '7:30-9:30 PM',
    status: 'Listed',
    category: 'Traditional',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop',
    rating: 4.5,
    preparationTime: '25 mins',
    location: 'Eastleigh'
  }
];

const donationRequests = [
  {
    id: 'DR1',
    ngoName: 'Kibera Hope Center',
    itemNeeded: 'Rice',
    quantityNeeded: '20 kg',
    urgency: 'High',
    beneficiaries: 50,
    contact: '+254 712 345 678',
    email: 'contact@kiberahope.org',
    description: 'Supporting families in Kibera slums with daily meals'
  },
  {
    id: 'DR2',
    ngoName: 'Mathare Outreach',
    itemNeeded: 'Cooking Oil',
    quantityNeeded: '10 Liters',
    urgency: 'Medium',
    beneficiaries: 30,
    contact: '+254 723 456 789',
    email: 'help@mathareoutreach.org',
    description: 'Providing nutritious meals to children in Mathare'
  },
  {
    id: 'DR3',
    ngoName: 'Eldoret Children\'s Home',
    itemNeeded: 'Flour',
    quantityNeeded: '15 kg',
    urgency: 'Low',
    beneficiaries: 25,
    contact: '+254 734 567 890',
    email: 'info@eldorethome.org',
    description: 'Caring for orphaned children in Eldoret'
  },
  {
    id: 'DR4',
    ngoName: 'Nairobi Street Families',
    itemNeeded: 'Bread',
    quantityNeeded: '100 loaves',
    urgency: 'High',
    beneficiaries: 200,
    contact: '+254 745 678 901',
    email: 'support@nairobifamilies.org',
    description: 'Supporting homeless families in Nairobi'
  }
];

const performanceStats = {
  mealsSold: 127,
  earnedAmount: 18750,
  mealsDonated: 34,
  totalOrders: 89,
  rating: 4.8,
  responseTime: '12 mins',
  repeatCustomers: 67
};

const recentActivity = [
  { type: 'order', message: 'New order for Surplus Samosas', time: '2 mins ago' },
  { type: 'donation', message: 'Donated 5kg rice to Kibera Hope Center', time: '1 hour ago' },
  { type: 'listing', message: 'Listed Event Pilau', time: '3 hours ago' },
  { type: 'order', message: 'Order completed: Fresh Bread Loaves', time: '5 hours ago' }
];

// TypeScript interface for ActiveListing
interface ActiveListing {
  id: string;
  itemName: string;
  description: string;
  price?: number;
  originalPrice?: number;
  quantity?: string;
  pickupTime?: string;
  status: string;
  category: string;
  image: string;
  rating?: number;
  preparationTime?: string;
  location?: string;
}

const ActiveListingCard = ({ listing }: { listing: ActiveListing }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate discount percent safely
  const discountPercent =
    listing.price !== undefined && listing.originalPrice !== undefined && listing.originalPrice > 0
      ? Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100)
      : null;

  return (
    <div 
      className="bg-gray-900 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img 
          src={listing.image} 
          alt={listing.itemName}
          className="w-full h-48 object-cover"
        />
        {discountPercent !== null && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-semibold">
            -{discountPercent}%
          </div>
        )}
        {listing.rating !== undefined && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm flex items-center">
            <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
            {listing.rating}
          </div>
        )}
        {listing.preparationTime && (
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {listing.preparationTime}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-white font-bold text-lg leading-tight">{listing.itemName}</h3>
          <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">{listing.category}</span>
        </div>
        
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{listing.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {listing.price !== undefined ? (
              <span className="text-green-400 font-bold text-xl">Ksh {listing.price}</span>
            ) : (
              <span className="text-gray-400 font-bold text-xl">—</span>
            )}
            {listing.originalPrice !== undefined && listing.price !== undefined ? (
              <span className="text-gray-500 line-through text-sm">Ksh {listing.originalPrice}</span>
            ) : null}
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            {listing.location && <><MapPin className="w-3 h-3 mr-1" />{listing.location}</>}
          </div>
        </div>
        
        <div className="text-gray-400 text-sm mb-3">
          <div className="flex justify-between">
            <span>Quantity: {listing.quantity || '—'}</span>
            <span>Pickup: {listing.pickupTime || '—'}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            listing.status.toLowerCase().includes('pending') 
              ? 'bg-orange-100 text-orange-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {listing.status}
          </span>
        </div>
        
        {isHovered && (
          <div className="flex space-x-2 animate-fade-in">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm font-medium flex items-center justify-center transition-colors">
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </button>
            <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded text-sm font-medium flex items-center justify-center transition-colors">
              <Gift className="w-4 h-4 mr-1" />
              Donate
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function NetflixSellerDashboard() {
  const [activeTab, setActiveTab] = useState('listings');

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
      <div style={{ background: 'linear-gradient(90deg, #FF8C00, #FFD700, #FFC107)', padding: 24 }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif', color: '#fff' }}>Seller Dashboard</h1>
            <button style={{ background: 'var(--color-surface)', color: 'var(--color-primary)', borderRadius: 'var(--radius-lg)', fontWeight: 700, fontFamily: 'Lato, sans-serif', boxShadow: 'var(--shadow-card)', padding: '12px 24px' }}>
              <Plus className="w-5 h-5 mr-2 inline" /> List Surplus Now
            </button>
          </div>
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: 16 }}>
              <div className="flex items-center justify-between">
                <div>
                  <p style={{ color: 'var(--color-primary)', fontSize: 14 }}>Meals Sold</p>
                  <p className="text-2xl font-bold">{performanceStats.mealsSold}</p>
                </div>
                <TrendingUp className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
              </div>
            </div>
            <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: 16 }}>
              <div className="flex items-center justify-between">
                <div>
                  <p style={{ color: 'var(--color-secondary)', fontSize: 14 }}>Earned</p>
                  <p className="text-2xl font-bold">Ksh {performanceStats.earnedAmount.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8" style={{ color: 'var(--color-secondary)' }} />
              </div>
            </div>
            <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card', padding: 16 }}>
              <div className="flex items-center justify-between">
                <div>
                  <p style={{ color: 'var(--color-premium)', fontSize: 14 }}>Donated</p>
                  <p className="text-2xl font-bold">{performanceStats.mealsDonated}</p>
                </div>
                <Heart className="w-8 h-8" style={{ color: 'var(--color-premium)' }} />
              </div>
            </div>
            <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: 16 }}>
              <div className="flex items-center justify-between">
                <div>
                  <p style={{ color: 'var(--color-accent)', fontSize: 14 }}>Rating</p>
                  <p className="text-2xl font-bold flex items-center">
                    {performanceStats.rating}
                    <Star className="w-5 h-5 ml-1" style={{ color: 'var(--color-accent)', fill: 'var(--color-accent)' }} />
                  </p>
                </div>
                <Users className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Tabs */}
      <div style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', padding: '16px 0' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-8">
            {/* Navigation Tabs Array */}
            {(() => {
              const tabs = [
                { id: 'listings', label: 'Active Listings', count: activeListings.length },
                { id: 'donations', label: 'Donation Requests', count: donationRequests.length },
                { id: 'performance', label: 'Performance', count: null }
              ];
              return tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="py-2 px-4 rounded-lg font-medium transition-colors"
                  style={{
                    background: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-surface)',
                    color: activeTab === tab.id ? '#fff' : 'var(--color-text-secondary)',
                    border: `1px solid ${activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    fontFamily: 'Lato, sans-serif',
                    boxShadow: activeTab === tab.id ? 'var(--shadow-card)' : 'none',
                  }}
                >
                  {tab.label}
                  {tab.count !== null && tab.count !== undefined && (
                    <span style={{ background: 'var(--color-accent)', color: '#fff', borderRadius: 'var(--radius-full)', marginLeft: 8, padding: '2px 10px', fontSize: 12 }}>{tab.count}</span>
                  )}
                </button>
              ));
            })()}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {activeTab === 'listings' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Your Active Listings</h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>{activeListings.length} items listed</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-screen overflow-y-auto scrollbar-hide">
              {activeListings.map(listing => (
                <ActiveListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        )}
        {activeTab === 'donations' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>NGO Donation Requests</h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>{donationRequests.length} active requests</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-screen overflow-y-auto scrollbar-hide">
              {donationRequests.concat(
                Array.from({ length: 10 }, (_, i) => ({
                  id: `DR_MOCK${i+2}`,
                  ngoName: `Mock NGO ${i+5}`,
                  itemNeeded: ['Rice', 'Beans', 'Cooking Oil', 'Flour', 'Milk', 'Sugar', 'Salt', 'Bread', 'Vegetables', 'Fruit'][i%10],
                  quantityNeeded: `${10 + i*5} kg`,
                  urgency: ['High', 'Medium', 'Low'][i%3],
                  beneficiaries: 20 + i*10,
                  contact: `+254 7${i}2 345 678`,
                  email: `mock${i+5}@ngo.org`,
                  description: `Supporting community ${i+2} with food aid.`
                }))
              ).map(request => (
                <ActiveListingCard key={request.id} listing={{
                  id: request.id,
                  itemName: request.itemNeeded,
                  description: `${request.ngoName}: ${request.description}`,
                  price: undefined,
                  originalPrice: undefined,
                  quantity: request.quantityNeeded,
                  pickupTime: undefined,
                  status: `${request.urgency} Priority`,
                  category: 'NGO',
                  image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
                  rating: undefined,
                  preparationTime: undefined,
                  location: undefined
                }} />
              ))}
            </div>
          </div>
        )}
        {activeTab === 'performance' && (
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>Performance Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Detailed Stats */}
              <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', padding: 24 }}>
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span style={{ color: 'var(--color-text-secondary)' }}>Total Orders</span>
                    <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{performanceStats.totalOrders}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: 'var(--color-text-secondary)' }}>Average Response Time</span>
                    <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{performanceStats.responseTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: 'var(--color-text-secondary)' }}>Repeat Customers</span>
                    <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{performanceStats.repeatCustomers}%</span>
                  </div>
                </div>
              </div>
              {/* Recent Activity */}
              <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', padding: 24 }}>
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3" style={{ background: 'var(--color-background)', borderRadius: 16 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 8, marginTop: 8, background: activity.type === 'order' ? 'var(--color-success)' : activity.type === 'donation' ? 'var(--color-premium)' : 'var(--color-accent)' }} />
                      <div className="flex-1">
                        <p style={{ color: 'var(--color-text-primary)', fontSize: 16 }}>{activity.message}</p>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: 12 }}>{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Placeholder for Charts */}
            <div className="mt-6" style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', padding: 24 }}>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Sales Trend</h3>
              <div style={{ height: 256, background: 'var(--color-background)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--color-border)' }} />
                  <p style={{ color: 'var(--color-text-secondary)' }}>Sales trend chart will be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}