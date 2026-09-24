import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check current authentication session on app start
  const checkAuth = async () => {
    try {
      setLoading(true);
      const res = await API.get('/auth/me');
      if (res.data?.success && res.data?.user) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      // Not authenticated or session expired
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Register user
  const register = async (userData) => {
    setError(null);
    try {
      const res = await API.post('/auth/register', userData);
      if (res.data?.success && res.data?.user) {
        setUser(res.data.user);
        return { success: true, user: res.data.user };
      }
      return { success: false, message: 'Registration failed' };
    } catch (err) {
      const msg = err.customMessage || 'Registration failed. Please try again.';
      setError(msg);
      return { success: false, message: msg };
    }
  };

  // Login user
  const login = async (credentials) => {
    setError(null);
    try {
      const res = await API.post('/auth/login', credentials);
      if (res.data?.success && res.data?.user) {
        setUser(res.data.user);
        return { success: true, user: res.data.user };
      }
      return { success: false, message: 'Login failed' };
    } catch (err) {
      const msg = err.customMessage || 'Invalid credentials. Please try again.';
      setError(msg);
      return { success: false, message: msg };
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await API.post('/auth/logout');
    } catch (err) {
      console.error('Logout request error:', err);
    } finally {
      setUser(null);
    }
  };

  // Refresh or update local user state
  const refreshUser = async () => {
    try {
      const res = await API.get('/auth/me');
      if (res.data?.success && res.data?.user) {
        setUser(res.data.user);
      }
    } catch (err) {
      console.error('Failed to refresh user:', err);
    }
  };

  // Update profile
  const updateProfile = async (profileData) => {
    try {
      const res = await API.put('/users/profile', profileData);
      if (res.data?.success && res.data?.user) {
        setUser(res.data.user);
        return { success: true, user: res.data.user };
      }
      return { success: false, message: 'Failed to update profile' };
    } catch (err) {
      const msg = err.customMessage || 'Failed to update profile';
      return { success: false, message: msg };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    error,
    register,
    login,
    logout,
    refreshUser,
    updateProfile,
    clearError: () => setError(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
