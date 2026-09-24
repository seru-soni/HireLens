import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  LayoutDashboard,
  SearchCode,
  Briefcase,
  FileWarning,
  Bookmark,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Analyze Job', href: '/analyze', icon: SearchCode },
    { name: 'My Jobs', href: '/jobs', icon: Briefcase },
    { name: 'Reports', href: '/reports', icon: FileWarning },
    { name: 'Saved Jobs', href: '/saved', icon: Bookmark },
  ];

  const accountNav = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row text-slate-100">
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/30">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-white">HireLens</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Desktop Sidebar & Mobile Drawer */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 border-r border-slate-800 bg-slate-900/95 md:bg-slate-900/70 backdrop-blur-md flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-5 flex flex-col flex-1 overflow-y-auto">
          {/* Brand */}
          <div className="hidden md:flex items-center space-x-3 mb-8 px-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center">
                Hire<span className="text-indigo-400">Lens</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-indigo-400/80 block">
                Risk Assessment
              </span>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Menu
            </p>
            {navigation.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    active
                      ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Account Section */}
          <div className="mt-8 space-y-1">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Account
            </p>
            {accountNav.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    active
                      ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Risk Engine Badge */}
          <div className="mt-auto pt-6">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Rule Engine v1.0</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Continuous risk indicators & recruiter signal validation active.
              </p>
            </div>
          </div>
        </div>

        {/* User Footer & Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center justify-between">
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 min-w-0 hover:opacity-80 transition-opacity"
            >
              <div className="w-9 h-9 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center font-bold text-indigo-300 text-sm shrink-0">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-white truncate">{user?.name || 'User'}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Navbar on Desktop */}
        <div className="hidden md:flex items-center justify-between px-8 py-4 border-b border-slate-800 bg-slate-900/30 backdrop-blur-sm sticky top-0 z-30">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span>HireLens</span>
            <span>/</span>
            <span className="text-slate-200 capitalize">
              {location.pathname.replace('/', '') || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-full border border-slate-700/60">
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span>Role: <strong className="text-slate-200 uppercase">{user?.role || 'User'}</strong></span>
            </div>
            <Link
              to="/profile"
              className="text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              Account Settings
            </Link>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
