import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/60 py-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">HireLens</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Empowering job seekers with explainable risk assessment and recruiter signal analysis before sharing personal information.
            </p>
            <p className="text-xs text-slate-500">
              Disclaimer: HireLens provides risk indicator estimates based on available data and signals. It does not provide definitive legal guarantees.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Analyze Jobs
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  Risk Indicators
                </a>
              </li>
              <li>
                <a href="#signals" className="hover:text-white transition-colors">
                  Detection Signals
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Security & Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-white transition-colors">
                  Future Roadmap
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} HireLens. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Built for secure recruitment transparency.</p>
        </div>
      </div>
    </footer>
  );
};
