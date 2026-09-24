import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, PublicOnlyRoute } from './routes/ProtectedRoute';

// Pages
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import {
  AnalyzeJobPage,
  MyJobsPage,
  ReportsPage,
  SavedJobsPage,
  SettingsPage,
} from './pages/PlaceholderPages';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing */}
          <Route path="/" element={<Landing />} />

          {/* Public Auth Routes (Redirects to /dashboard if already logged in) */}
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicOnlyRoute>
                <Register />
              </PublicOnlyRoute>
            }
          />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/analyze" element={<AnalyzeJobPage />} />
            <Route path="/jobs" element={<MyJobsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/saved" element={<SavedJobsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
