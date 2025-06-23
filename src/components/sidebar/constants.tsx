/**
 * @fileoverview Sidebar navigation configuration
 *
 * This module defines the navigation links and their associated icons
 * for the application sidebar. Each link includes label, icon component,
 * and routing path information.
 *
 * @author Mahith Reddy
 * @version 1.0.0
 */

import Bell from "../../assets/icons/Bell";
import ClipboardClock from "../../assets/icons/ClipboardClock";
import CloudUpload from "../../assets/icons/CloudUpload";
import Home from "../../assets/icons/Home";
import Settings from "../../assets/icons/Settings";

/**
 * Sidebar navigation links configuration
 *
 * Array of navigation items that define the sidebar structure.
 * Each item contains label for accessibility, icon component for display,
 * and path for React Router navigation.
 *
 * Link Structure:
 * - Home: Main dashboard landing page
 * - Notifications: User alerts and messages (future feature)
 * - Activity: User activity tracking (future feature)
 * - Upload: Data upload functionality (future feature)
 * - Settings: Application configuration (future feature)
 *
 * @example
 * ```tsx
 * SIDEBAR_LINKS.map((link) => (
 *   <NavItem key={link.label} onClick={() => navigate(link.path)}>
 *     <link.icon />
 *   </NavItem>
 * ))
 * ```
 */
const SIDEBAR_LINKS = [
  {
    label: "Home",
    icon: Home,
    path: "/",
  },
  {
    label: "Notifications",
    icon: Bell,
    path: "/notifications", // Future: Notifications dashboard
  },
  {
    label: "Activity",
    icon: ClipboardClock,
    path: "/activity", // Future: Activity tracking
  },
  {
    label: "Upload",
    icon: CloudUpload,
    path: "/upload", // Future: Data upload interface
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings", // Future: Settings panel
  },
];

export default SIDEBAR_LINKS;
