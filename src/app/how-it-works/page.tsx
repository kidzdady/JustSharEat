import React from 'react';

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center font-display">How SharEat Works</h1>

      <div className="bg-surface p-8 rounded-lg shadow-lg max-w-3xl mx-auto space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-secondary mb-3">For Consumers</h2>
          <ol className="list-decimal list-inside text-text-secondary space-y-2 leading-relaxed">
            <li><strong>Sign Up/Log In:</strong> Create your account or log in to get started.</li>
            <li><strong>Browse Deals:</strong> Explore surplus food listings from local restaurants, events, and homes.</li>
            <li><strong>Purchase or Claim:</strong> Buy meals at a discount or claim free donations.</li>
            <li><strong>Pick Up/Receive:</strong> Collect your food at the specified time and location, or arrange for delivery if available.</li>
            <li><strong>Make an Impact:</strong> Every meal saved contributes to reducing food waste and helping your community.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-accent mb-3">For Sellers (Restaurants, Events, Homes)</h2>
          <ol className="list-decimal list-inside text-text-secondary space-y-2 leading-relaxed">
            <li><strong>Sign Up/Log In:</strong> Register your establishment or as a home seller.</li>
            <li><strong>List Surplus Food:</strong> Easily upload details about your unsold, edible food items, set prices, or mark for donation.</li>
            <li><strong>Get Notified:</strong> Receive alerts when consumers purchase or claim your listings.</li>
            <li><strong>Manage Listings:</strong> Track your sales, donations, and impact through your dashboard.</li>
            <li><strong>Reduce Waste & Recover Costs:</strong> Minimize food waste and potentially recover some operational costs.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-premium mb-3">For NGOs</h2>
          <ol className="list-decimal list-inside text-text-secondary space-y-2 leading-relaxed">
            <li><strong>Sign Up/Log In:</strong> Register your non-governmental organization.</li>
            <li><strong>Browse Donations:</strong> Find available food donations from sellers.</li>
            <li><strong>Claim Donations:</strong> Secure food for your beneficiaries.</li>
            <li><strong>Coordinate Pickup:</strong> Arrange collection of the donated food items.</li>
            <li><strong>Track Impact:</strong> See the amount of food received and distributed through your dashboard.</li>
          </ol>
        </section>
      </div>
    </div>
  );
}