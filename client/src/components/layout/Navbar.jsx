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
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#0b0c0f]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#A8C7E8] group-hover:border-[rgba(168,199,232,0.4)] transition-colors duration-200">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#F2EFE8] flex items-center">
            Hire<span className="text-[#A8C7E8]">Lens</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#B8B6B0]">
          <a href="#how-it-works" className="hover:text-[#F2EFE8] transition-colors">
            How It Works
          </a>
          <a href="#signals" className="hover:text-[#F2EFE8] transition-colors">
            Risk Signals
          </a>
          <a href="#roadmap" className="hover:text-[#F2EFE8] transition-colors">
            Roadmap
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center space-x-2 text-sm font-medium text-[#B8B6B0] hover:text-[#F2EFE8] bg-white/[0.04] hover:bg-white/[0.08] px-3.5 py-2 rounded-lg border border-white/[0.08] transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-[#A8C7E8]" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <Link
                to="/profile"
                className="inline-flex items-center space-x-2 text-sm font-medium text-[#B8B6B0] hover:text-[#F2EFE8] bg-white/[0.04] hover:bg-white/[0.08] px-3.5 py-2 rounded-lg border border-white/[0.08] transition-colors"
                title={user?.email}
              >
                <User className="w-4 h-4 text-[#85858A]" />
                <span className="hidden sm:inline font-normal">{user?.name?.split(' ')[0]}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center space-x-1.5 text-sm font-medium text-[#85858A] hover:text-[#c46b6b] bg-white/[0.04] hover:bg-white/[0.08] px-3 py-2 rounded-lg border border-white/[0.08] transition-colors cursor-pointer"
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
                className="inline-flex items-center space-x-1.5 text-sm font-medium text-[#B8B6B0] hover:text-[#F2EFE8] px-3 py-2 rounded-lg transition-colors"
              >
                <LogIn className="w-4 h-4 text-[#85858A]" />
                <span>Sign In</span>
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center space-x-1.5 text-sm font-semibold text-[#0d1218] bg-[#A8C7E8] hover:bg-[#BFD7F0] px-4 py-2 rounded-lg shadow-sm transition-colors"
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

export default Navbar;
