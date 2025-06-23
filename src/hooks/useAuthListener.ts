/**
 * @fileoverview Firebase authentication state listener hook
 *
 * Custom React hook that sets up Firebase auth state synchronization
 * with Redux store. Ensures app state stays in sync with Firebase
 * authentication status changes.
 *
 * @author Mahith Reddy
 * @version 1.0.0
 */

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAppDispatch } from "../store";
import { setUser } from "../slices/authSlice";
import { serializeUser } from "../utils/authUtils";

/**
 * Firebase authentication state listener hook
 *
 * Sets up a listener that automatically syncs Firebase authentication
 * state changes with the Redux store. This ensures the app immediately
 * responds to login, logout, and token refresh events.
 *
 * Features:
 * - Automatic state synchronization
 * - Proper cleanup on component unmount
 * - Serializes Firebase user for Redux compatibility
 * - Handles all auth state changes (login/logout/refresh)
 *
 * @example
 * ```typescript
 * function App() {
 *   useAuthListener(); // Initialize auth synchronization
 *
 *   return <Router>...</Router>;
 * }
 * ```
 *
 * @hook
 */
export const useAuthListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    /**
     * Set up Firebase auth state change listener
     *
     * This listener fires whenever the user's authentication state changes:
     * - User logs in
     * - User logs out
     * - Auth token refreshes
     * - Page reload (restores auth state)
     */
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Convert Firebase user to serializable format and update Redux store
      dispatch(setUser(serializeUser(user)));
    });

    // Cleanup function: unsubscribe from listener when component unmounts
    return () => unsubscribe();
  }, [dispatch]);
};
