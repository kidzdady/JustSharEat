"use client";

import React, { useState } from "react";
import { Search, MapPin, Clock, Star, Heart, Eye } from "lucide-react";
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { LanguageProvider } from '@/context/LanguageContext';

// Swahili translations
const sw = {
  filters: ["Zote", "Migahawa", "Matukio", "Nyumbani", "Zinaisha Karibu", "Vegan"],
  mealsSaved: "Chakula Kimeokolewa",
  donated: "Imetolewa",
  rescued: "Imenusuriwa",
  deals: {
    restaurant: "Bei ya Jioni",
    event: "Ziada za Matukio",
    home: "Ziada za Nyumbani",
    available: "zinapatikana",
    viewAll: "Tazama Zote →",
  },
  quickStats: ["Chakula Kimeokolewa", "Imetolewa", "Imenusuriwa"],
  feedSomeone: "Lisha Mtu Leo!",
  feedDesc: "Mchango wako unaweza kuleta mabadiliko halisi katika jamii yetu.",
  donateNow: "Toa Sasa",
  liveRescues: "Uokoaji wa Chakula Nairobi",
  comingSoon: "Ramani ya Moja kwa Moja Inakuja Hivi Karibuni",
  track: "Fuatilia uokoaji wa chakula Nairobi",
  addToCart: "Ongeza Kwenye Kikapu",
  itemsInCart: (n: number) => `${n} bidhaa kwenye kikapu chako`,
  continueShopping: "Endelea Kununua",
  emptyCart: "Kikapu chako kimekuwa tupu",
  emptyCartDesc: "Inaonekana hujaongeza bidhaa yoyote kwenye kikapu bado.",
  proceedToCheckout: "Endelea na Malipo",
  donate: "Toa",
};

