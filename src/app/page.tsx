import Link from 'next/link';
import { Button } from '@/components/ui/Button'; // Assuming Button is in src/components/ui

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6 text-center">
      {/* Placeholder for Logo */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-primary font-display">SharEat</h1>
        {/* Later, replace with: <Image src="/logo.svg" alt="SharEat Logo" width={150} height={50} /> */}
      </div>

      <h2 className="text-3xl font-semibold text-text-primary mb-4 font-display">
        A meal saved is a life saved.
      </h2>
      <p className="text-lg text-text-secondary mb-12 max-w-xl">
        Buy or donate surplus meals from restaurants, events, and homes across Kenya. End food waste, feed Kenya, share love.
      </p>

      <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
        <Button asChild size="lg" variant="primary" className="w-full sm:w-auto">
          <Link href="/select-role">Get Started</Link>
        </Button>
        <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
          {/* Assuming /auth is the login/signup page */}
          <Link href="/auth">Log In</Link>
        </Button>
      </div>

      {/* Placeholder for Language Toggle - to be implemented later */}
      <div className="absolute top-6 right-6">
        <span className="text-sm text-text-secondary">(Language Toggle)</span>
      </div>

      {/* Optional: Low-bandwidth background image/video placeholder */}
      {/* <div className="absolute inset-0 -z-10">
        <Image src="/images/hero-bg.jpg" alt="Background" layout="fill" objectFit="cover" quality={75} />
      </div> */}
    </div>
  );
}