/**
 * @fileoverview Home navigation Redux slice
 *
 * This module manages the application's navigation state, specifically
 * tracking which header tab is currently active. Simple state management
 * for UI navigation without complex async operations.
 *
 * State Structure:
 * - activeTab: Currently selected header tab (EHeaderTabs enum)
 *
 * @author Mahith Reddy
 * @version 1.0.0
 */

import { createSlice } from "@reduxjs/toolkit";
import { EHeaderTabs } from "../components/header/types";

/**
 * Home navigation slice definition
 *
 * Simple slice for managing UI navigation state. Tracks which header tab
 * is currently active to provide visual feedback and conditional rendering.
 *
 * Initial State: Defaults to Charging Stations tab as the main dashboard
 */
const homeSlice = createSlice({
  name: "home",
  initialState: {
    activeTab: EHeaderTabs.CHARGING_STATIONS,
  },
  reducers: {
    /**
     * Sets the active navigation tab
     *
     * Updates the currently selected header tab for navigation feedback.
     * Used by header component when user clicks different tabs.
     *
     * @param state - Current home state
     * @param action - Action with new tab value (EHeaderTabs)
     *
     * @example
     * ```typescript
     * dispatch(setActiveTab(EHeaderTabs.FLEET_SIZING));
     * ```
     */
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = homeSlice.actions;
export default homeSlice.reducer;