const ConsumerHomePage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<{ [dealId: string]: number }>({});
  const [cartMessage, setCartMessage] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [lang, setLang] = useState<'en' | 'sw'>('en');
  const router = useRouter();

  const filters = ["All", "Restaurants", "Events", "Homes", "Expiring Soon", "Vegan"];
 // Expanded mock data with more realistic Kenyan food options
 const allDeals = [
  // Restaurant Deals
  { 
    id: '1', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: "Mama Njeri's Kitchen", 
    itemName: 'Ugali & Sukuma Wiki Combo', 
    originalPrice: 350, 
    discountedPrice: 180, 
    pickupTime: '7:00-9:00 PM', 
    countdown: '1h 15m left', 
    tags: ['Restaurant'], 
    arEnabled: true,
    rating: 4.8,
    distance: '0.8km',
    calories: 450,
    serves: 2
  },
  { 
    id: '2', 
    imageSrc: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'Kenchic Inn', 
    itemName: 'Chicken & Chips Meal', 
    originalPrice: 650, 
    discountedPrice: 320, 
    pickupTime: '6:30-8:30 PM', 
    countdown: '2h 30m left',
    tags: ['Restaurant'],
    rating: 4.6,
    distance: '1.2km',
    calories: 680,
    serves: 1
  },
  { 
    id: '3', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'City Snacks', 
    itemName: 'Beef Samosas (6pcs)', 
    originalPrice: 300, 
    discountedPrice: 150, 
    pickupTime: '6:00-8:00 PM', 
    countdown: '45m left',
    tags: ['Restaurant'],
    rating: 4.4,
    distance: '0.5km',
    calories: 360,
    serves: 3
  },
  { 
    id: '4', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'Java House', 
    itemName: 'Chicken Tikka Wrap', 
    originalPrice: 580, 
    discountedPrice: 290, 
    pickupTime: '7:00-9:00 PM', 
    tags: ['Restaurant'],
    rating: 4.7,
    distance: '2.1km',
    calories: 520,
    serves: 1
  },
  { 
    id: '12', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'Artcaffe', 
    itemName: 'Chicken Caesar Salad', 
    originalPrice: 720, 
    discountedPrice: 360, 
    pickupTime: '8:00-10:00 PM', 
    tags: ['Restaurant'],
    rating: 4.5,
    distance: '1.7km',
    calories: 420,
    serves: 1
  },
  { 
    id: '13', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'Steers', 
    itemName: 'Beef Burger Combo', 
    originalPrice: 850, 
    discountedPrice: 425, 
    pickupTime: '7:30-9:30 PM', 
    countdown: '3h 15m left',
    tags: ['Restaurant'],
    rating: 4.3,
    distance: '2.5km',
    calories: 780,
    serves: 1
  },
  { 
    id: '14', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'Mama Oliech', 
    itemName: 'Fish & Rice Special', 
    originalPrice: 550, 
    discountedPrice: 275, 
    pickupTime: '6:00-8:00 PM', 
    tags: ['Restaurant'],
    rating: 4.9,
    distance: '1.1km',
    calories: 620,
    serves: 1
  },
  { 
    id: '15', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'KFC Westgate', 
    itemName: 'Family Feast Bucket', 
    originalPrice: 2200, 
    discountedPrice: 1100, 
    pickupTime: '8:00-10:00 PM', 
    countdown: '1h 45m left',
    tags: ['Restaurant'],
    rating: 4.2,
    distance: '3.8km',
    calories: 1850,
    serves: 4
  },
  { 
    id: '16', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'Urban Burger', 
    itemName: 'Gourmet Beef Stack', 
    originalPrice: 950, 
    discountedPrice: 475, 
    pickupTime: '7:00-9:00 PM', 
    tags: ['Restaurant'],
    rating: 4.6,
    distance: '2.2km',
    calories: 920,
    serves: 1
  },
  
  // Event Surplus
  { 
    id: '5', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'Sarova Panafric', 
    itemName: 'Wedding Pilau Platter', 
    originalPrice: 1200, 
    discountedPrice: 500, 
    pickupTime: '10:00 PM onwards', 
    tags: ['Event'],
    rating: 4.9,
    distance: '3.2km',
    calories: 850,
    serves: 3
  },
  { 
    id: '6', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'Villa Rosa Kempinski', 
    itemName: 'Corporate Event Buffet Box', 
    originalPrice: 2500, 
    discountedPrice: 1000, 
    pickupTime: '8:00-10:00 PM', 
    tags: ['Event'],
    rating: 4.8,
    distance: '4.5km',
    calories: 1200,
    serves: 4
  },
  { 
    id: '7', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'Safari Park Hotel', 
    itemName: 'Conference Lunch Package', 
    originalPrice: 1800, 
    discountedPrice: 750, 
    pickupTime: '2:00-4:00 PM', 
    tags: ['Event'],
    rating: 4.6,
    distance: '6.8km',
    calories: 950,
    serves: 2
  },
  { 
    id: '17', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'Intercontinental Hotel', 
    itemName: 'Gala Dinner Leftovers', 
    originalPrice: 3500, 
    discountedPrice: 1400, 
    pickupTime: '11:00 PM onwards', 
    tags: ['Event'],
    rating: 4.9,
    distance: '5.2km',
    calories: 1450,
    serves: 5
  },
  { 
    id: '18', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'Radisson Blu', 
    itemName: 'Business Lunch Boxes', 
    originalPrice: 1600, 
    discountedPrice: 640, 
    pickupTime: '3:00-5:00 PM', 
    tags: ['Event'],
    rating: 4.7,
    distance: '4.1km',
    calories: 890,
    serves: 2
  },
  { 
    id: '19', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'Nairobi Serena', 
    itemName: 'Wedding Cake & Canapés', 
    originalPrice: 2800, 
    discountedPrice: 1120, 
    pickupTime: '9:00-11:00 PM', 
    tags: ['Event'],
    rating: 4.8,
    distance: '3.9km',
    calories: 1680,
    serves: 6
  },
  { 
    id: '20', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'Fairmont Norfolk', 
    itemName: 'Cocktail Party Platter', 
    originalPrice: 2200, 
    discountedPrice: 880, 
    pickupTime: '8:30-10:30 PM', 
    tags: ['Event'],
    rating: 4.6,
    distance: '2.7km',
    calories: 1150,
    serves: 4
  },
  
  // Home Surplus
  { 
    id: '8', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'Grace M.', 
    itemName: 'Homemade Nyama Choma', 
    originalPrice: 800, 
    discountedPrice: 400, 
    pickupTime: '6:00-8:00 PM', 
    tags: ['Home'], 
    arEnabled: true,
    rating: 4.9,
    distance: '1.8km',
    calories: 720,
    serves: 2
  },
  { 
    id: '9', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'Peter K.', 
    itemName: 'Githeri & Greens', 
    originalPrice: 250, 
    discountedPrice: 120, 
    pickupTime: '5:00-7:00 PM', 
    tags: ['Home', 'Vegan'],
    rating: 4.3,
    distance: '0.9km',
    calories: 380,
    serves: 2
  },
  { 
    id: '10', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'Mary W.', 
    itemName: 'Traditional Mukimo', 
    originalPrice: 400, 
    discountedPrice: 200, 
    pickupTime: '6:30-8:30 PM', 
    tags: ['Home', 'Vegan'],
    rating: 4.7,
    distance: '2.3km',
    calories: 420,
    serves: 3
  },
  { 
    id: '11', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'John M.', 
    itemName: 'Fish & Ugali Combo', 
    originalPrice: 600, 
    discountedPrice: 300, 
    pickupTime: '7:00-9:00 PM', 
    tags: ['Home'],
    rating: 4.5,
    distance: '1.5km',
    calories: 580,
    serves: 2
  },
  { 
    id: '21', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'Sarah N.', 
    itemName: 'Chapati & Beef Stew', 
    originalPrice: 450, 
    discountedPrice: 225, 
    pickupTime: '6:00-8:00 PM', 
    tags: ['Home'],
    rating: 4.6,
    distance: '1.3km',
    calories: 520,
    serves: 2
  },
  { 
    id: '22', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'David O.', 
    itemName: 'Mandazi & Tea Setup', 
    originalPrice: 200, 
    discountedPrice: 100, 
    pickupTime: '4:00-6:00 PM', 
    tags: ['Home', 'Vegan'],
    rating: 4.2,
    distance: '0.7km',
    calories: 280,
    serves: 4
  },
  { 
    id: '23', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'Agnes K.', 
    itemName: 'Kienyeji Chicken Stew', 
    originalPrice: 750, 
    discountedPrice: 375, 
    pickupTime: '7:00-9:00 PM', 
    tags: ['Home'], 
    arEnabled: true,
    rating: 4.8,
    distance: '2.1km',
    calories: 650,
    serves: 3
  },
  { 
    id: '24', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'James W.', 
    itemName: 'Coconut Rice & Beans', 
    originalPrice: 320, 
    discountedPrice: 160, 
    pickupTime: '5:30-7:30 PM', 
    tags: ['Home', 'Vegan'],
    rating: 4.4,
    distance: '1.6km',
    calories: 440,
    serves: 2
  },
  { 
    id: '25', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'Lucy M.', 
    itemName: 'Matoke & Meat Stew', 
    originalPrice: 500, 
    discountedPrice: 250, 
    pickupTime: '6:30-8:30 PM', 
    tags: ['Home'],
    rating: 4.7,
    distance: '1.9km',
    calories: 580,
    serves: 2
  },
  { 
    id: '26', 
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', 
    sellerName: 'Robert K.', 
    itemName: 'Homemade Samosas (12pcs)', 
    originalPrice: 360, 
    discountedPrice: 180, 
    pickupTime: '5:00-7:00 PM', 
    countdown: '2h 15m left',
    tags: ['Home'],
    rating: 4.5,
    distance: '1.4km',
    calories: 720,
    serves: 4
  }
];

