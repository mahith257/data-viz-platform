/**
 * @fileoverview Main application layout component
 *
 * This component provides the overall application structure with sidebar,
 * header, and main content area. Uses React Router's Outlet for nested routing.
 *
 * @author Mahith Reddy
 * @version 1.0.0
 */

import styled from "styled-components";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import { Outlet } from "react-router";
import { useAppSelector, type RootState } from "../store";

/**
 * Main layout container with sidebar and content area
 * Uses flexbox to create a responsive layout structure
 */
const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  gap: 10px;
  background-color: var(--background-color);
`;

/**
 * Right side container for header and main content
 * Takes remaining width after sidebar (80px)
 */
const LayoutRightContainer = styled.div`
  width: calc(100% - 80px);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

/**
 * Main Layout Component
 *
 * Provides the core application structure with consistent navigation
 * and content area. Uses React Router's Outlet for nested routing.
 *
 * Structure:
 * - Left: Sidebar (80px width)
 * - Right: Header + Main Content Area
 *
 * Features:
 * - Responsive design
 * - Nested routing support
 * - Consistent navigation structure
 *
 * @returns Complete application layout
 *
 * @example
 * ```tsx
 * <Route path="/" element={<Layout />}>
 *   <Route index element={<Dashboard />} />
 *   <Route path="/settings" element={<Settings />} />
 * </Route>
 * ```
 */
const Layout = () => {
  const activeTheme = useAppSelector((state: RootState) => state.theme.theme);
  return (
    <LayoutContainer
      style={
        {
          "--background-color": activeTheme === "light" ? "#f5f5f5" : "#161618",
          "--text-color": activeTheme === "light" ? "#000000" : "#ffffff",
          "--accent-color": activeTheme === "light" ? "#4caf50" : "#c8e972",
          "--button-text-color":
            activeTheme === "light" ? "#000000" : "#ffffff",
        } as React.CSSProperties
      }
    >
      {/* Left sidebar for navigation */}
      <Sidebar />
      <LayoutRightContainer>
        {/* Top header with navigation and search */}
        <Header />
        {/* Main content area - rendered by React Router */}
        <Outlet />
      </LayoutRightContainer>
    </LayoutContainer>
  );
};

export default Layout;
