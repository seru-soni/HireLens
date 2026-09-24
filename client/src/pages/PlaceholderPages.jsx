import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  SearchCode,
  FileWarning,
  Bookmark,
  Settings as SettingsIcon,
  Briefcase,
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';

export const PlaceholderPage = ({ title, description, icon: Icon = Sparkles }) => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <Clock className="w-3.5 h-3.5" />
          <span>Roadmap Integration • Coming Soon</span>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-6">
          <Icon className="w-8 h-8" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">{title}</h1>
        <p className="text-slate-400 text-base max-w-xl mx-auto mb-8 leading-relaxed">
          {description}
        </p>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-left max-w-md mx-auto mb-8 space-y-3">
          <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Planned Architecture:</h4>
          <div className="flex items-center space-x-2 text-xs text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            <span>RESTful analysis hooks for rule and ML engine</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            <span>Persistent history stored in MongoDB Atlas</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            <span>Community validation and recruiter domain matching</span>
          </div>
        </div>

        <Link
          to="/dashboard"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
        >
          <span>Back to Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </DashboardLayout>
  );
};

export const AnalyzeJobPage = () => (
  <PlaceholderPage
    title="Job Risk Analysis Engine"
    description="The automated rule-based and NLP risk engine will parse recruiter domains, compensation flags, and application URLs here."
    icon={SearchCode}
  />
);

export const MyJobsPage = () => (
  <PlaceholderPage
    title="My Analyzed Jobs"
    description="Track all previous job analysis reports, risk score evolutions, and exportable findings."
    icon={Briefcase}
  />
);

export const ReportsPage = () => (
  <PlaceholderPage
    title="Recruitment Risk Reports"
    description="Submit and browse verified evidence regarding impersonated companies and fraudulent recruiters."
    icon={FileWarning}
  />
);

export const SavedJobsPage = () => (
  <PlaceholderPage
    title="Saved Opportunities"
    description="Bookmark vetted job opportunities and monitor future risk signal updates."
    icon={Bookmark}
  />
);

export const SettingsPage = () => (
  <PlaceholderPage
    title="Platform Settings"
    description="Configure notification preferences, scan sensitivity, and security options."
    icon={SettingsIcon}
  />
);
