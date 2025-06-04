'use client';

import React, { useState } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';

// Default translations
const translations = {
  en: {
    helpSupport: 'Help & Support',
    faqs: 'Frequently Asked Questions',
    contactUs: 'Contact Us',
    notFound: "If you couldn't find your answer in the FAQs, please contact us.",
    contactSoon: 'Contact form coming soon!',
  },
  sw: {
    helpSupport: 'Msaada & Usaidizi',
    faqs: 'Maswali Yanayoulizwa Mara kwa Mara',
    contactUs: 'Wasiliana Nasi',
    notFound: 'Ikiwa hujapata jibu kwenye Maswali, tafadhali wasiliana nasi.',
    contactSoon: 'Fomu ya mawasiliano inakuja hivi karibuni!',
  },
};

function SupportPage() {
  const [lang, setLang] = useState('en');
  const t = translations[lang as keyof typeof translations];

  return (
    <div className="container mx-auto px-4 py-8">
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

      <h1 className="text-3xl font-bold text-primary mb-6 text-center">{t.helpSupport}</h1>
      <div className="bg-surface p-6 rounded-lg shadow-md max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-text-primary mb-4">{t.faqs}</h2>
        <div className="space-y-3 mb-6">
          <details>
            <summary className="font-medium cursor-pointer hover:text-primary">How do I list a food item?</summary>
            <p className="text-text-secondary mt-1 pl-4">Sellers can list items through their dashboard after signing up.</p>
          </details>
          <details>
            <summary className="font-medium cursor-pointer hover:text-primary">How does payment work?</summary>
            <p className="text-text-secondary mt-1 pl-4">We primarily use M-PESA for secure transactions.</p>
          </details>
          {/* Add more FAQs */}
        </div>

        <h2 className="text-2xl font-semibold text-text-primary mb-4 mt-8">{t.contactUs}</h2>
        <p className="text-text-secondary mb-4">
          {t.notFound}
        </p>
        {/* <ContactForm /> */}
        <p className="text-lg font-semibold text-center mt-4">{t.contactSoon}</p>
      </div>
    </div>
  );
}

// No need for wrapper since we're managing language state locally
export default SupportPage;