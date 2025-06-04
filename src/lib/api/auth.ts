import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  // PhoneAuthProvider, // Might be needed for some flows or re-authentication
} from 'firebase/auth';
import { auth, db } from './firebase'; // Assuming db is also needed for user profile creation
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

// Ensure you have a reCAPTCHA container in your AuthForm or globally
// For example, a <div id="recaptcha-container"></div>
// This function should be called once when the component mounts
export const initializeRecaptchaVerifier = (containerId: string) => {
  if (!auth || typeof window === 'undefined' || !document.getElementById(containerId)) {
    console.warn("Firebase auth is not initialized or container not found. Skipping reCAPTCHA.");
    return null;
  }

  // Ensure window.recaptchaVerifier is only created once
  if (!(window as any).recaptchaVerifier) {
    console.log("Initializing new reCAPTCHA verifier for container:", containerId);
    (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      'size': 'invisible',
      'callback': (response: any) => {
        console.log("reCAPTCHA solved:", response);
      },
      'expired-callback': () => {
        console.log("reCAPTCHA expired");
        // Attempt to reset reCAPTCHA
        const verifier = (window as any).recaptchaVerifier;
        if (verifier) {
          verifier.render().then((widgetId: any) => {
            if (typeof grecaptcha !== 'undefined' && grecaptcha.reset) {
              grecaptcha.reset(widgetId);
            }
          }).catch((error: any) => console.error("Error rendering/resetting reCAPTCHA:", error));
        }
      }
    });
  }
  return (window as any).recaptchaVerifier;
};


export const signUpWithPhoneNumber = async (phoneNumber: string, appVerifier: RecaptchaVerifier | null): Promise<ConfirmationResult | null> => {
  if (!auth || !appVerifier) {
    console.warn("Firebase auth or appVerifier not initialized. Simulating OTP send failure.");
    throw new Error("Firebase not initialized for OTP.");
  }
  console.log(`Attempting OTP send to: ${phoneNumber}`);
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    console.log("OTP sent, confirmationResult:", confirmationResult);
    (window as any).confirmationResult = confirmationResult;
    return confirmationResult;
  } catch (error) {
    console.error("Error sending OTP:", error);
    appVerifier.render().then((widgetId) => {
        if (typeof grecaptcha !== 'undefined' && grecaptcha.reset) {
            grecaptcha.reset(widgetId);
        }
    }).catch(renderError => console.error("Error resetting reCAPTCHA after send error:", renderError));
    throw error;
  }
};

export const verifyOtpAndSignUp = async (otp: string, userData?: { email?: string; role?: string; displayName?: string }): Promise<UserCredential | null> => {
  console.log(`Attempting OTP verification for: ${otp}`);
  const confirmationResult = (window as any).confirmationResult as ConfirmationResult;

  if (!confirmationResult) {
    console.error("No confirmation result found. Please request OTP first.");
    throw new Error("No confirmation result found. Please request OTP first.");
  }
  if (!db) { // Check if db is null
    console.warn("Firestore (db) not initialized. Skipping profile creation.");
    // Proceed with auth confirmation but skip Firestore part
    try {
        const userCredential = await confirmationResult.confirm(otp);
        console.log("User signed up (auth only):", userCredential.user);
        return userCredential;
    } catch (error) {
        console.error("Error verifying OTP:", error);
        throw error;
    }
  }

  try {
    const userCredential = await confirmationResult.confirm(otp);
    const user = userCredential.user;
    console.log("User signed up successfully:", user);

    if (user && db) { // Ensure db is available
      const userRef = doc(db, "users", user.uid);
      const userProfile = {
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        email: userData?.email || user.email || '',
        role: userData?.role || 'consumer',
        displayName: userData?.displayName || user.displayName || user.phoneNumber,
        createdAt: serverTimestamp(),
      };
      await setDoc(userRef, userProfile);
      console.log("User profile created in Firestore:", userProfile);
    }
    return userCredential;
  } catch (error) {
    console.error("Error verifying OTP or signing up:", error);
    throw error;
  }
};


export const signInUserWithPhoneNumber = async (phoneNumber: string, appVerifier: RecaptchaVerifier | null): Promise<ConfirmationResult | null> => {
  if (!auth || !appVerifier) {
    console.warn("Firebase auth or appVerifier not initialized. Simulating OTP send failure for login.");
    throw new Error("Firebase not initialized for OTP login.");
  }
  console.log(`Attempting OTP send for login to: ${phoneNumber}`);
   try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    (window as any).confirmationResult = confirmationResult;
    return confirmationResult;
  } catch (error) {
    console.error("Error sending OTP for login:", error);
    appVerifier.render().then((widgetId) => {
        if (typeof grecaptcha !== 'undefined' && grecaptcha.reset) {
            grecaptcha.reset(widgetId);
        }
    }).catch(renderError => console.error("Error resetting reCAPTCHA after login send error:", renderError));
    throw error;
  }
};

export const verifyOtpAndSignIn = async (otp: string): Promise<UserCredential | null> => {
  console.log(`Attempting OTP verification for login: ${otp}`);
  const confirmationResult = (window as any).confirmationResult as ConfirmationResult;
  if (!confirmationResult) {
    console.error("No confirmation result found for login. Please request OTP first.");
    throw new Error("No confirmation result found for login. Please request OTP first.");
  }
  try {
    const userCredential = await confirmationResult.confirm(otp);
    console.log("User signed in successfully:", userCredential.user);
    return userCredential;
  } catch (error) {
    console.error("Error verifying OTP for login:", error);
    throw error;
  }
};


const googleProvider = new GoogleAuthProvider();
// Corrected signInWithGoogle function
export const signInWithGoogle = async (role: string = 'consumer'): Promise<UserCredential | null> => {
  if (!auth) {
    console.warn("Firebase auth not initialized. Google Sign-in unavailable.");
    throw new Error("Firebase not initialized for Google Sign-in.");
  }
  console.log(`Attempting Sign in with Google for role: ${role}`);
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("Signed in with Google successfully:", user);

    if (user && db) { // Ensure db is available
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        const userProfile = {
          uid: user.uid,
          phoneNumber: user.phoneNumber || '',
          email: user.email || '',
          role: role, // Use the passed role
          displayName: user.displayName || user.email,
          photoURL: user.photoURL || '',
          createdAt: serverTimestamp(),
        };
        await setDoc(userRef, userProfile);
        console.log(`New Google user profile created in Firestore with role '${role}':`, userProfile);
      } else {
        // Optionally, you could update the role if the user signs in via a different role context later.
        // For now, just log that an existing profile was found.
        console.log("Existing Google user profile found:", docSnap.data());
      }
    } else if (user && !db) {
        console.warn("Firestore (db) not initialized. Skipping profile creation/check for Google user.");
    }
    return result;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const signOutUser = async (): Promise<void> => {
  if (!auth) {
    console.warn("Firebase auth not initialized. Sign out unavailable.");
    return; // Or throw new Error("Firebase not initialized for Sign out.");
  }
  console.log("Attempting Sign out");
  try {
    await firebaseSignOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Helper to get current user (can be used in AuthContext)
export const getCurrentUser = () => {
  if (!auth) { // If Firebase is "disabled" (auth is null from firebase.ts)
    return null;
  }
  // This part would execute if auth was a proper Firebase Auth instance
  return auth.currentUser;
};

// Add a global declaration for grecaptcha if not already present
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
  }
  const grecaptcha: any; // Adjust 'any' if you have specific grecaptcha types
}