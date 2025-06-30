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
import { useAppDispatch, useAppSelector, type RootState } from "../../store";
import { logoutUser } from "../../slices/authSlice";

/**
 * Main sidebar container with fixed width and full height
 */
const SidebarContainer = styled.div<{ theme: string }>`
  width: 80px;
  height: 100vh;
  background-color: ${({ theme }) =>
    theme === "light" ? "#f5f5f5" : "#161618"};
  padding: 25px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.3s ease, color 0.3s ease;
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
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
const IconContainer = styled.div<{ $isActive: boolean; theme: string }>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  ${({ $isActive, theme }) =>
    $isActive &&
    css`
      border: 1px solid ${theme === "light" ? "#c0c0c0" : "#525252"};
      background-color: ${theme === "light" ? "#e0e0e0" : "#1a1a1a"};
    `}
`;

/**
 * Profile popup with arrow pointing to profile icon
 * Positioned above the profile icon with user information and logout
 */
const ProfilePopup = styled.div<{ theme: string }>`
  position: absolute;
  bottom: 60px;
  left: 0;
  background: ${({ theme }) => (theme === "light" ? "#ffffff" : "#222324")};
  border: 1px solid ${({ theme }) => (theme === "light" ? "#c0c0c0" : "#444")};
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
    border-top: 8px solid
      ${({ theme }) => (theme === "light" ? "#ffffff" : "#222324")};
  }
`;

/**
 * Container for user information section in profile popup
 * Separated from action buttons with visual divider
 */
const UserInfoContainer = styled.div<{ theme: string }>`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid
    ${({ theme }) => (theme === "light" ? "#e0e0e0" : "#444")};
`;

/**
 * User email display in profile popup
 * Primary text for user identification
 */
const UserEmail = styled.div<{ theme: string }>`
  font-size: 14px;
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

/**
 * Label text in profile popup
 * Secondary text for context
 */
const UserLabel = styled.div<{ theme: string }>`
  font-size: 12px;
  color: ${({ theme }) => (theme === "light" ? "#666666" : "#aaa")};
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
  const activeTheme = useAppSelector((state: RootState) => state.theme.theme);
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
    <SidebarContainer theme={activeTheme}>
      <SidebarUpperContainer>
        {/* Menu icon */}
        <IconContainer $isActive={false} theme={activeTheme}>
          <MdMenu
            size={26}
            color={activeTheme === "light" ? "#000000" : "#ffffff"}
          />
        </IconContainer>

        {/* Dynamic navigation links */}
        {SIDEBAR_LINKS.map((link) => {
          const IconComponent = link.icon;
          return (
            <IconContainer
              key={link.label}
              onClick={() => handleLinkClick(link.path)}
              $isActive={isActiveLink(link.path)}
              theme={activeTheme}
            >
              <IconComponent
                fill={
                  isActiveLink(link.path)
                    ? activeTheme === "light"
                      ? "#000000"
                      : "#FFFFFF"
                    : activeTheme === "light"
                    ? "#666666"
                    : "#858882"
                }
              />
            </IconContainer>
          );
        })}
      </SidebarUpperContainer>

      {/* Profile section with popup functionality */}
      <ProfileContainer ref={profileRef}>
        <IconContainer
          $isActive={showProfilePopup}
          theme={activeTheme}
          onClick={handleProfileClick}
        >
          <Account />
        </IconContainer>
        {showProfilePopup && (
          <ProfilePopup theme={activeTheme} onClick={handlePopupClick}>
            <UserInfoContainer theme={activeTheme}>
              <UserLabel theme={activeTheme}>Signed in as</UserLabel>
              <UserEmail theme={activeTheme}>{user?.email || "User"}</UserEmail>
            </UserInfoContainer>
            <LogoutButton onClick={handleLogout}>Sign Out</LogoutButton>
          </ProfilePopup>
        )}
      </ProfileContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
