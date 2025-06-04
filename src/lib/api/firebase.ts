import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import { getAnalytics, isSupported } from "firebase/analytics"; // Optional: if you use Analytics

const firebaseConfig = {
  apiKey: "AIzaSyDruJfAVcdq_j4-Zh-9Zus9ldXBnmRFyV8",
  authDomain: "shareat-eb06d.firebaseapp.com",
  projectId: "shareat-eb06d",
  storageBucket: "shareat-eb06d.firebasestorage.app",
  messagingSenderId: "779510095921",
  appId: "1:779510095921:web:98d60879ac06fae0a6b510",
  measurementId: "G-7M7QVX0ZG2"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
// const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null); // Optional

export { app, auth, db, storage /*, analytics */ };