import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  Sparkles,
  Inbox,
  Briefcase,
  Loader2,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { jobService } from '../services/jobService';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobUrlInput, setJobUrlInput] = useState('');
  const [statsData, setStatsData] = useState({
    jobsAnalysed: 0,
    reportsSubmitted: 0,
    highRiskJobs: 0,
    savedJobs: 0,
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const res = await jobService.getDashboardStats();
        if (res?.success) {
          setStatsData(res.stats || {});
          setRecentJobs(res.recentJobs || []);
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleAnalyzeSubmit = (e) => {
    e.preventDefault();
    if (jobUrlInput.trim()) {
      navigate(`/analyze?url=${encodeURIComponent(jobUrlInput.trim())}`);
    } else {
      navigate('/analyze');
    }
  };

  const getBadgeStyle = (classification) => {
    switch (classification) {
      case 'HIGH_RISK':
        return 'bg-[rgba(244,63,94,0.14)] text-[#FB7185] border-[rgba(244,63,94,0.30)] shadow-[0_0_10px_rgba(244,63,94,0.2)]';
      case 'MEDIUM_RISK':
        return 'bg-[rgba(251,191,36,0.14)] text-[#FBBF24] border-[rgba(251,191,36,0.30)] shadow-[0_0_10px_rgba(251,191,36,0.15)]';
      default:
        return 'bg-[rgba(52,211,153,0.14)] text-[#34D399] border-[rgba(52,211,153,0.30)] shadow-[0_0_10px_rgba(52,211,153,0.2)]';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        {/* Hero Section with clean entrance animation */}
        <div className="space-y-3 animate-dashboard-fade-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[rgba(184,161,255,0.10)] border border-[rgba(184,161,255,0.24)] text-[#B8A1FF] text-xs font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(184,161,255,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#B8A1FF]" />
            <span>JOB RISK INTELLIGENCE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight flex flex-wrap" aria-label="Analyze before you apply.">
            {"Analyze before you apply.".split("").map((char, index) => (
              char === " " ? (
                <span key={index} className="hero-letter-space">&nbsp;</span>
              ) : (
                <span
                  key={index}
                  className="hero-letter-char text-[#F8FAFC] drop-shadow-[0_0_12px_rgba(184,161,255,0.35)]"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  {char}
                </span>
              )
            ))}
          </h1>

          {/* Two Short Supporting Points */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-[#94A3B8] pt-1">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8A1FF] shadow-[0_0_6px_#B8A1FF]" />
              <span className="text-[#CBD5E1]">Check the role before you commit.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8CCFF] shadow-[0_0_6px_#D8CCFF]" />
              <span className="text-[#CBD5E1]">Understand the signals before you apply.</span>
            </div>
          </div>
        </div>

        {/* Real MongoDB Statistics Carousel */}
        <section aria-label="Dashboard Overview Statistics" className="animate-dashboard-fade-2">
          <DashboardStats statsData={statsData} />
        </section>

        {/* Analyze Job Posting Entry Point - Solid Clean Panel */}
        <section aria-label="Analyze Job Posting" className="animate-dashboard-fade-3">
          <div className="relative overflow-hidden rounded-2xl bg-[#111321] p-6 sm:p-7 border border-[rgba(184,161,255,0.15)] shadow-lg transition-all hover:border-[rgba(184,161,255,0.28)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_15px_rgba(184,161,255,0.12)]">
            <div className="max-w-2xl relative z-10">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#B8A1FF]" />
                <h2 className="text-lg sm:text-xl font-bold text-[#F8FAFC]">
                  Quick Job Analysis
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#94A3B8] mb-5 leading-relaxed">
                Paste a job posting link or role title to immediately evaluate recruiter and compensation risk signals.
              </p>

              <form onSubmit={handleAnalyzeSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                    <Search className="w-4 h-4 text-[#B8A1FF]" />
                  </div>
                  <input
                    type="text"
                    value={jobUrlInput}
                    onChange={(e) => setJobUrlInput(e.target.value)}
                    placeholder="Paste job posting URL or enter role..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B0D1B] border border-[rgba(184,161,255,0.20)] text-sm text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#B8A1FF] focus:ring-1 focus:ring-[#B8A1FF]/30 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-[#B8A1FF] hover:bg-[#D8CCFF] text-[#080A14] font-semibold text-sm shadow-md transition-all shrink-0 cursor-pointer hover:scale-[1.01]"
                >
                  <span>Analyze Job</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Recent Analyses Section - Solid Clean Panel */}
        <section aria-label="Recent Activity" className="animate-dashboard-fade-4">
          <div className="p-6 rounded-2xl bg-[#111321] border border-[rgba(184,161,255,0.15)] shadow-lg">
            <div className="flex items-center justify-between pb-3.5 border-b border-[rgba(184,161,255,0.12)] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8A1FF]" />
                <h3 className="text-sm font-bold text-[#F8FAFC]">Recent Analyses</h3>
              </div>
              {recentJobs.length > 0 && (
                <Link
                  to="/reports"
                  className="text-xs font-semibold text-[#B8A1FF] hover:text-[#D8CCFF] flex items-center space-x-1 transition-colors"
                >
                  <span>View All Reports</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            {loading ? (
              <div className="py-10 text-center flex flex-col items-center justify-center">
                <Loader2 className="w-5 h-5 text-[#B9A7FF] animate-spin mb-2" />
                <p className="text-xs text-[#94A3B8]">Loading activity data...</p>
              </div>
            ) : recentJobs.length === 0 ? (
              <div className="py-10 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-2xl bg-[#171A32] border border-[rgba(185,167,255,0.15)] flex items-center justify-center text-[#B9A7FF] mb-3">
                  <Inbox className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-semibold text-[#F8FAFC] mb-1">No analysis records yet</h4>
                <p className="text-xs text-[#94A3B8] max-w-sm mb-4">
                  Analyze your first job posting with Gemini to view explainable risk breakdowns.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/analyze')}
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#080A18] bg-[#B9A7FF] hover:bg-[#C8BCFF] px-4 py-2 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <span>Analyze Job</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[rgba(185,167,255,0.08)]">
                {recentJobs.map((job) => {
                  const badgeClass = getBadgeStyle(job.classification);
                  return (
                    <div
                      key={job._id}
                      onClick={() => navigate(`/jobs/${job._id}`)}
                      className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#171A32] px-3 rounded-xl transition-all cursor-pointer group"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-[#171A32] border border-[rgba(185,167,255,0.18)] flex items-center justify-center text-[#B9A7FF] shrink-0 group-hover:border-[#B9A7FF] transition-colors">
                          <Briefcase className="w-4 h-4 text-[#B9A7FF]" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm font-semibold text-[#F8FAFC] group-hover:text-[#B9A7FF] transition-colors">
                              {job.jobTitle}
                            </h4>
                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase border ${badgeClass}`}
                            >
                              {job.classification.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-xs text-[#94A3B8] flex items-center space-x-1.5 mt-0.5">
                            <span className="text-[#CBD5E1]">{job.company}</span>
                            <span>•</span>
                            <span>
                              {new Date(job.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-extrabold text-[#F8FAFC]">
                            {job.riskScore} <span className="text-[10px] text-[#94A3B8]">/100</span>
                          </div>
                          <span className="text-[9px] text-[#94A3B8] uppercase tracking-wider block">
                            Risk Score
                          </span>
                        </div>

                        <span className="p-1.5 rounded-lg bg-[#171A32] border border-[rgba(185,167,255,0.12)] text-[#94A3B8] group-hover:text-[#080A18] group-hover:bg-[#B9A7FF] group-hover:border-[#B9A7FF] transition-all">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
