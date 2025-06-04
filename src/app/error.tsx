'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button'; // Assuming you have a Button component

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6 text-center">
      <h1 className="text-4xl font-bold text-destructive mb-4">Something went wrong!</h1>
      <p className="text-lg text-text-secondary mb-8">
        {error.message || "An unexpected error occurred."}
      </p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        variant="primary"
        size="lg"
      >
        Try again
      </Button>
    </div>
  );
}