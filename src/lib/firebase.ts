import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Check if all required environment variables are set
const firebaseConfigValues = Object.values(firebaseConfig);
const areConfigValuesDefined = firebaseConfigValues.every(value => value);

// Initialize Firebase only if the config is fully set
const app = areConfigValuesDefined && !getApps().length ? initializeApp(firebaseConfig) :
 (getApps().length > 0 ? getApp() : null);
export const auth = app ? getAuth(app) : null;

export function isFirebaseConfigured() {
    return areConfigValuesDefined;
}