// Filtering deals based on activeFilter
const getFilteredDeals = () => {
  switch (activeFilter) {
    case 'All':
      return allDeals;
    case 'Restaurants':
      return allDeals.filter(d => d.tags.includes('Restaurant'));
    case 'Events':
      return allDeals.filter(d => d.tags.includes('Event'));
    case 'Homes':
      return allDeals.filter(d => d.tags.includes('Home'));
    case 'Expiring Soon':
      return allDeals.filter(d => d.countdown && parseInt(d.countdown) < 60);
    case 'Vegan':
      return allDeals.filter(d => d.tags.includes('Vegan'));
    default:
      return allDeals;
  }
};

// Toggle favorite function
const toggleFavorite = (dealId: string) => {
  setFavorites(prev => {
    const newFavorites = new Set(prev);
    if (newFavorites.has(dealId)) {
      newFavorites.delete(dealId);
    } else {
      newFavorites.add(dealId);
    }
    return newFavorites;
  });
};

// Add to cart handler
const handleAddToCart = (deal: Deal) => {
  addToCart({
    id: deal.id,
    name: deal.itemName,
    price: deal.discountedPrice,
    quantity: 1,
    image: deal.imageSrc,
    sellerName: deal.sellerName,
  });
  setCartMessage(`${deal.itemName} added to cart!`);
  setTimeout(() => setCartMessage(null), 2000);
};

// DealCard component


