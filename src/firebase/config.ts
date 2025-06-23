/**
 * @fileoverview Firebase configuration and initialization
 *
 * This module initializes Firebase app with environment-based configuration
 * and exports authentication service for use throughout the application.
 *
 * Security Notes:
 * - All config values are safe to expose in client-side code
 * - Firebase automatically secures API calls with domain restrictions
 * - Environment variables used for deployment flexibility
 *
 * @author Mahith Reddy
 * @version 1.0.0
 */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

/**
 * Firebase project configuration
 *
 * Configuration object using environment variables for flexible deployment.
 * All values are safe for client-side exposure as they're not sensitive secrets.
 *
 * Environment Variables Required:
 * - VITE_FIREBASE_API_KEY: Firebase API key
 * - VITE_FIREBASE_AUTH_DOMAIN: Auth domain for the project
 * - VITE_FIREBASE_PROJECT_ID: Unique project identifier
 * - VITE_FIREBASE_STORAGE_BUCKET: Cloud storage bucket
 * - VITE_FIREBASE_MESSAGING_SENDER_ID: FCM sender ID
 * - VITE_FIREBASE_APP_ID: Firebase app identifier
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/**
 * Firebase app instance
 * Initialized with project configuration and used as base for all services
 */
const app = initializeApp(firebaseConfig);

/**
 * Firebase Authentication service
 *
 * Pre-configured auth instance for the application.
 * Used throughout the app for all authentication operations.
 *
 * @example
 * ```typescript
 * import { auth } from './firebase/config';
 * import { signInWithEmailAndPassword } from 'firebase/auth';
 *
 * const user = await signInWithEmailAndPassword(auth, email, password);
 * ```
 */
export const auth = getAuth(app);
export default app;
