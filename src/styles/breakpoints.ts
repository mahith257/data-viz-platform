/**
 * @fileoverview Responsive design breakpoint system
 *
 * Standardized breakpoint constants and media query helpers for consistent
 * responsive design across the application. Uses desktop-first approach
 * for optimal performance and design consistency.
 *
 * @author Mahith Reddy
 * @version 1.0.0
 */

/**
 * Breakpoint constants for consistent responsive design (Desktop-first approach)
 *
 * These breakpoints are optimized for the dashboard interface and provide
 * smooth transitions across different screen sizes.
 */
export const BREAKPOINTS = {
  mobile: "480px", // Small phones
  tablet: "768px", // Tablets and large phones
  desktop: "1024px", // Desktop and laptops
  large: "1440px", // Large desktops
} as const;

/**
 * Desktop-first media query helpers (using max-width)
 *
 * Pre-built media query strings for consistent responsive design.
 * Import and use these constants in styled-components for type safety
 * and maintainability.
 *
 * @example
 * ```typescript
 * const Component = styled.div`
 *   width: 100%;
 *
 *   ${MEDIA_QUERIES.belowDesktop} {
 *     width: 90%;
 *   }
 * `;
 * ```
 */
export const MEDIA_QUERIES = {
  // Max-width queries (desktop-first)
  belowLarge: `@media (max-width: ${BREAKPOINTS.large})`,
  belowDesktop: `@media (max-width: ${BREAKPOINTS.desktop})`,
  belowTablet: `@media (max-width: ${BREAKPOINTS.tablet})`,
  belowMobile: `@media (max-width: ${BREAKPOINTS.mobile})`,

  // Min-width queries (for specific cases)
  aboveMobile: `@media (min-width: calc(${BREAKPOINTS.mobile} + 1px))`,
  aboveTablet: `@media (min-width: calc(${BREAKPOINTS.tablet} + 1px))`,
  aboveDesktop: `@media (min-width: calc(${BREAKPOINTS.desktop} + 1px))`,
  aboveLarge: `@media (min-width: calc(${BREAKPOINTS.large} + 1px))`,
} as const;

// Usage example (Desktop-first):
// Default styles apply to desktop and above
// ${MEDIA_QUERIES.belowDesktop} {
//   // Tablet styles
// }
// ${MEDIA_QUERIES.belowTablet} {
//   // Mobile styles
// }
