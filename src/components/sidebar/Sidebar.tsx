/**
 * @fileoverview Application sidebar with navigation and user profile
 *
 * This component provides a compact sidebar navigation with icon-based links,
 * active state management, and user profile functionality with logout capability.
 *
 * @author Mahith Reddy
 * @version 1.0.0
 */

import styled, { css } from "styled-components";
import { useState, useEffect, useRef } from "react";
import { MdMenu } from "react-icons/md";
import Account from "../../assets/icons/Account";
import SIDEBAR_LINKS from "./constants";
import { useLocation, useNavigate, matchPath } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store";
import { logoutUser } from "../../slices/authSlice";

/**
 * Main sidebar container with fixed width and full height
 */
const SidebarContainer = styled.div`
  width: 80px;
  height: 100vh;
  background-color: #0e0d0d;
  padding: 25px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

/**
 * Upper section container for navigation links
 * Organized vertically with consistent spacing
 */
const SidebarUpperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

/**
 * Individual icon container with active state styling
 * Provides visual feedback for navigation state
 */
const IconContainer = styled.div<{ $isActive: boolean }>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  ${({ $isActive }) =>
    $isActive &&
    css`
      border: 1px solid #525252;
      background-color: #1a1a1a;
    `}
`;

/**
 * Profile popup with arrow pointing to profile icon
 * Positioned above the profile icon with user information and logout
 */
const ProfilePopup = styled.div`
  position: absolute;
  bottom: 60px;
  left: 0;
  background: #222324;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 1rem;
  min-width: 200px;
  z-index: 1000;

  &::before {
    content: "";
    position: absolute;
    left: 20px;
    bottom: -8px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid #222324;
  }
`;

/**
 * Container for user information section in profile popup
 * Separated from action buttons with visual divider
 */
const UserInfoContainer = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #444;
`;

/**
 * User email display in profile popup
 * Primary text for user identification
 */
const UserEmail = styled.div`
  font-size: 14px;
  color: #ffffff;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

/**
 * Label text in profile popup
 * Secondary text for context
 */
const UserLabel = styled.div`
  font-size: 12px;
  color: #aaa;
`;

/**
 * Logout button with hover effects
 * Styled with danger colors to indicate action severity
 */
const LogoutButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background-color: #c82333;
  }
`;

/**
 * Container for profile section with relative positioning
 * Enables absolute positioning of popup relative to profile icon
 */
const ProfileContainer = styled.div`
  position: relative;
`;

/**
 * Sidebar Component
 *
 * Provides a compact navigation sidebar with icon-based links and user profile
 * functionality. Features include active state management, route navigation,
 * and user authentication controls.
 *
 * Features:
 * - Icon-based navigation with active state indicators
 * - User profile popup with email display and logout
 * - Click-outside-to-close functionality
 * - Responsive design integration
 * - Route-based active state management
 *
 * @returns Sidebar navigation component
 *
 * @example
 * ```tsx
 * // Used in Layout component for consistent navigation
 * <Sidebar />
 * ```
 */
const Sidebar = () => {
  // Navigation and routing hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Redux state management
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  // Local component state
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  /**
   * Determines if a navigation link is currently active
   * Uses React Router's matchPath for accurate route matching
   */
  const isActiveLink = (linkPath: string) => {
    return !!matchPath(linkPath, location.pathname);
  };

  /**
   * Handles navigation link clicks
   * Uses React Router's navigate for programmatic navigation
   */
  const handleLinkClick = (path: string) => {
    navigate(path);
  };

  /**
   * Toggles profile popup visibility
   * Called when user clicks on profile icon
   */
  const handleProfileClick = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  /**
   * Handles user logout action
   * Dispatches logout Redux action and closes popup
   */
  const handleLogout = () => {
    dispatch(logoutUser());
    setShowProfilePopup(false);
  };

  /**
   * Prevents popup from closing when clicking inside it
   * Stops event propagation to parent elements
   */
  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  /**
   * Effect to handle click-outside behavior for profile popup
   * Closes popup when user clicks outside the profile area
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfilePopup(false);
      }
    };

    // Add event listener when popup is open
    if (showProfilePopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on unmount or when popup closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfilePopup]);

  return (
    <SidebarContainer>
      <SidebarUpperContainer>
        {/* Menu icon */}
        <IconContainer $isActive={false}>
          <MdMenu size={26} color="#FFFFFF" />
        </IconContainer>

        {/* Dynamic navigation links */}
        {SIDEBAR_LINKS.map((link) => {
          const IconComponent = link.icon;
          return (
            <IconContainer
              key={link.label}
              onClick={() => handleLinkClick(link.path)}
              $isActive={isActiveLink(link.path)}
            >
              <IconComponent
                fill={isActiveLink(link.path) ? "#FFFFFF" : "#858882"}
              />
            </IconContainer>
          );
        })}
      </SidebarUpperContainer>

      {/* Profile section with popup functionality */}
      <ProfileContainer ref={profileRef}>
        <IconContainer
          $isActive={showProfilePopup}
          onClick={handleProfileClick}
        >
          <Account />
        </IconContainer>
        {showProfilePopup && (
          <ProfilePopup onClick={handlePopupClick}>
            <UserInfoContainer>
              <UserLabel>Signed in as</UserLabel>
              <UserEmail>{user?.email || "User"}</UserEmail>
            </UserInfoContainer>
            <LogoutButton onClick={handleLogout}>Sign Out</LogoutButton>
          </ProfilePopup>
        )}
      </ProfileContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
