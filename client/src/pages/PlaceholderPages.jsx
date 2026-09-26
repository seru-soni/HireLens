import React from 'react';
import { Link } from 'react-router-dom';
import {
  Settings,
  Shield,
  Bell,
  Sliders,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';

export const SettingsPage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="pb-3 border-b border-white/[0.08]">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F2EFE8] tracking-tight">
            Account Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#85858A] mt-1">
            Configure application preferences, security, and analysis settings.
          </p>
        </div>

        {/* Minimal Settings Cards */}
        <div className="space-y-4">
          {/* Analysis Settings */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[rgba(15,17,23,0.72)] backdrop-blur-md border border-white/[0.08] space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#A8C7E8]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#F2EFE8]">Analysis Engine</h3>
                <p className="text-xs text-[#85858A]">Powered by Google Gemini for recruitment opportunity risk evaluation.</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-[#B8B6B0]">Detailed evidence breakdown</span>
              <span className="px-2.5 py-1 rounded-lg bg-[rgba(104,168,131,0.12)] text-[#68a883] font-semibold text-[10px] border border-[rgba(104,168,131,0.25)]">
                Active
              </span>
            </div>
          </div>

          {/* Security & Sessions */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[rgba(15,17,23,0.72)] backdrop-blur-md border border-white/[0.08] space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#A8C7E8]">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#F2EFE8]">Security & Authentication</h3>
                <p className="text-xs text-[#85858A]">JWT secure cookie token session protection.</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-[#B8B6B0]">HttpOnly cookie storage</span>
              <span className="px-2.5 py-1 rounded-lg bg-[rgba(104,168,131,0.12)] text-[#68a883] font-semibold text-[10px] border border-[rgba(104,168,131,0.25)]">
                Enforced
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
