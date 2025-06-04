import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center font-display">About SharEat</h1>
      
      <div className="bg-surface p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-3">Our Mission</h2>
          <p className="text-text-secondary leading-relaxed">
            At SharEat, our mission is simple: a meal saved is a life saved. We aim to combat food waste
            and alleviate hunger in Kenya by connecting those with surplus food to those in need. We believe
            that by working together, we can make a significant impact on our communities and the environment.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-3">What We Do</h2>
          <p className="text-text-secondary leading-relaxed">
            SharEat provides a platform for restaurants, event organizers, and households to list their
            unsold, edible surplus food at discounted prices or for donation. Consumers can discover great deals
            on meals, and NGOs can easily find and claim food donations to support their beneficiaries.
            Every transaction helps reduce food waste, supports local businesses, and feeds someone in need.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-text-primary mb-3">Join Us</h2>
          <p className="text-text-secondary leading-relaxed">
            Whether you're a consumer looking for affordable meals, a seller wanting to reduce waste and
            recover costs, or an NGO seeking donations, SharEat welcomes you. Together, let's end food waste,
            feed Kenya, and share love.
          </p>
        </section>
      </div>
    </div>
  );
}