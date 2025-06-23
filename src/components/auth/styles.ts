/**
 * @fileoverview Authentication component styled-components
 *
 * This module contains all styled components used in authentication forms.
 * Provides consistent styling for login and registration interfaces with
 * dark theme design and accessible form elements.
 *
 * @author Mahith Reddy
 * @version 1.0.0
 */

import styled from "styled-components";
import { Button } from "../../styles/shared";

/**
 * Main container for authentication pages
 * Centers the authentication form on the page with full viewport height
 */
export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
`;

/**
 * Authentication form container with dark theme styling
 * Provides card-like appearance with shadow and border
 */
export const LoginForm = styled.form`
  background: #222324;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  border: 1px solid #525252;
`;

/**
 * Form title with centered alignment
 * Used for "Sign In" and "Sign Up" headings
 */
export const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

/**
 * Container for individual form input groups
 * Provides consistent spacing between form fields
 */
export const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

/**
 * Form field labels with consistent styling
 * Provides accessibility and visual structure
 */
export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 16px;
  font-weight: 500;
`;

/**
 * Form input fields with dark theme styling
 * Includes focus states and consistent appearance
 */
export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 0.67px solid #5a5a5a;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #0e0d0d;
  color: #ffffff;

  &:focus {
    outline: none;
  }
`;

/**
 * Flexible column container for button groups
 * Provides consistent spacing between stacked buttons
 */
export const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

/**
 * Base button styling for authentication actions
 * Extends shared Button component with auth-specific styles
 */
export const SignInButton = styled(Button)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

/**
 * Primary action button with accent green styling
 * Used for main authentication actions (Sign In/Sign Up)
 */
export const PrimaryButton = styled(SignInButton)`
  background-color: #23291e;
  border: 0.67px solid #577113;
  color: #c9ff3b;
  box-shadow: 0px 0px 12.7px 0px #ffffff0d inset;
  font-size: 16px;
  padding: 10px 20px;
`;

/**
 * Error message display with warning styling
 * Clickable to dismiss, with light background for visibility
 */
export const ErrorMessage = styled.div`
  color: #dc3545;
  text-align: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
`;

/**
 * Link text for toggling between login and registration
 * Provides navigation between authentication modes
 */
export const LinkText = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: #525252;
  font-size: 14px;
`;
