import styled, { css } from "styled-components";
import { useAppDispatch, useAppSelector, type RootState } from "../../store";
import { setActiveTab } from "../../slices/homeSlice";
import { EHeaderTabs } from "./types";
import { MdSearch, MdMenu } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { Button, InputContainer, SearchInput } from "../../styles/shared";
import { MEDIA_QUERIES } from "../../styles/breakpoints";
import { setTheme } from "../../slices/themeSlice";

/**
 * Main application header container with responsive design
 * Uses desktop-first approach with standardized breakpoints
 */
const HeaderContainer = styled.div<{ theme: string }>`
  width: 100%;
  height: 87px;
  background-color: ${({ theme }) =>
    theme === "light" ? "#f5f5f5" : "#161618"};
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

/**
 * Left section containing navigation tabs
 * Hidden on mobile/tablet screens
 */
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 21px;

  ${MEDIA_QUERIES.belowDesktop} {
    display: none;
  }
`;

/**
 * Right section containing mobile menu icon
 * Only visible on mobile/tablet screens
 */
const HeaderRight = styled.div`
  display: none;

  ${MEDIA_QUERIES.belowDesktop} {
    order: 2;
    display: flex;
    align-items: center;
    gap: 21px;
  }
`;

const HeaderDesktopRight = styled.div`
  display: flex;
  align-items: center;
  gap: 21px;

  ${MEDIA_QUERIES.belowDesktop} {
    display: none;
  }
`;

/**
 * Hamburger menu icon for mobile navigation
 * Toggles mobile menu visibility
 */
const MenuIcon = styled.div<{ theme: string }>`
  display: none;
  cursor: pointer;
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};

  ${MEDIA_QUERIES.belowDesktop} {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
  }
`;

/**
 * Mobile dropdown menu container
 * Positioned absolutely below header on mobile screens
 */
const MobileMenu = styled.div<{ $isOpen: boolean; theme: string }>`
  display: none;

  ${MEDIA_QUERIES.belowDesktop} {
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
    position: absolute;
    top: 100%;
    right: 0;
    background-color: ${({ theme }) =>
      theme === "light" ? "#ffffff" : "#0e0d0d"};
    border: 1px solid
      ${({ theme }) => (theme === "light" ? "#c0c0c0" : "#5a5a5a")};
    border-radius: 4px;
    min-width: 200px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    z-index: 1000;
  }
`;

/**
 * Individual header navigation link/tab
 * Supports both desktop and mobile variants with different styling
 */
const HeaderLink = styled.div<{
  $isActive: boolean;
  $isMobile?: boolean;
  theme: string;
}>`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
  cursor: pointer;
  padding: 10px 20px;

  /* Active state styling - conditional based on mobile/desktop */
  ${({ $isActive, $isMobile, theme }) =>
    $isActive &&
    css`
      background-color: ${theme === "light" ? "#e0e0e0" : "#242424"};
      ${!$isMobile &&
      css`
        border-radius: 4px;
        border: 0.67px solid ${theme === "light" ? "#c0c0c0" : "#5a5a5a"};
      `}
    `}

  /* Mobile-specific styling overrides */
  ${({ $isMobile, theme }) =>
    $isMobile &&
    css`
      display: block;
      border-radius: 0;
      border: none;
      border-bottom: 1px solid ${theme === "light" ? "#c0c0c0" : "#5a5a5a"};
      background-color: transparent;

      &:hover {
        background-color: ${theme === "light" ? "#f0f0f0" : "#242424"};
      }
    `}
`;

/**
 * Main Header Component
 *
 * Responsive navigation header that adapts to different screen sizes:
 * - Desktop: Shows navigation tabs on left, search on right
 * - Mobile/Tablet: Shows search on left, hamburger menu on right
 *
 * Features:
 * - Redux state management for active tab
 * - Click-outside-to-close mobile menu functionality
 * - Keyboard accessibility support
 *
 * @returns Rendered header component
 */
const Header = () => {
  // Redux hooks for state management
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state: RootState) => state.home.activeTab);
  const activeTheme = useAppSelector((state: RootState) => state.theme.theme);
  // Local state for mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Ref for click-outside detection
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  /**
   * Handles tab selection and updates Redux state
   * Also closes mobile menu when tab is selected on mobile
   *
   * @param {EHeaderTabs} tab - The selected tab enum value
   */
  const handleTabClick = (tab: EHeaderTabs) => {
    dispatch(setActiveTab(tab));
    setIsMobileMenuOpen(false); // Close mobile menu after selection
  };

  /**
   * Toggles mobile menu open/closed state
   * Uses functional state update to ensure latest state
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  /**
   * Effect hook for handling click-outside-to-close functionality
   * Only adds event listener when mobile menu is open for performance
   */
  useEffect(() => {
    /**
     * Handles clicks outside the mobile menu to close it
     * Uses event delegation and DOM node checking
     *
     * @param {MouseEvent} event - The mouse click event
     */
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    // Only add listener when menu is open
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <HeaderContainer theme={activeTheme}>
      {/* Desktop Navigation Links */}
      <HeaderLeft>
        {Object.values(EHeaderTabs).map((link) => (
          <HeaderLink
            key={link}
            onClick={() => handleTabClick(link as EHeaderTabs)}
            $isActive={activeTab === link}
            theme={activeTheme}
          >
            {link}
          </HeaderLink>
        ))}
      </HeaderLeft>

      <HeaderDesktopRight>
        <Button
          theme={activeTheme}
          onClick={() =>
            dispatch(setTheme(activeTheme === "light" ? "dark" : "light"))
          }
        >
          Toggle Theme
        </Button>

        {/* Search Input - Always Visible */}
        <InputContainer theme={activeTheme}>
          <MdSearch
            size={26}
            color={activeTheme === "light" ? "#666666" : "#FFFFFF"}
          />
          <SearchInput theme={activeTheme} type="text" placeholder="Search" />
        </InputContainer>
      </HeaderDesktopRight>

      {/* Mobile Menu Icon */}
      <HeaderRight>
        <MenuIcon theme={activeTheme} onClick={toggleMobileMenu}>
          <MdMenu size={28} />
        </MenuIcon>
      </HeaderRight>

      {/* Mobile Dropdown Menu */}
      <MobileMenu
        $isOpen={isMobileMenuOpen}
        theme={activeTheme}
        ref={mobileMenuRef}
      >
        {Object.values(EHeaderTabs).map((link) => (
          <HeaderLink
            key={`mobile-${link}`}
            onClick={() => handleTabClick(link as EHeaderTabs)}
            $isActive={activeTab === link}
            $isMobile={true}
            theme={activeTheme}
          >
            {link}
          </HeaderLink>
        ))}
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header;
