/**
 * @fileoverview Redux store configuration with RTK
 *
 * This module sets up the Redux store using Redux Toolkit (RTK), configures
 * the root reducer, and exports typed hooks for use throughout the application.
 *
 * Store Structure:
 * - auth: User authentication state and async thunks
 * - home: Application navigation and UI state
 *
 * @author Mahith Reddy
 * @version 1.0.0
 */

import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./slices/homeSlice";
import authSlice from "./slices/authSlice";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import themeSlice from "./slices/themeSlice";

/**
 * Main Redux store configuration
 *
 * Combines all slice reducers and enables Redux DevTools in development.
 * Uses RTK's configureStore which includes useful middleware by default.
 */
const store = configureStore({
  reducer: {
    home: homeSlice,
    auth: authSlice,
    theme: themeSlice,
  },
});

/**
 * Root state type derived from store reducer
 * Used for type-safe state access throughout the application
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * App dispatch type for async thunks and actions
 * Ensures type safety when dispatching actions
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Typed dispatch hook for components
 * Use this instead of useDispatch for full type safety
 *
 * @example
 * ```typescript
 * const dispatch = useAppDispatch();
 * dispatch(loginUser({ email, password }));
 * ```
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed selector hook for components
 * Use this instead of useSelector for full type safety
 *
 * @example
 * ```typescript
 * const user = useAppSelector(state => state.auth.user);
 * const activeTab = useAppSelector(state => state.home.activeTab);
 * ```
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
