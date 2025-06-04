'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithGoogle } from '@/lib/api/auth'; // Using our centralized auth function
import { useAuth } from '@/context/AuthContext';

// Placeholder Icon
const GoogleIcon = () => <span className="text-xl">🇬</span>;

export default function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentUser, loading: authLoading } = useAuth();

  const roleFromQuery = searchParams.get('role') || 'consumer'; // Default role if not specified

  useEffect(() => {
    if (!authLoading && currentUser) {
      // If user is already logged in, redirect them based on role
      // This prevents showing the auth form if already authenticated.
      console.log("User already logged in, redirecting from AuthForm...");
      const redirectPath = roleFromQuery === 'seller' ? '/seller' : roleFromQuery === 'ngo' ? '/ngo' : '/consumer';
      router.push(redirectPath);
    }
  }, [currentUser, authLoading, router, roleFromQuery]);


  const handleGoogleSignInInternal = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Pass the role to signInWithGoogle if your backend function needs it
      // For now, signInWithGoogle in auth.ts defaults to 'consumer' if creating a new profile
      const userCredential = await signInWithGoogle(roleFromQuery); 
      console.log('Google Sign-in successful via AuthForm:', userCredential?.user);
      // AuthContext will handle the user state update via onAuthStateChanged.
      // Redirection will happen based on the useEffect hook above, or you can force it here.
      // router.push(roleFromQuery === 'seller' ? '/seller' : roleFromQuery === 'ngo' ? '/ngo' : '/consumer');
    } catch (err: any) {
      setError(err.message || 'Google Sign-in failed. Please try again.');
      console.error("Google Sign-in Error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // If still loading auth state, or if user is already logged in (and redirect is pending), show minimal UI or loader
  if (authLoading || (!authLoading && currentUser)) {
    return (
      <div className="w-full max-w-md p-8 space-y-6 bg-surface shadow-xl rounded-lg text-center">
        <p className="text-text-secondary">Loading authentication state...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-surface shadow-xl rounded-lg">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary font-display">Welcome to SharEat</h1>
        <p className="text-text-secondary mt-2">
          Sign in or create an account with Google to continue as a <span className="font-semibold">{roleFromQuery}</span>.
        </p>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-md">
          {error}
        </div>
      )}

      <div>
        <Button 
          variant="outline" 
          className="w-full text-base py-3" 
          onClick={handleGoogleSignInInternal} 
          disabled={isLoading}
        >
          <GoogleIcon /> <span className="ml-2">{isLoading ? 'Signing in...' : 'Continue with Google'}</span>
        </Button>
      </div>
      {/* Removed phone number and OTP sections */}
    </div>
  );
}