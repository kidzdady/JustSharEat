import { DealClient } from './DealClient';
import type { DealDetails } from './types';

// Simulate fetching deal data
async function getDealDetails(id: string): Promise<DealDetails | null> {
  const sampleDeal: DealDetails = {
    id: '1',
    imageSrc: '/images/food-samples/ugali.jpg',
    sellerName: "Mama's Kitchen",
    sellerRating: 4.9,
    isVerifiedSeller: true,
    itemName: 'Ugali & Sukuma Wiki Special',
    sourceType: 'Restaurant',
    originalPrice: 300,
    discountedPrice: 150,
    quantityDescription: 'Serves 1 generously',
    freshnessDescription: 'Prepared fresh this afternoon, best consumed by 9 PM.',
    pickupTime: '7:00 PM – 9:00 PM',
    countdown: '0h 45m left',
    locationDistance: '0.8 km away',
    mapSnippetSrc: 'https://via.placeholder.com/400x200?text=Map+Snippet',
    arEnabled: true,
    reviews: [
      { user: 'John D.', comment: 'Tasty and fresh!', rating: 5 },
      { user: 'Jane S.', comment: 'Great value for money.', rating: 4 },
    ],
    ingredients: ['Maize Flour', 'Sukuma Wiki', 'Tomatoes', 'Onions', 'Spices'],
    sellerInfo: "Mama's Kitchen has been serving delicious local meals since 2010. We pride ourselves on fresh ingredients and authentic Kenyan flavors.",
  };
  if (id === sampleDeal.id) return sampleDeal;
  return null;
}

// Generate static params for build time
export async function generateStaticParams() {
  // In a real app, you would fetch this from your API or database
  // For now, we'll pre-render the sample deal and a few additional IDs
  const dealIds = ['1', '2', '3', '4', '5'];
  
  return dealIds.map((id) => ({
    id: id,
  }));
}

export default async function DealDetailPage({ params }: { params: { id: string } }) {
  const deal = await getDealDetails(params.id);

  if (!deal) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🍽️</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Deal not found</h2>
          <p className="text-gray-600">This deal might have expired or been removed.</p>
        </div>
      </div>
    );
  }

  return <DealClient deal={deal} />;
}