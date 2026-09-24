import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  SearchCode,
  AlertTriangle,
  FileCheck2,
  Bookmark,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Clock,
  ExternalLink,
  Info,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../components/layout/DashboardLayout';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobUrlInput, setJobUrlInput] = useState('');

  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleAnalyzeSubmit = (e) => {
    e.preventDefault();
    if (jobUrlInput.trim()) {
      navigate(`/analyze?url=${encodeURIComponent(jobUrlInput.trim())}`);
    } else {
      navigate('/analyze');
    }
  };

  // Reusable dynamic statistics (prepared for backend dynamic count hook)
  const stats = [
    {
      name: 'Jobs Analyzed',
      value: 0,
      icon: SearchCode,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
      description: 'Total postings inspected',
    },
    {
      name: 'High-Risk Jobs',
      value: 0,
      icon: AlertTriangle,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
      description: 'Severe flags triggered',
    },
    {
      name: 'Reports Submitted',
      value: 0,
      icon: FileCheck2,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      description: 'Community alerts logged',
    },
    {
      name: 'Saved Jobs',
      value: 0,
      icon: Bookmark,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      description: 'Bookmarked opportunities',
    },
  ];

  const quickActions = [
    {
      title: 'Analyze Job',
      description: 'Paste a recruitment URL or description to audit risk signals.',
      href: '/analyze',
      icon: SearchCode,
      badge: 'Core Tool',
    },
    {
      title: 'My Jobs',
      description: 'Review your historical job audits and signal breakdowns.',
      href: '/jobs',
      icon: TrendingUp,
      badge: 'History',
    },
    {
      title: 'Reports',
      description: 'View alerts regarding suspicious recruiters and impersonations.',
      href: '/reports',
      icon: AlertTriangle,
      badge: 'Alerts',
    },
    {
      title: 'Saved Jobs',
      description: 'Quickly access validated and bookmarked job openings.',
      href: '/saved',
      icon: Bookmark,
      badge: 'Library',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-800/80">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {getGreeting()}, <span className="text-indigo-400">{user?.name || 'Job Seeker'}</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Stay informed before you apply. Assess opportunities with explainable risk signals.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>Last session: Today</span>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700/80 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">{stat.name}</span>
                  <div className={`p-2 rounded-xl ${stat.bg} ${stat.border} border`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline space-x-2">
                  <span className="text-3xl font-extrabold text-white tracking-tight">{stat.value}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Main Action: Analyze Job Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-900 p-6 sm:p-8 border border-indigo-500/20 shadow-xl">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-4 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Risk Auditor</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Check a Job Posting
            </h2>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              Found an opportunity you're unsure about? Check it for potential risk indicators such as generic recruiter domains, suspicious payment requests, or spoofed URLs.
            </p>

            <form onSubmit={handleAnalyzeSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={jobUrlInput}
                onChange={(e) => setJobUrlInput(e.target.value)}
                placeholder="Paste job posting URL (e.g. https://linkedin.com/jobs/...)"
                className="flex-1 rounded-xl bg-slate-950/90 border border-slate-700 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-inner"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md shadow-indigo-600/30 transition-all shrink-0"
              >
                <span>Analyze Job</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  to={action.href}
                  className="group p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-900/90 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-slate-800 text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 group-hover:text-indigo-300 group-hover:bg-indigo-950/60 transition-colors">
                        {action.badge}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors mb-1">
                      {action.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {action.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center text-xs text-slate-400 group-hover:text-indigo-400 transition-colors">
                    <span>Open {action.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Two-Column Section: Recent Activity & Safety Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
                <h3 className="text-base font-bold text-white">Recent Activity</h3>
                <span className="text-xs text-slate-400">Live feed</span>
              </div>

              {/* Empty State */}
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-400 mb-4">
                  <SearchCode className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">No activity yet</h4>
                <p className="text-xs text-slate-400 max-w-sm mb-5">
                  You haven't scanned any job opportunities yet. Analyze your first job posting to get started.
                </p>
                <Link
                  to="/analyze"
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-3.5 py-2 rounded-lg border border-indigo-500/20 transition-colors"
                >
                  <span>Start First Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/60 text-xs text-slate-500 flex items-center justify-between">
              <span>All user scans are encrypted and saved securely.</span>
            </div>
          </div>

          {/* Safety Information Card */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 pb-4 border-b border-slate-800/80 mb-5">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Safety Checklist</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xs font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-slate-200">No Upfront Payments</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Legitimate employers never ask candidates to pay for training, onboarding kits, or equipment upfront.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xs font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-slate-200">Official Communication</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Verify that recruiter emails match corporate domains rather than free Telegram or Gmail accounts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xs font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-slate-200">Confidential Identity</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Never submit SSN, bank accounts, or ID photocopies before a formal offer and company verification.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-indigo-400">
              <span className="flex items-center space-x-1">
                <Info className="w-3.5 h-3.5" />
                <span>Security Guidelines</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
