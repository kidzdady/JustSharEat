'use client'; // Analytics often involve charts and dynamic data

import React from 'react';

export default function SellerAnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">Your Analytics</h1>
      <div className="bg-surface p-6 rounded-lg shadow-md">
        <p className="text-text-secondary text-center">
          Track your sales, donations, popular items, and overall impact.
        </p>
        {/* Placeholder for charts and stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-4 rounded text-center">
            <h2 className="text-xl font-semibold text-text-primary">Total Sales</h2>
            <p className="text-2xl text-secondary">Ksh 0</p>
            <p className="text-sm text-text-tertiary">Analytics data coming soon!</p>
          </div>
          <div className="bg-gray-100 p-4 rounded text-center">
            <h2 className="text-xl font-semibold text-text-primary">Items Listed</h2>
            <p className="text-2xl text-secondary">0</p>
            <p className="text-sm text-text-tertiary">Analytics data coming soon!</p>
          </div>
        </div>
      </div>
    </div>
  );
}