/**
 * @fileoverview Main Application Component
 *
 * Root component that sets up routing, authentication protection, and
 * initializes the auth listener for Firebase state synchronization.
 *
 * Architecture:
 * - BrowserRouter for client-side routing
 * - ProtectedRoute wrapper for authentication
 * - Layout component provides consistent app structure
 * - Auth listener syncs Firebase auth state with Redux
 *
 * @author Mahith Reddy
 * @version 1.0.0
 */

import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Layout from "./components/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { useAuthListener } from "./hooks/useAuthListener";

/**
 * Main Application Component
 *
 * Root component that orchestrates the entire application structure.
 * Sets up routing, authentication protection, and Firebase auth synchronization.
 *
 * Features:
 * - Client-side routing with React Router
 * - Global authentication state management
 * - Protected route wrapper for security
 * - Consistent layout structure
 * - Placeholder routes for future features
 *
 * @returns Complete application with routing and auth
 */
function App() {
  // Initialize Firebase auth state listener
  // Syncs Firebase auth changes with Redux store
  useAuthListener();

  return (
    <BrowserRouter>
      {/* Wrap entire app in authentication protection */}
      <ProtectedRoute>
        <Routes>
          {/* Main layout with sidebar and header */}
          <Route path="/" element={<Layout />}>
            {/* Dashboard is the default/index route */}
            <Route index element={<Dashboard />} />

            {/* Placeholder routes for future features */}
            <Route path="/notifications" element={<></>} />
            <Route path="/activity" element={<></>} />
            <Route path="/upload" element={<></>} />
            <Route path="/settings" element={<></>} />
          </Route>
        </Routes>
      </ProtectedRoute>
    </BrowserRouter>
  );
}

export default App;
