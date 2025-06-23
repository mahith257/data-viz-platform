/**
 * @fileoverview Authentication page container component
 *
 * This component manages the authentication flow by toggling between
 * login and registration forms. Provides a seamless user experience
 * for authentication without navigation.
 *
 * @author Mahith Reddy
 * @version 1.0.0
 */

import React, { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

/**
 * Authentication Page Component
 *
 * Container component that manages the authentication user interface.
 * Toggles between login and registration forms without page navigation.
 *
 * Features:
 * - Seamless toggle between login/register
 * - Consistent authentication experience
 * - No page reloads or navigation
 * - State management for current mode
 *
 * @returns Authentication interface
 *
 * @example
 * ```tsx
 * // Used in protected route when user is not authenticated
 * <AuthPage />
 * ```
 */
export const AuthPage: React.FC = () => {
  // State to track whether showing login or register form
  const [isLoginMode, setIsLoginMode] = useState(true);

  /**
   * Toggles between login and registration modes
   * Called by child components when user wants to switch forms
   */
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <>
      {/* Conditional rendering based on current authentication mode */}
      {isLoginMode ? (
        <Login onToggleMode={toggleMode} />
      ) : (
        <Register onToggleMode={toggleMode} />
      )}
    </>
  );
};
