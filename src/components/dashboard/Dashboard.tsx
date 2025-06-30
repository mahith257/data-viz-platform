/**
 * @fileoverview Main dashboard component with dynamic tab rendering
 *
 * This component serves as the central dashboard that dynamically renders
 * different content based on the active header tab selection.
 *
 * @author Mahith Reddy
 * @version 1.0.0
 */

import { useAppSelector, type RootState } from "../../store";
import { HEADER_TABS_TO_DASHBOARD_MAP } from "./constants";

/**
 * Main Dashboard Component
 *
 * Central dashboard that renders different views based on the active header tab.
 * Uses Redux state to determine which component to display, providing a
 * seamless single-page application experience.
 *
 * Features:
 * - Dynamic content rendering based on active tab
 * - Redux state integration
 * - Single-page application behavior
 * - Consistent dashboard structure
 *
 * @returns Active dashboard component
 *
 * @example
 * ```tsx
 * // Renders ChargingStations when CHARGING_STATIONS tab is active
 * // Renders FleetSizing when FLEET_SIZING tab is active
 * <Dashboard />
 * ```
 */
const Dashboard = () => {
  // Get current active tab from Redux store

  const activeTab = useAppSelector((state: RootState) => state.home.activeTab);

  // Return the corresponding dashboard component for the active tab
  return HEADER_TABS_TO_DASHBOARD_MAP[activeTab];
};

export default Dashboard;
