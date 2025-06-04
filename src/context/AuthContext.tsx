'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/api/firebase';
import { doc, getDoc, DocumentData } from 'firebase/firestore';

// Define a more specific User type for your application if needed
export interface AppUser extends FirebaseUser {
  // Add custom properties from your Firestore user profile
  role?: string;
  // Example: displayName from Firestore might be preferred over FirebaseUser's
  displayName: string | null; // Ensure compatibility with FirebaseUser
  // Add other custom fields like 'address', 'preferences', etc.
}

interface AuthContextType {
  currentUser: AppUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
  // --- Temporary for UI simulation ---
  simulateLogin: (mockUser: AppUser) => void;
  simulateLogout: () => void;
  // --- End Temporary ---
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) { // If Firebase is "disabled"
      console.warn("Firebase auth is not initialized. AuthContext will not listen for auth changes.");
      setCurrentUser(null);
      setLoading(false);
      return () => {}; // Return an empty cleanup function
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, now fetch their profile from Firestore
        // Ensure db is also not null before trying to use it
        if (!db) {
          console.warn("Firestore (db) not initialized. Cannot fetch user profile.");
          setCurrentUser(firebaseUser as AppUser); // Use Firebase user data as fallback
          setLoading(false);
          return;
        }
        
        const userRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const firestoreUser = docSnap.data() as DocumentData;
          setCurrentUser({
            ...firebaseUser,
            ...firestoreUser,
            displayName: firestoreUser.displayName || firebaseUser.displayName || null,
            role: firestoreUser.role || 'consumer',
          } as AppUser);
        } else {
          console.warn("User profile not found in Firestore for UID:", firebaseUser.uid);
          setCurrentUser(firebaseUser as AppUser);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []); // Removed 'auth' and 'db' from dependency array as they are module-level singletons or null

  // --- Temporary for UI simulation ---
  const simulateLogin = (mockUser: AppUser) => {
    console.log("Simulating login with user:", mockUser);
    setCurrentUser(mockUser);
    setLoading(false); // Ensure loading is false
  };

  const simulateLogout = () => {
    console.log("Simulating logout");
    setCurrentUser(null);
  };
  // --- End Temporary ---

  const signOut = async () => {
    if (!auth) {
      console.warn("Firebase auth is not initialized. Cannot sign out.");
      return;
    }
    await auth.signOut();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    signOut,
    simulateLogin, // Temporary
    simulateLogout, // Temporary
  };

  return (
    <AuthContext.Provider 
      value={{
        currentUser,
        loading,
        signOut,
        // --- Temporary ---
        simulateLogin: (mockUser) => setCurrentUser(mockUser),
        simulateLogout: () => setCurrentUser(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};