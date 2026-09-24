import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="flex items-center space-x-3 text-indigo-500 animate-pulse">
          <ShieldAlert className="w-8 h-8" />
          <span className="text-lg font-semibold tracking-wide text-slate-200">Verifying session...</span>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="flex items-center space-x-3 text-indigo-500 animate-pulse">
          <ShieldAlert className="w-8 h-8" />
          <span className="text-lg font-semibold tracking-wide text-slate-200">Loading...</span>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};
