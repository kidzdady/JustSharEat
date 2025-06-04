import React from 'react';

export default function SafetyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center font-display">Safety & Quality at SharEat</h1>

      <div className="bg-surface p-8 rounded-lg shadow-lg max-w-3xl mx-auto space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-text-primary mb-3">Our Commitment</h2>
          <p className="text-text-secondary leading-relaxed">
            The safety and quality of food shared on our platform are of utmost importance. We strive to create a
            trustworthy environment for both consumers and sellers. While SharEat is a platform connecting users,
            we encourage all participants to adhere to best practices for food handling and safety.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-text-primary mb-3">Guidelines for Sellers</h2>
          <ul className="list-disc list-inside text-text-secondary space-y-2 leading-relaxed">
            <li><strong>Freshness:</strong> Only list food that is still fresh, edible, and safe for consumption.</li>
            <li><strong>Proper Storage:</strong> Ensure food is stored appropriately (refrigerated, frozen, or kept warm) until pickup.</li>
            <li><strong>Accurate Descriptions:</strong> Clearly describe the food items, including ingredients (especially allergens) and "best by" or preparation dates.</li>
            <li><strong>Hygiene:</strong> Maintain high standards of hygiene during food preparation and packaging.</li>
            <li><strong>Transparency:</strong> Be honest about the condition of the food. If it's near its expiry, state it clearly.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-text-primary mb-3">Guidelines for Consumers</h2>
          <ul className="list-disc list-inside text-text-secondary space-y-2 leading-relaxed">
            <li><strong>Inspect Food:</strong> Upon pickup, visually inspect the food. If you have concerns, address them with the seller immediately.</li>
            <li><strong>Proper Handling Post-Pickup:</strong> Once you've collected the food, handle and store it appropriately to maintain its safety.</li>
            <li><strong>Allergies & Dietary Restrictions:</strong> Carefully read descriptions and communicate with sellers if you have allergies or specific dietary needs.</li>
            <li><strong>Use Your Judgment:</strong> If food looks or smells off, do not consume it.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-text-primary mb-3">Community Reporting</h2>
          <p className="text-text-secondary leading-relaxed">
            We rely on our community to help maintain standards. If you encounter any listings or practices that
            raise safety concerns, please report them to us through the app or support channels.
          </p>
        </section>

         <p className="text-sm text-text-tertiary mt-6 text-center">
            Disclaimer: SharEat is a platform facilitating connections. Sellers are responsible for the food they list,
            and consumers are responsible for their choices. Always prioritize safety.
          </p>
      </div>
    </div>
  );
}