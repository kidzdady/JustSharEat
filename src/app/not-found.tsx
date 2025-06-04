import Link from 'next/link';
import { Button } from '@/components/ui/Button'; // Assuming you have a Button component

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-text-primary mb-6">Page Not Found</h2>
      <p className="text-lg text-text-secondary mb-8 max-w-md">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Button asChild variant="primary" size="lg">
        <Link href="/">Go back to Home</Link>
      </Button>
    </div>
  );
}