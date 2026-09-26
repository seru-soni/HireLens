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
  Sparkles,
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
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="pb-3.5 border-b border-[rgba(184,167,255,0.12)]">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[rgba(184,167,255,0.10)] border border-[rgba(184,167,255,0.24)] text-[#B8A7FF] text-xs font-semibold uppercase tracking-wider mb-2 shadow-[0_0_12px_rgba(184,167,255,0.12)]">
            <Sparkles className="w-3.5 h-3.5 text-[#7DD3FC]" />
            <span>Account Preferences</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
            User Profile & Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Manage your personal profile, credentials, and verification identity.
          </p>
        </div>

        {/* Notifications */}
        {successMessage && (
          <div className="p-3.5 rounded-xl bg-[rgba(52,211,153,0.14)] border border-[rgba(52,211,153,0.30)] text-[#34D399] flex items-center space-x-3 text-sm shadow-[0_0_15px_rgba(52,211,153,0.15)]">
            <CheckCircle2 className="w-5 h-5 text-[#34D399] shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-[rgba(244,63,94,0.14)] border border-[rgba(244,63,94,0.30)] text-[#FB7185] flex items-center space-x-3 text-sm shadow-[0_0_15px_rgba(244,63,94,0.15)]">
            <AlertCircle className="w-5 h-5 text-[#FB7185] shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Profile Card - Solid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Left summary column */}
          <div className="p-6 rounded-2xl bg-[#111426] border border-[rgba(185,167,255,0.15)] flex flex-col items-center text-center shadow-lg">
            <div className="w-20 h-20 rounded-2xl bg-[#171A32] border border-[rgba(185,167,255,0.25)] flex items-center justify-center text-2xl font-extrabold text-[#B9A7FF] mb-3.5">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <h2 className="text-base font-bold text-[#F8FAFC]">{user?.name}</h2>
            <p className="text-xs text-[#94A3B8] mt-0.5">{user?.email}</p>

            <div className="w-full mt-5 pt-5 border-t border-[rgba(185,167,255,0.10)] space-y-2.5 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#94A3B8] flex items-center space-x-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#B9A7FF]" />
                  <span>Role</span>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#171A32] text-[#B9A7FF] font-semibold uppercase text-[10px] border border-[rgba(185,167,255,0.20)]">
                  {user?.role || 'user'}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-[#94A3B8] flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C8BCFF]" />
                  <span>Member Since</span>
                </span>
                <span className="text-[#CBD5E1] font-medium">{formatDate(user?.createdAt)}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-[#94A3B8] flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>Session</span>
                </span>
                <span className="text-[#34D399] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                  JWT Active
                </span>
              </div>
            </div>
          </div>

          {/* Right form column */}
          <div className="md:col-span-2 p-6 rounded-2xl bg-[#111426] border border-[rgba(185,167,255,0.15)] shadow-lg">
            <h3 className="text-sm font-bold text-[#F8FAFC] mb-4">Account Information</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="profile-name" className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
                  Full Name
                </label>
                <div className="mt-1.5 relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                    <User className="w-4 h-4 text-[#B9A7FF]" />
                  </div>
                  <input
                    id="profile-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="block w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0B0E1E] border border-[rgba(185,167,255,0.20)] text-sm text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#B9A7FF] focus:ring-1 focus:ring-[#B9A7FF]/30 transition-all"
                  />
                </div>
              </div>

              {/* Email (Read Only) */}
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="profile-email" className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
                    Email Address
                  </label>
                  <span className="text-[10px] text-[#94A3B8]">Primary Identifier</span>
                </div>
                <div className="mt-1.5 relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                    <Mail className="w-4 h-4 text-[#C8BCFF]" />
                  </div>
                  <input
                    id="profile-email"
                    type="email"
                    disabled
                    value={user?.email || ''}
                    className="block w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#080A18]/60 border border-[rgba(185,167,255,0.10)] text-sm text-[#94A3B8] cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Password masked notice */}
              <div className="p-3.5 rounded-xl bg-[#171A32] border border-[rgba(185,167,255,0.10)]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#94A3B8]">Password Encryption</span>
                  <span className="text-[#CBD5E1] font-mono tracking-wider">••••••••••••</span>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-2 border-t border-[rgba(185,167,255,0.10)] flex justify-end">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#B9A7FF] hover:bg-[#C8BCFF] text-[#080A18] font-bold text-xs shadow-md disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer hover:scale-[1.01]"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
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

export default Profile;
