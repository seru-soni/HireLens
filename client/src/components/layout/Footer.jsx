import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0b0c0f]/80 py-12 text-[#85858A] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#A8C7E8]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-[#F2EFE8] tracking-tight">
                Hire<span className="text-[#A8C7E8]">Lens</span>
              </span>
            </div>
            <p className="text-[#B8B6B0] text-sm max-w-sm leading-relaxed">
              Empowering job seekers with explainable risk assessment and recruiter signal analysis before sharing personal information.
            </p>
            <p className="text-xs text-[#85858A]">
              Disclaimer: HireLens provides risk indicator estimates based on available data and signals. It does not provide definitive legal guarantees.
            </p>
          </div>

          <div>
            <h4 className="text-[#DDD9CF] font-semibold text-sm mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-[#B8B6B0]">
              <li>
                <Link to="/register" className="hover:text-[#F2EFE8] transition-colors">
                  Analyze Jobs
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#F2EFE8] transition-colors">
                  Risk Indicators
                </a>
              </li>
              <li>
                <a href="#signals" className="hover:text-[#F2EFE8] transition-colors">
                  Detection Signals
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#DDD9CF] font-semibold text-sm mb-3">Security & Account</h4>
            <ul className="space-y-2 text-sm text-[#B8B6B0]">
              <li>
                <Link to="/login" className="hover:text-[#F2EFE8] transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-[#F2EFE8] transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-[#F2EFE8] transition-colors">
                  Future Roadmap
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-[#85858A]">
          <p>© {new Date().getFullYear()} HireLens. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Built for secure recruitment transparency.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
