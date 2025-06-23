/**
 * @fileoverview Authentication Redux slice with Firebase integration
 *
 * This module manages user authentication state using Redux Toolkit and Firebase Auth.
 * Includes async thunks for login, registration, Google OAuth, and logout operations.
 *
 * State Structure:
 * - user: Current authenticated user or null
 * - loading: Loading state for async operations
 * - error: Error messages from failed operations
 * - isInitialized: Flag indicating auth state has been determined
 *
 * @author Mahith Reddy
 * @version 1.0.0
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/config";
import type { AuthState, SerializableUser } from "../types/auth";
import { serializeUser } from "../utils/authUtils";

/**
 * Initial authentication state
 * All users start as unauthenticated with no loading or error states
 */
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isInitialized: false,
};

/**
 * Async thunk for email/password login
 *
 * Authenticates user using Firebase email/password authentication.
 * Returns the authenticated user on success or error message on failure.
 *
 * @param credentials - User email and password
 * @returns Promise<User> - Firebase user object
 *
 * @example
 * ```typescript
 * dispatch(loginUser({ email: 'user@example.com', password: 'password123' }));
 * ```
 */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

/**
 * Async thunk for user registration
 *
 * Creates a new user account using Firebase email/password authentication.
 * Automatically signs in the user after successful registration.
 *
 * @param credentials - User email and password for new account
 * @returns Promise<User> - Firebase user object
 *
 * @example
 * ```typescript
 * dispatch(registerUser({ email: 'newuser@example.com', password: 'password123' }));
 * ```
 */
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

/**
 * Async thunk for Google OAuth login
 *
 * Authenticates user using Google OAuth popup flow.
 * Provides seamless login experience with existing Google accounts.
 *
 * @returns Promise<User> - Firebase user object with Google profile data
 *
 * @example
 * ```typescript
 * dispatch(loginWithGoogle());
 * ```
 */
export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

/**
 * Async thunk for user logout
 *
 * Signs out the current user and clears authentication state.
 * Handles Firebase sign out and resets user data in Redux store.
 *
 * @returns Promise<null> - Returns null on successful logout
 *
 * @example
 * ```typescript
 * dispatch(logoutUser());
 * ```
 */
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return null;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

/**
 * Authentication slice definition
 *
 * Manages authentication state with synchronous reducers and async thunk handling.
 * Provides actions for setting user data, clearing errors, and managing loading states.
 *
 * Reducers:
 * - setUser: Sets authenticated user data (used by auth listener)
 * - clearError: Clears authentication error messages
 * - setLoading: Manually controls loading state
 *
 * Extra Reducers: Handle async thunk lifecycle (pending/fulfilled/rejected)
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Sets the authenticated user data
     * Used primarily by the auth listener to sync Firebase auth state
     */
    setUser: (state, action: PayloadAction<SerializableUser | null>) => {
      state.user = action.payload;
      state.isInitialized = true;
      state.loading = false;
    },
    /**
     * Clears any authentication error messages
     * Useful for dismissing errors after user acknowledgment
     */
    clearError: (state) => {
      state.error = null;
    },
    /**
     * Manually sets the loading state
     * Used for operations that need custom loading control
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  /**
   * Extra reducers for handling async thunk lifecycle
   *
   * Manages loading states and user data for all authentication operations.
   * Each thunk has pending, fulfilled, and rejected states handled consistently.
   */
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = serializeUser(action.payload);
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = serializeUser(action.payload);
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = serializeUser(action.payload);
        state.error = null;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;
