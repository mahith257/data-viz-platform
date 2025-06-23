/**
 * @fileoverview User login component with email/password and Google OAuth
 *
 * This component provides a complete login interface with multiple authentication
 * methods, form validation, error handling, and loading states.
 *
 * @author Mahith Reddy
 * @version 1.0.0
 */

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { loginUser, loginWithGoogle, clearError } from "../../slices/authSlice";
import {
  LoginContainer,
  LoginForm,
  Title,
  InputGroup,
  Label,
  Input,
  ErrorMessage,
  ColumnFlex,
  SignInButton,
  PrimaryButton,
  LinkText,
} from "./styles";

/**
 * Props interface for Login component
 */
interface ILoginProps {
  /** Function to toggle between login and registration modes */
  onToggleMode: () => void;
}

/**
 * Login Component
 *
 * Provides user authentication interface with multiple login methods.
 * Supports both email/password login and Google OAuth authentication.
 *
 * Features:
 * - Email/password authentication
 * - Google OAuth integration
 * - Form validation and error handling
 * - Loading states during authentication
 * - Toggle to registration form
 * - Accessible form design
 *
 * @param onToggleMode - Function to toggle between login and registration modes
 * @returns Login form interface
 *
 * @example
 * ```tsx
 * <Login onToggleMode={() => setIsLoginMode(false)} />
 * ```
 */
export const Login: React.FC<ILoginProps> = ({ onToggleMode }) => {
  // Local form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redux hooks for state management
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  /**
   * Handles form submission for email/password login
   * Validates form data and dispatches login action
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      dispatch(loginUser({ email, password }));
    }
  };

  /**
   * Handles Google OAuth login
   * Dispatches Google login action which opens OAuth popup
   */
  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };

  /**
   * Clears authentication error messages
   * Called when user clicks on error message
   */
  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Sign In</Title>

        {/* Error message display - clickable to dismiss */}
        {error && (
          <ErrorMessage onClick={handleClearError}>{error}</ErrorMessage>
        )}

        {/* Email input field */}
        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </InputGroup>

        {/* Password input field */}
        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            minLength={6}
          />
        </InputGroup>

        {/* Authentication buttons */}
        <ColumnFlex>
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </PrimaryButton>

          <SignInButton
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            Sign In with Google
          </SignInButton>
        </ColumnFlex>

        {/* Toggle to registration form */}
        <LinkText>
          Don't have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onToggleMode();
            }}
          >
            Sign Up
          </a>
        </LinkText>
      </LoginForm>
    </LoginContainer>
  );
};