type Deal = {
  id: string;
  imageSrc: string;
  sellerName: string;
  itemName: string;
  originalPrice: number;
  discountedPrice: number;
  pickupTime: string;
  countdown?: string;
  tags: string[];
  rating: number;
  distance: string;
  calories: number;
  serves: number;
  arEnabled?: boolean;
  description?: string;
};

type DealCardProps = {
  deal: Deal;
  favorites: Set<string>;
  toggleFavorite: (dealId: string) => void;
};

const DealCard: React.FC<DealCardProps & { onAddToCart: (deal: Deal) => void }> = ({ deal, favorites, toggleFavorite, onAddToCart }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="relative">
      <img 
        src={deal.imageSrc} 
        alt={deal.itemName}
        className="w-full h-48 object-cover"
      />
      <button 
        onClick={() => toggleFavorite(deal.id)}
        className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
        aria-label={favorites.has(deal.id) ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart 
          className={`w-5 h-5 ${favorites.has(deal.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
        />
      </button>
      {deal.arEnabled && (
        <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <Eye className="w-3 h-3" />
          AR
        </div>
      )}
      {deal.countdown && (
        <div className="absolute bottom-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
          ⏰ {deal.countdown}
        </div>
      )}
    </div>
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-gray-900 text-lg truncate flex-1">{deal.itemName}</h3>
        <div className="flex items-center gap-1 ml-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-700">{deal.rating}</span>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-3">{deal.sellerName}</p>
      
      <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {deal.distance}
        </span>
        <span>{deal.calories} cal</span>
        <span>Serves {deal.serves}</span>
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-green-600">
            KSh {deal.discountedPrice}
          </span>
          <span className="text-sm text-gray-500 line-through">
            KSh {deal.originalPrice}
          </span>
        </div>
        <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
          {Math.round(((deal.originalPrice - deal.discountedPrice) / deal.originalPrice) * 100)}% off
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          {deal.pickupTime}
        </div>
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
          onClick={() => onAddToCart(deal)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

// Use swahili if lang === 'sw', else default
  const t = lang === 'sw' ? sw : {
    filters: filters,
    mealsSaved: "Meals Saved",
    donated: "Donated",
    rescued: "Rescued",
    deals: {
      restaurant: "Bei ya Jioni Deals",
      event: "Event Surplus",
      home: "Home Surplus",
      available: "available",
      viewAll: "View All →",
    },
    quickStats: ["Meals Saved", "Donated", "Rescued"],
    feedSomeone: "Feed Someone Today!",
    feedDesc: "Your contribution can make a real difference in our community.",
    donateNow: "Donate Now",
    liveRescues: "Live Nairobi Food Rescues",
    comingSoon: "Interactive Map Coming Soon",
    track: "Track real-time food rescues across Nairobi",
    addToCart: "Add to Cart",
    itemsInCart: (n: number) => `${n} items in your cart`,
    continueShopping: "Continue Shopping",
    emptyCart: "Your cart is empty",
    emptyCartDesc: "Looks like you haven't added any items to your cart yet.",
    proceedToCheckout: "Proceed to Checkout",
    donate: "Donate",
  };
  return (
    <div className="fixed inset-0 min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 overflow-x-hidden z-0 flex flex-col">
      <div className="flex-grow flex flex-col w-full">
        <div className="w-full px-0 py-8 max-w-full h-full flex flex-col">
          <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            .deal-carousel {
              display: flex;
              flex-direction: row;
              overflow-x: auto;
              gap: 1.5rem;
              width: max-content;
            }
          `}</style>

          {/* Language Toggle - move even lower and keep visible */}
          <div className="w-full flex justify-end items-center mb-8 mt-8 pr-6" style={{ position: 'relative', zIndex: 10 }}>
            <div className="inline-flex shadow rounded-full bg-white border">
              <button
                className={`px-3 py-1 rounded-l-full font-semibold transition-colors ${lang === 'en' ? 'bg-orange-500 text-white' : 'text-gray-700'}`}
                onClick={() => setLang('en')}
              >EN</button>
              <button
                className={`px-3 py-1 rounded-r-full font-semibold transition-colors ${lang === 'sw' ? 'bg-orange-500 text-white' : 'text-gray-700'}`}
                onClick={() => setLang('sw')}
              >SW</button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex overflow-x-auto gap-3 mb-8 pb-2 px-6">
            {t.filters.map((filter, i) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filters[i])}
                className={`whitespace-nowrap px-6 py-3 rounded-full font-medium transition-all ${
                  activeFilter === filters[i]
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 px-6">
            <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
              <div className="text-3xl font-bold text-orange-500">2,840+</div>
              <div className="text-sm text-gray-600">{t.mealsSaved}</div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
              <div className="text-3xl font-bold text-green-500">580+</div>
              <div className="text-sm text-gray-600">{t.donated}</div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
              <div className="text-3xl font-bold text-blue-500">1.2T kg</div>
              <div className="text-sm text-gray-600">{t.rescued}</div>
            </div>
          </div>

          {/* Deals Sections - Netflix Style */}
          <div className="space-y-12 px-6">
            {activeFilter === 'All' ? (
              <>
                {/* Restaurant Section */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      🍽️ {t.deals.restaurant}
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium">
                        {allDeals.filter(d => d.tags.includes('Restaurant')).length} {t.deals.available}
                      </span>
                    </h2>
                    <button className="text-orange-500 hover:text-orange-600 font-medium text-sm" onClick={() => window.location.href = '/consumer/all'}>
                      {t.deals.viewAll}
                    </button>
                  </div>
                  <div className="hide-scrollbar deal-carousel pb-4">
                    {allDeals.filter(d => d.tags.includes('Restaurant')).map(deal => (
                      <div key={deal.id} className="w-80 flex-shrink-0">
                        <DealCard deal={deal} favorites={favorites} toggleFavorite={toggleFavorite} onAddToCart={handleAddToCart} />
                      </div>
                    ))}
                  </div>
                </section>

                {/* Event Section */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      {t.deals.event}
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">
                        {allDeals.filter(d => d.tags.includes('Event')).length} {t.deals.available}
                      </span>
                    </h2>
                    <button className="text-purple-500 hover:text-purple-600 font-medium text-sm" onClick={() => window.location.href = '/consumer/all'}>
                      {t.deals.viewAll}
                    </button>
                  </div>
                  <div className="hide-scrollbar deal-carousel pb-4">
                    {allDeals.filter(d => d.tags.includes('Event')).map(deal => (
                      <div key={deal.id} className="w-80 flex-shrink-0">
                        <DealCard deal={deal} favorites={favorites} toggleFavorite={toggleFavorite} onAddToCart={handleAddToCart} />
                      </div>
                    ))}
                  </div>
                </section>

                {/* Home Section */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      {t.deals.home}
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                        {allDeals.filter(d => d.tags.includes('Home')).length} {t.deals.available}
                      </span>
                    </h2>
                    <button className="text-green-500 hover:text-green-600 font-medium text-sm" onClick={() => window.location.href = '/consumer/all'}>
                      {t.deals.viewAll}
                    </button>
                  </div>
                  <div className="hide-scrollbar deal-carousel pb-4">
                    {allDeals.filter(d => d.tags.includes('Home')).map(deal => (
                      <div key={deal.id} className="w-80 flex-shrink-0">
                        <DealCard deal={deal} favorites={favorites} toggleFavorite={toggleFavorite} onAddToCart={handleAddToCart} />
                      </div>
                    ))}
                  </div>
                </section>
              </>
            ) : (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t.filters[filters.indexOf(activeFilter)]} {t.deals.available} ({getFilteredDeals().length} {t.deals.available})
                </h2>
                <div className="hide-scrollbar deal-carousel pb-4">
                  {getFilteredDeals().map(deal => (
                    <div key={deal.id} className="w-80 flex-shrink-0">
                      <DealCard deal={deal} favorites={favorites} toggleFavorite={toggleFavorite} onAddToCart={handleAddToCart} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Donation Banner */}
          <section className="mt-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-center text-white mx-6">
            <div className="text-6xl mb-4">🍲</div>
            <h2 className="text-3xl font-bold mb-4">{t.feedSomeone}</h2>
            <p className="text-orange-100 mb-6 text-lg">{t.feedDesc}</p>
            <button
              className="bg-white text-orange-500 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
              onClick={() => window.location.href = '/donate'}
            >
              {t.donateNow}
            </button>
          </section>

          {/* Community Map Placeholder */}
          <section className="mt-8 mx-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.liveRescues}</h2>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center text-gray-600">
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-green-500" />
                  <p className="text-lg font-medium">{t.comingSoon}</p>
                  <p className="text-sm">{t.track}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Cart Message Toast */}
          {cartMessage && (
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg z-50 transition-all animate-bounce-in">
              {cartMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Wrap the page in the LanguageProvider
export default function PageWrapper() {
  return (
    <LanguageProvider>
      <ConsumerHomePage />
    </LanguageProvider>
  );
}
