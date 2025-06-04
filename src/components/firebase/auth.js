// firebaseMethods.js
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    sendPasswordResetEmail,
    updatePassword,
    sendEmailVerification
  } from 'firebase/auth';
  
  import { auth } from '../../firebase'; // Make sure `auth` is exported from your firebase config
  
  // Create account with email and password
  export const doCreateUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  
  // Sign in with email and password
  export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  
  // Sign in with Google
  export const doSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  
  // Sign out
  export const doSignOut = () => {
    return signOut(auth);
  };
  
  // Reset password
  export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  
  // Update password (current user must be reauthenticated if recently logged in)
  export const doPasswordUpdate = (password) => {
    return updatePassword(auth.currentUser, password);
  };
  
  // Send email verification
  export const doSendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
      url: 'http://localhost:3000/signin',
    });
  };
  