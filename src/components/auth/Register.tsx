/**
 * @fileoverview User registration component with email/password and Google OAuth
 *
 * This component provides a complete registration interface with form validation,
 * password confirmation, error handling, and multiple authentication methods.
 *
 * @author Mahith Reddy
 * @version 1.0.0
 */

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  registerUser,
  loginWithGoogle,
  clearError,
} from "../../slices/authSlice";
import {
  LoginContainer,
  LoginForm,
  Title,
  InputGroup,
  Label,
  Input,
  ErrorMessage,
  PrimaryButton,
  SignInButton,
  LinkText,
  ColumnFlex,
} from "./styles";

/**
 * Props interface for Register component
 */
interface IRegisterProps {
  /** Function to toggle between registration and login modes */
  onToggleMode: () => void;
}

/**
 * Register Component
 *
 * Provides user registration interface with multiple signup methods.
 * Includes form validation, password confirmation, and Google OAuth integration.
 *
 * Features:
 * - Email/password registration
 * - Password confirmation validation
 * - Google OAuth integration
 * - Form validation and error handling
 * - Loading states during registration
 * - Toggle to login form
 * - Accessible form design
 *
 * @param onToggleMode - Function to toggle between registration and login modes
 * @returns Registration form interface
 *
 * @example
 * ```tsx
 * <Register onToggleMode={() => setIsLoginMode(true)} />
 * ```
 */
export const Register: React.FC<IRegisterProps> = ({ onToggleMode }) => {
  // Local form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Redux hooks for state management
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  /**
   * Handles form submission for user registration
   * Validates password confirmation and dispatches registration action
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password confirmation
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (email && password) {
      dispatch(registerUser({ email, password }));
    }
  };

  /**
   * Handles Google OAuth registration
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
        <Title>Sign Up</Title>

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

        {/* Password confirmation field */}
        <InputGroup>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
            minLength={6}
          />
        </InputGroup>

        {/* Registration buttons */}
        <ColumnFlex>
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </PrimaryButton>

          <SignInButton
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            Sign Up with Google
          </SignInButton>
        </ColumnFlex>

        {/* Toggle to login form */}
        <LinkText>
          Already have an account?{"  "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onToggleMode();
            }}
          >
            Sign In
          </a>
        </LinkText>
      </LoginForm>
    </LoginContainer>
  );
};
