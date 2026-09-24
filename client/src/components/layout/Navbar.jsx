import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, LogIn, UserPlus, LayoutDashboard, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white flex items-center">
            Hire<span className="text-indigo-400">Lens</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#signals" className="hover:text-white transition-colors">
            Risk Signals
          </a>
          <a href="#roadmap" className="hover:text-white transition-colors">
            Roadmap
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center space-x-2 text-sm font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 px-3.5 py-2 rounded-lg border border-slate-700 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <Link
                to="/profile"
                className="inline-flex items-center space-x-2 text-sm font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 px-3.5 py-2 rounded-lg border border-slate-700 transition-colors"
                title={user?.email}
              >
                <User className="w-4 h-4 text-slate-300" />
                <span className="hidden sm:inline font-normal">{user?.name?.split(' ')[0]}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center space-x-1.5 text-sm font-medium text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-2 rounded-lg border border-rose-500/20 transition-colors"
                aria-label="Log out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="inline-flex items-center space-x-1.5 text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center space-x-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg shadow-sm shadow-indigo-600/30 transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Account</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
