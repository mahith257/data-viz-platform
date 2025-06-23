/**
 * @fileoverview Dashboard routing constants and component mapping
 *
 * This module defines the mapping between header tabs and their corresponding
 * dashboard components, enabling dynamic content rendering based on navigation state.
 *
 * @author Mahith Reddy
 * @version 1.0.0
 */

import { EHeaderTabs } from "../header/types";
import ChargingStations from "./chargingStations/ChargingStations";

/**
 * Mapping of header tabs to their corresponding dashboard components
 *
 * This record provides a type-safe mapping that ensures each header tab
 * has a corresponding React component to render in the dashboard area.
 *
 * Current Mappings:
 * - CHARGING_STATIONS: Full charging stations dashboard with analytics
 * - FLEET_SIZING: Placeholder for future fleet sizing features
 * - PARKING: Placeholder for future parking management features
 *
 * @example
 * ```tsx
 * const activeComponent = HEADER_TABS_TO_DASHBOARD_MAP[activeTab];
 * return activeComponent;
 * ```
 */
export const HEADER_TABS_TO_DASHBOARD_MAP: Record<
  EHeaderTabs,
  React.ReactNode
> = {
  [EHeaderTabs.CHARGING_STATIONS]: <ChargingStations />,
  [EHeaderTabs.FLEET_SIZING]: <></>, // Future: Fleet sizing dashboard
  [EHeaderTabs.PARKING]: <></>, // Future: Parking management dashboard
};
