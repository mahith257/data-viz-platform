/**
 * @fileoverview Authentication utility functions
 *
 * This module provides utility functions for handling Firebase authentication,
 * specifically for converting Firebase user objects to serializable format
 * for Redux store compatibility.
 *
 * @author Mahith Reddy
 * @version 1.0.0
 */

import type { User } from "firebase/auth";
import type { SerializableUser } from "../types/auth";

/**
 * Converts Firebase User object to serializable format
 *
 * Firebase User objects contain methods and non-serializable properties
 * that cannot be stored in Redux. This function extracts only the
 * necessary serializable properties for state management.
 *
 * @param {User | null} user - Firebase User object or null
 * @returns {SerializableUser | null} Serializable user object or null
 *
 * @example
 * ```typescript
 * import { onAuthStateChanged } from 'firebase/auth';
 * import { serializeUser } from './authUtils';
 *
 * onAuthStateChanged(auth, (firebaseUser) => {
 *   const serializedUser = serializeUser(firebaseUser);
 *   dispatch(setUser(serializedUser));
 * });
 * ```
 */
export const serializeUser = (user: User | null): SerializableUser | null => {
  if (!user) return null;

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
  };
};
