"use client";
import React from "react";
import { useCart } from '@/context/CartContext';
import { MapPin, Clock, Star, Heart, Eye } from "lucide-react";

const AllDealsPage = () => {
  const { addToCart } = useCart();
  // Use the same allDeals array as in consumer/page.tsx, but with Unsplash images
  const allDeals = [
    {
      id: '1',
      imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
      sellerName: "Mama Njeri's Kitchen",
      itemName: 'Ugali & Sukuma Wiki Combo',
      originalPrice: 350,
      discountedPrice: 180,
      pickupTime: '7:00-9:00 PM',
      tags: ['Restaurant'],
      rating: 4.8,
      distance: '0.8km',
      calories: 450,
      serves: 2
    },
    // ...add more deals here, each with a unique Unsplash imageSrc...
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">All Food Deals</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {allDeals.map((deal) => (
            <div key={deal.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <img src={deal.imageSrc} alt={deal.itemName} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-lg truncate">{deal.itemName}</h3>
                <p className="text-gray-600 text-sm mb-2">{deal.sellerName}</p>
                <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />{deal.distance}
                  <span>{deal.calories} cal</span>
                  <span>Serves {deal.serves}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-green-600">KSh {deal.discountedPrice}</span>
                  <span className="text-sm text-gray-500 line-through">KSh {deal.originalPrice}</span>
                </div>
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors w-full"
                  onClick={() => addToCart({
                    id: deal.id,
                    name: deal.itemName,
                    price: deal.discountedPrice,
                    quantity: 1,
                    image: deal.imageSrc,
                    sellerName: deal.sellerName,
                  })}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AllDealsPage;
