'use client'; // Forms are often client components

import React from 'react';
// import ListingForm from '@/components/forms/ListingForm'; // Assuming you'll have this

export default function SellerUploadPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">Upload New Listing</h1>
      <div className="bg-surface p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <p className="text-text-secondary mb-4">
          Fill out the form below to list your surplus food items.
        </p>
        {/* Placeholder for ListingForm component */}
        {/* <ListingForm /> */}
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold">Listing form coming soon!</p>
        </div>
      </div>
    </div>
  );
}