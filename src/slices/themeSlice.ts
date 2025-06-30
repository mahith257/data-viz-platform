import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: localStorage.getItem("theme") ?? "dark",
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
    setTheme: (state, action) => {
      const theme = action.payload;
      localStorage.setItem("theme", theme);
      state.theme = theme;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
