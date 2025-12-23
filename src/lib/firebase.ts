import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// This function initializes and returns the Firebase app instance.
function initializeFirebase(): FirebaseApp {
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  } else {
    return getApp();
  }
}

// Singleton instances for Auth and Firestore
let auth: Auth;
let db: Firestore;

// Getter for the Auth service
export function getAuthInstance(): Auth {
  if (!auth) {
    auth = getAuth(initializeFirebase());
  }
  return auth;
}

// Renamed getAuth to getAuthInstance to avoid conflict and be more descriptive
export { getAuthInstance as getAuth };

// Getter for the Firestore service
export function getDb(): Firestore {
  if (!db) {
    db = getFirestore(initializeFirebase());
  }
  return db;
}

export function getAppInstance(): FirebaseApp {
    return initializeFirebase();
}
