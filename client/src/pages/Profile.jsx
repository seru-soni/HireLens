import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Shield,
  Calendar,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../components/layout/DashboardLayout';

export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setAvatar(user.avatar || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Full name cannot be empty.');
      return;
    }

    setIsUpdating(true);
    const res = await updateProfile({ name: name.trim(), avatar: avatar.trim() });
    setIsUpdating(false);

    if (res.success) {
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 4000);
    } else {
      setErrorMessage(res.message || 'Failed to update profile.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="pb-4 border-b border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            User Profile
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your personal details and account preferences.
          </p>
        </div>

        {/* Notifications */}
        {successMessage && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center space-x-3 text-sm animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-center space-x-3 text-sm">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Profile Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left summary column */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 border-2 border-indigo-400/40 flex items-center justify-center text-3xl font-extrabold text-white shadow-xl shadow-indigo-600/20 mb-4">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <h2 className="text-lg font-bold text-white">{user?.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{user?.email}</p>

            <div className="w-full mt-6 pt-6 border-t border-slate-800/80 space-y-3 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center space-x-1.5">
                  <Shield className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Account Role</span>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 font-semibold uppercase text-[10px] border border-indigo-500/20">
                  {user?.role || 'user'}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Member Since</span>
                </span>
                <span className="text-slate-200 font-medium">{formatDate(user?.createdAt)}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Auth Method</span>
                </span>
                <span className="text-slate-200 font-medium">JWT HttpOnly</span>
              </div>
            </div>
          </div>

          {/* Right form column */}
          <div className="md:col-span-2 p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-base font-bold text-white mb-4">Account Information</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label htmlFor="profile-name" className="block text-sm font-medium text-slate-200">
                  Full Name
                </label>
                <div className="mt-1.5 relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="profile-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="block w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              {/* Email (Read Only) */}
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="profile-email" className="block text-sm font-medium text-slate-200">
                    Email Address
                  </label>
                  <span className="text-[11px] text-slate-400">Primary Identifier</span>
                </div>
                <div className="mt-1.5 relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="profile-email"
                    type="email"
                    disabled
                    value={user?.email || ''}
                    className="block w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-sm text-slate-400 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Avatar URL */}
              <div>
                <label htmlFor="profile-avatar" className="block text-sm font-medium text-slate-200">
                  Avatar Image URL (Optional)
                </label>
                <div className="mt-1.5">
                  <input
                    id="profile-avatar"
                    type="url"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    className="block w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-3 border-t border-slate-800/80 flex justify-end">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md shadow-indigo-600/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Profile</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
