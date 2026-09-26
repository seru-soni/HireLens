import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  LayoutDashboard,
  SearchCode,
  FileWarning,
  Bookmark,
  Settings,
  LogOut,
  Shield,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { HireLensAmbientFlow } from '../dashboard/HireLensAmbientFlow';

export const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const dockNav = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Analyze Job', href: '/analyze', icon: SearchCode },
    { name: 'Reports', href: '/reports', icon: FileWarning },
    { name: 'Saved Jobs', href: '/saved', icon: Bookmark },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/reports') {
      return location.pathname === '/reports' || location.pathname === '/jobs' || location.pathname.startsWith('/jobs/');
    }
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-transparent text-[#94A3B8] flex flex-col relative pb-28 selection:bg-[#B8A7FF]/30 selection:text-[#F8FAFC]">
      {/* Full-Page Unified Dark Deep Navy-Violet Atmospheric Animated Background */}
      <HireLensAmbientFlow />

      {/* Top Navbar Header (Clean Solid SaaS Header with subtle border) */}
      <header className="sticky top-0 z-40 w-full border-b border-[rgba(160,140,255,0.15)] bg-[#0A0D1F] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
        {/* Brand */}
        <Link to="/dashboard" className="flex items-center space-x-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-[#111321] border border-[rgba(184,161,255,0.20)] flex items-center justify-center text-[#B8A1FF] group-hover:border-[#B8A1FF] transition-all">
            <ShieldCheck className="w-5 h-5 text-[#B8A1FF]" />
          </div>
          <span className="font-bold text-lg text-[#F8FAFC] tracking-tight">
            Hire<span className="text-[#B8A1FF]">Lens</span>
          </span>
        </Link>

        {/* Top-Right Account Controls */}
        <div className="flex items-center space-x-3">
          {/* Subtle Role Badge */}
          <div className="hidden sm:flex items-center space-x-2 text-xs text-[#94A3B8] bg-[#111321] px-3 py-1.5 rounded-full border border-[rgba(184,161,255,0.15)]">
            <Shield className="w-3.5 h-3.5 text-[#B8A1FF]" />
            <span>Role: <strong className="text-[#F8FAFC] uppercase">{user?.role || 'User'}</strong></span>
          </div>

          {/* Account Settings Link */}
          <Link
            to="/settings"
            className={`p-2 rounded-xl border transition-all ${
              location.pathname === '/settings'
                ? 'bg-[#171A2E] text-[#B8A1FF] border-[rgba(184,161,255,0.30)]'
                : 'bg-[#111321] hover:bg-[#171A2E] text-[#94A3B8] hover:text-[#F8FAFC] border-[rgba(184,161,255,0.15)]'
            }`}
            title="Settings"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </Link>

          {/* User Profile Avatar Button */}
          <Link
            to="/profile"
            className={`flex items-center space-x-2 px-2.5 py-1.5 rounded-xl border transition-all ${
              location.pathname === '/profile'
                ? 'bg-[#171A2E] text-[#F8FAFC] border-[rgba(184,161,255,0.30)]'
                : 'bg-[#111321] hover:bg-[#171A2E] text-[#94A3B8] hover:text-[#F8FAFC] border-[rgba(184,161,255,0.15)]'
            }`}
            title={user?.email || 'Profile'}
          >
            <div className="w-6 h-6 rounded-lg bg-[#171A2E] border border-[rgba(184,161,255,0.25)] flex items-center justify-center font-bold text-[#B8A1FF] text-xs shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <span className="text-xs font-medium text-[#F8FAFC] hidden md:inline truncate max-w-[120px]">
              {user?.name?.split(' ')[0] || 'Profile'}
            </span>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-[#94A3B8] hover:text-[#FB7185] bg-[#111321] hover:bg-[#171A2E] border border-[rgba(184,161,255,0.15)] hover:border-[rgba(244,63,94,0.30)] transition-all cursor-pointer"
            title="Logout"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Workspace Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 relative z-10">
        {children}
      </main>

      {/* Bottom Mac-Style Dock Navigation - Solid SaaS Surface */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <nav
          aria-label="Application Dock Navigation"
          className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-2xl bg-[#111321] border border-[rgba(184,161,255,0.18)] shadow-2xl shadow-black/80 transition-all hover:border-[rgba(184,161,255,0.30)]"
        >
          {dockNav.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`relative flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 group cursor-pointer ${
                  active
                    ? 'bg-[#171A2E] text-[#F8FAFC] border border-[rgba(184,161,255,0.30)]'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#171A2E]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    active ? 'text-[#B8A1FF]' : 'text-[#94A3B8] group-hover:text-[#B8A1FF]'
                  }`}
                />
                <span className="text-[11px] sm:text-xs tracking-tight">{item.name}</span>
                {active && (
                  <span className="hidden sm:block absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#B8A1FF]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default DashboardLayout;
