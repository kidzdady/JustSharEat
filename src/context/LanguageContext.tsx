"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

const translations = {
  en: {
    cart: {
      myCart: 'My Cart',
      itemsInCart: (n: number) => `${n} items in your cart`,
      orderSummary: 'Order Summary',
      subtotal: 'Subtotal',
      discount: 'Discount',
      total: 'Total',
      proceedToCheckout: 'Proceed to Checkout',
      secureCheckout: 'Secure checkout powered by SSL',
      emptyCart: 'Your cart is empty',
      emptyCartDesc: `Looks like you haven't added any items to your cart yet.`,
      continueShopping: 'Continue Shopping',
      remove: (name: string) => `Remove ${name} from cart`,
      decrease: (name: string) => `Decrease quantity of ${name}`,
      increase: (name: string) => `Increase quantity of ${name}`,
      each: 'each',
    },
    checkout: {
      checkout: 'Checkout',
      payment: 'Payment',
      delivery: 'Delivery',
      placeOrder: 'Place Order',
      back: 'Back',
      mpesa: 'M-PESA',
      card: 'Card',
      address: 'Delivery Address',
      phone: 'Phone Number',
      name: 'Name',
      orderSummary: 'Order Summary',
      subtotal: 'Subtotal',
      discount: 'Discount',
      total: 'Total',
      secureCheckout: 'Secure checkout powered by SSL',
      emptyCart: 'Your cart is empty',
      success: 'Order placed successfully!',
      error: 'There was an error placing your order.',
    },
    donate: {
      donate: 'Donate',
      donateNow: 'Donate Now',
      donationGoal: 'Donation Goal',
      raised: 'Raised',
      servings: 'Servings',
      urgency: 'Urgency',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      support: 'Support',
    },
    profile: {
      profile: 'Profile',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      donationHistory: 'Donation History',
      notifications: 'Notifications',
      settings: 'Settings',
    },
    support: {
      helpSupport: 'Help & Support',
      faqs: 'Frequently Asked Questions',
      contactUs: 'Contact Us',
      contactSoon: 'Contact form coming soon!',
      notFound: `If you can't find an answer in our FAQs, please feel free to reach out to us.`,
    },
    // ...add other page translations here
  },
  sw: {
    cart: {
      myCart: 'Kikapu Changu',
      itemsInCart: (n: number) => `${n} bidhaa kwenye kikapu chako`,
      orderSummary: 'Muhtasari wa Oda',
      subtotal: 'Jumla Ndogo',
      discount: 'Punguzo',
      total: 'Jumla',
      proceedToCheckout: 'Endelea na Malipo',
      secureCheckout: 'Malipo salama yanalindwa na SSL',
      emptyCart: 'Kikapu chako kimekuwa tupu',
      emptyCartDesc: 'Inaonekana hujaongeza bidhaa yoyote kwenye kikapu bado.',
      continueShopping: 'Endelea Kununua',
      remove: (name: string) => `Ondoa ${name} kwenye kikapu`,
      decrease: (name: string) => `Punguza idadi ya ${name}`,
      increase: (name: string) => `Ongeza idadi ya ${name}`,
      each: 'kila moja',
    },
    checkout: {
      checkout: 'Malipo',
      payment: 'Malipo',
      delivery: 'Uwasilishaji',
      placeOrder: 'Weka Oda',
      back: 'Rudi',
      mpesa: 'M-PESA',
      card: 'Kadi',
      address: 'Anwani ya Uwasilishaji',
      phone: 'Nambari ya Simu',
      name: 'Jina',
      orderSummary: 'Muhtasari wa Oda',
      subtotal: 'Jumla Ndogo',
      discount: 'Punguzo',
      total: 'Jumla',
      secureCheckout: 'Malipo salama yanalindwa na SSL',
      emptyCart: 'Kikapu chako kimekuwa tupu',
      success: 'Oda imewekwa kwa mafanikio!',
      error: 'Kumetokea hitilafu wakati wa kuweka oda.',
    },
    donate: {
      donate: 'Toa',
      donateNow: 'Toa Sasa',
      donationGoal: 'Lengo la Mchango',
      raised: 'Zilizokusanywa',
      servings: 'Waliofaidika',
      urgency: 'Uharaka',
      high: 'Juu',
      medium: 'Wastani',
      low: 'Chini',
      support: 'Saida',
    },
    profile: {
      profile: 'Wasifu',
      edit: 'Hariri',
      save: 'Hifadhi',
      cancel: 'Ghairi',
      donationHistory: 'Historia ya Michango',
      notifications: 'Arifa',
      settings: 'Mipangilio',
    },
    support: {
      helpSupport: 'Msaada & Usaidizi',
      faqs: 'Maswali Yanayoulizwa Mara kwa Mara',
      contactUs: 'Wasiliana Nasi',
      contactSoon: 'Fomu ya mawasiliano inakuja hivi karibuni!',
      notFound: 'Ikiwa hujapata jibu kwenye Maswali, tafadhali wasiliana nasi.',
    },
    // ...add other page translations here
  },
};

type Language = 'en' | 'sw';

interface LanguageContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations['en'];
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
