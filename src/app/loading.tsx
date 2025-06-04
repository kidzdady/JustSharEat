import { LoadingSpinner } from '@/components/ui/LoadingSpinner'; // Assuming this component exists

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex items-center justify-center min-h-screen fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-lg text-text-primary font-medium">Loading SharEat...</p>
      </div>
    </div>
  );
}