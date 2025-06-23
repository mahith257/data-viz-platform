/**
 * @fileoverview Protected route component for authentication
 *
 * This component provides route-level authentication protection.
 * Redirects unauthenticated users to login and shows loading states
 * during authentication initialization.
 *
 * @author Mahith Reddy
 * @version 1.0.0
 */

import React from "react";
import { useAppSelector } from "../../store";
import { AuthPage } from "./AuthPage";
import styled from "styled-components";

/**
 * Loading indicator container for authentication initialization
 * Displays centered loading message while Firebase auth state is being determined
 */
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.2rem;
  color: #666;
`;

/**
 * Props interface for ProtectedRoute component
 */
interface ProtectedRouteProps {
  /** Child components to render when user is authenticated */
  children: React.ReactNode;
}

/**
 * Protected Route Component
 *
 * Higher-order component that provides authentication protection for routes.
 * Handles three authentication states: loading, unauthenticated, and authenticated.
 *
 * Authentication Flow:
 * 1. Loading: Shows loading indicator while Firebase initializes
 * 2. Unauthenticated: Redirects to authentication page
 * 3. Authenticated: Renders protected content
 *
 * Features:
 * - Automatic authentication state management
 * - Loading state handling
 * - Seamless redirect to auth page
 * - Redux integration for auth state
 *
 * @param children - Child components to render when user is authenticated
 * @returns Protected content or auth interface
 *
 * @example
 * ```tsx
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 * ```
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Get authentication state from Redux store
  const { user, isInitialized } = useAppSelector((state) => state.auth);

  // Show loading indicator while Firebase auth is initializing
  if (!isInitialized) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  // Redirect to authentication page if user is not logged in
  if (!user) {
    return <AuthPage />;
  }

  // Render protected content for authenticated users
  return <>{children}</>;
};
