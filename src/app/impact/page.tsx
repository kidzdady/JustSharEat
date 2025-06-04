import React from 'react';

export default function ImpactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">Our Impact & Leaderboard</h1>
      <div className="bg-surface p-6 rounded-lg shadow-md">
        <p className="text-text-secondary text-center">
          Track the collective impact of the SharEat community and see who's leading the charge in saving meals and lives!
        </p>
        {/* Placeholder for impact statistics and leaderboard */}
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold">Impact statistics and leaderboard coming soon!</p>
        </div>
      </div>
    </div>
  );
}