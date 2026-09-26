import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0c0f] flex flex-col items-center justify-center p-4">
        <div className="flex items-center space-x-3 text-[#A8C7E8] animate-pulse">
          <ShieldAlert className="w-8 h-8" />
          <span className="text-lg font-semibold tracking-wide text-[#F2EFE8]">Verifying session...</span>
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
      <div className="min-h-screen bg-[#0b0c0f] flex flex-col items-center justify-center p-4">
        <div className="flex items-center space-x-3 text-[#A8C7E8] animate-pulse">
          <ShieldAlert className="w-8 h-8" />
          <span className="text-lg font-semibold tracking-wide text-[#F2EFE8]">Loading...</span>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};
