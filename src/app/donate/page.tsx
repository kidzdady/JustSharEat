"use client";

import React, { useState } from 'react';
import { Heart, Utensils, Coffee, Sandwich, Apple, ChefHat, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';

// 1. Add TypeScript types for category and item
interface DonationItem {
  id: number;
  name: string;
  description: string;
  goal: number;
  raised: number;
  image: string;
  urgency: 'high' | 'medium' | 'low' | string;
  servings: number;
}

interface DonationCategory {
  id: string;
  title: string;
  icon: React.ReactElement;
  color: string;
  items: DonationItem[];
}

function DonatePage() {
  const { lang, setLang, t } = useLanguage();
  const donateT = t.donate;

  const foodDonationCategories: DonationCategory[] = [
    {
      id: 'hot-meals',
      title: 'Hot Meals & Soup Kitchens',
      icon: <Utensils className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      items: [
        { id: 1, name: 'Downtown Soup Kitchen', description: 'Serving 200+ hot meals daily to homeless individuals', goal: 5000, raised: 3200, image: '🍲', urgency: 'high', servings: 150 },
        { id: 2, name: 'Community Hot Lunch', description: 'Free lunch program for low-income families', goal: 8000, raised: 6100, image: '🍱', urgency: 'medium', servings: 300 },
        { id: 3, name: 'Senior Meal Delivery', description: 'Home-delivered hot meals for elderly residents', goal: 3500, raised: 2800, image: '🥘', urgency: 'low', servings: 85 },
        { id: 4, name: 'Emergency Shelter Dining', description: 'Three meals a day for shelter residents', goal: 12000, raised: 9500, image: '🍛', urgency: 'high', servings: 400 },
        { id: 5, name: 'Mobile Food Truck', description: 'Hot meals delivered to underserved neighborhoods', goal: 7200, raised: 4800, image: '🚚', urgency: 'medium', servings: 200 }
      ]
    },
    {
      id: 'school-nutrition',
      title: 'School & Youth Nutrition',
      icon: <Apple className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      items: [
        { id: 6, name: 'Free Breakfast Program', description: 'Nutritious breakfast for students before school', goal: 6500, raised: 4300, image: '🥞', urgency: 'medium', servings: 180 },
        { id: 7, name: 'Weekend Backpack Program', description: 'Take-home meals for students over weekends', goal: 4200, raised: 1800, image: '🎒', urgency: 'high', servings: 120 },
        { id: 8, name: 'Summer Lunch Program', description: 'Meals for kids when school is out', goal: 9000, raised: 6200, image: '🌞', urgency: 'medium', servings: 250 },
        { id: 9, name: 'After School Snacks', description: 'Healthy snacks for extended day programs', goal: 3500, raised: 2900, image: '🍎', urgency: 'low', servings: 100 },
        { id: 10, name: 'Special Dietary Meals', description: 'Allergen-free meals for students with special needs', goal: 5500, raised: 3200, image: '🥗', urgency: 'high', servings: 65 }
      ]
    },
    {
      id: 'food-pantries',
      title: 'Food Pantries & Banks',
      icon: <Sandwich className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      items: [
        { id: 11, name: 'Central Food Bank', description: 'Non-perishable food distribution center', goal: 20000, raised: 15500, image: '🥫', urgency: 'high', servings: 800 },
        { id: 12, name: 'Fresh Produce Pantry', description: 'Fresh fruits and vegetables for families', goal: 12000, raised: 8200, image: '🥕', urgency: 'medium', servings: 350 },
        { id: 13, name: 'Emergency Food Boxes', description: 'Week-long food supplies for crisis situations', goal: 8500, raised: 6800, image: '📦', urgency: 'high', servings: 200 },
        { id: 14, name: 'Holiday Meal Baskets', description: 'Complete holiday meals for struggling families', goal: 15000, raised: 11300, image: '🦃', urgency: 'medium', servings: 450 },
        { id: 15, name: 'Baby Food Program', description: 'Formula and baby food for young families', goal: 6000, raised: 4100, image: '🍼', urgency: 'high', servings: 75 }
      ]
    },
    {
      id: 'community-kitchens',
      title: 'Community Kitchens & Cafes',
      icon: <ChefHat className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      items: [
        { id: 16, name: 'Pay-What-You-Can Cafe', description: 'Dignified dining for all income levels', goal: 18000, raised: 12800, image: '☕', urgency: 'medium', servings: 500 },
        { id: 17, name: 'Community Cooking Classes', description: 'Teaching nutrition and cooking skills with free meals', goal: 7500, raised: 5200, image: '👨‍🍳', urgency: 'low', servings: 120 },
        { id: 18, name: 'Cultural Food Program', description: 'Celebrating diversity through traditional meals', goal: 9500, raised: 6900, image: '🌮', urgency: 'medium', servings: 280 },
        { id: 19, name: 'Recovery Support Meals', description: 'Nutritious meals for addiction recovery programs', goal: 11000, raised: 8500, image: '🥛', urgency: 'high', servings: 160 },
        { id: 20, name: 'Senior Community Dining', description: 'Social meals to combat senior isolation', goal: 8000, raised: 5500, image: '👵', urgency: 'medium', servings: 140 }
      ]
    },
    {
      id: 'specialty-programs',
      title: 'Specialty Food Programs',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-rose-500 to-orange-500',
      items: [
        { id: 21, name: 'Diabetic-Friendly Meals', description: 'Specialized meals for diabetic community members', goal: 10000, raised: 7200, image: '💚', urgency: 'medium', servings: 180 },
        { id: 22, name: 'Kosher Food Program', description: 'Kosher meals for Jewish community members in need', goal: 8500, raised: 6000, image: '✡️', urgency: 'low', servings: 95 },
        { id: 23, name: 'Halal Food Initiative', description: 'Halal meals respecting Islamic dietary requirements', goal: 9000, raised: 6500, image: '☪️', urgency: 'medium', servings: 110 },
        { id: 24, name: 'Vegan & Vegetarian Meals', description: 'Plant-based nutrition for dietary preferences', goal: 6500, raised: 4800, image: '🌱', urgency: 'low', servings: 120 },
        { id: 25, name: 'Gluten-Free Program', description: 'Safe meals for those with celiac disease', goal: 7200, raised: 5100, image: '🌾', urgency: 'medium', servings: 85 }
      ]
    },
    {
      id: 'emergency-relief',
      title: 'Emergency Food Relief',
      icon: <Users className="w-6 h-6" />,
      color: 'from-red-500 to-pink-600',
      items: [
        { id: 26, name: 'Disaster Relief Meals', description: 'Ready-to-eat meals for emergency situations', goal: 25000, raised: 18200, image: '🚨', urgency: 'high', servings: 1000 },
        { id: 27, name: 'Winter Warming Centers', description: 'Hot meals and warm beverages during cold snaps', goal: 12000, raised: 9500, image: '❄️', urgency: 'high', servings: 350 },
        { id: 28, name: 'Hurricane Relief Kitchen', description: 'Mobile kitchen for storm-affected areas', goal: 35000, raised: 22000, image: '🌪️', urgency: 'high', servings: 1500 },
        { id: 29, name: 'Food Truck for Homeless', description: 'Mobile meals reaching homeless encampments', goal: 15000, raised: 11800, image: '🚛', urgency: 'medium', servings: 400 },
        { id: 30, name: 'Family Crisis Support', description: 'Immediate food assistance for families in crisis', goal: 8000, raised: 6300, image: '🏠', urgency: 'high', servings: 200 }
      ]
    }
  ];

  const CategoryRow = ({ category }: { category: DonationCategory }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const itemWidth = 320;
    const [maxScroll, setMaxScroll] = useState(0);
    React.useEffect(() => {
      if (typeof window !== 'undefined') {
        setMaxScroll(Math.max(0, (category.items.length * itemWidth) - (window.innerWidth - 100)));
      }
    }, [category.items.length]);
    
    const scroll = (direction: 'left' | 'right') => {
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - itemWidth * 2)
        : Math.min(maxScroll, scrollPosition + itemWidth * 2);
      setScrollPosition(newPosition);
    };

    const getUrgencyColor = (urgency: string) => {
      switch(urgency) {
        case 'high': return 'bg-red-100 text-red-800';
        case 'medium': return 'bg-yellow-100 text-yellow-800';
        case 'low': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-full bg-gradient-to-r ${category.color}`}>
              {React.cloneElement(category.icon, { className: "w-6 h-6 text-white" })}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{category.title}</h2>
          </div>
          <div className="flex space-x-2">
            {scrollPosition > 0 && (
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            {scrollPosition < maxScroll && (
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {category.items.map((item) => {
              const progressPercentage = (item.raised / item.goal) * 100;
              return (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-80 mr-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{item.image}</div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(item.urgency)}`}>
                        {donateT[(item.urgency as 'high' | 'medium' | 'low')] || item.urgency} {donateT.urgency}
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                    
                    <div className="bg-orange-50 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-orange-700 font-medium">{donateT.servings}:</span>
                        <span className="text-orange-800 font-bold">{item.servings}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">{donateT.raised}: ${item.raised.toLocaleString()}</span>
                        <span className="text-gray-800 font-medium">{donateT.donationGoal}: ${item.goal.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {progressPercentage.toFixed(1)}% funded
                      </div>
                    </div>
                    
                    <button className={`w-full py-2 px-4 rounded-lg font-medium text-white bg-gradient-to-r ${category.color} hover:shadow-lg transition-all duration-200`}>
                      {donateT.donateNow}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const totalServings = foodDonationCategories.reduce((total, category) => 
    total + category.items.reduce((catTotal, item) => catTotal + item.servings, 0), 0
  );

  const totalRaised = foodDonationCategories.reduce((total, category) => 
    total + category.items.reduce((catTotal, item) => catTotal + item.raised, 0), 0
  );

  const totalProjects = foodDonationCategories.reduce((total, category) => total + category.items.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Language Toggle */}
        <div className="flex justify-end mb-4">
          <button
            className={`px-3 py-1 rounded-l ${lang === 'en' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setLang('en')}
          >EN</button>
          <button
            className={`px-3 py-1 rounded-r ${lang === 'sw' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setLang('sw')}
          >SW</button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 rounded-full bg-gradient-to-r from-orange-500 to-red-600 shadow-lg">
              <Utensils className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">SharEat Food Donation Hub</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help us fight hunger in our community. Every donation provides nutritious meals to those in need.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">${totalRaised.toLocaleString()}+</div>
              <div className="text-gray-600">Total Food Funds Raised</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{totalServings.toLocaleString()}</div>
              <div className="text-gray-600">Daily Meals Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{totalProjects}</div>
              <div className="text-gray-600">Food Programs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Emergency Food Access</div>
            </div>
          </div>
        </div>

        {/* Food Donation Categories */}
        <div className="space-y-8">
          {foodDonationCategories.map((category) => (
            <CategoryRow key={category.id} category={category} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Together We Can End Hunger</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our mission to ensure no one in our community goes to bed hungry tonight.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 font-semibold py-3 px-8 rounded-xl hover:shadow-lg transition-all">
              Become a Food Partner
            </button>
            <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-xl hover:bg-white hover:text-orange-600 transition-all">
              Volunteer at Kitchen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DonatePageWrapper() {
  return (
    <LanguageProvider>
      <DonatePage />
    </LanguageProvider>
  );
}