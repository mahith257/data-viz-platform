/**
 * @fileoverview Header component type definitions
 *
 * Type definitions for header navigation and related UI components.
 * Defines available navigation tabs and their display values.
 *
 * @author Mahith Reddy
 * @version 1.0.0
 */

/**
 * Available header navigation tabs
 *
 * Enum defining the main navigation sections of the application.
 * Values are used both for navigation state and display text.
 *
 * @enum {string}
 *
 * @example
 * ```typescript
 * import { EHeaderTabs } from './types';
 *
 * const activeTab = EHeaderTabs.CHARGING_STATIONS;
 * dispatch(setActiveTab(EHeaderTabs.FLEET_SIZING));
 * ```
 */
export enum EHeaderTabs {
  CHARGING_STATIONS = "Charging Stations",
  FLEET_SIZING = "Fleet Sizing",
  PARKING = "Parking",
}
