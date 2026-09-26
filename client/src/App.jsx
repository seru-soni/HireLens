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
import { AnalyzeJob } from './pages/AnalyzeJob';
import { Reports } from './pages/MyJobs';
import { JobReport } from './pages/JobReport';
import { SavedJobs } from './pages/SavedJobs';
import { SettingsPage } from './pages/PlaceholderPages';
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
            <Route path="/analyze" element={<AnalyzeJob />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/jobs" element={<Navigate to="/reports" replace />} />
            <Route path="/jobs/:id" element={<JobReport />} />
            <Route path="/saved" element={<SavedJobs />} />
            <Route path="/saved-jobs" element={<Navigate to="/saved" replace />} />
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
