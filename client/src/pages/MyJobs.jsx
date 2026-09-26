import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building,
  Calendar,
  ArrowRight,
  Search,
  Bookmark,
  BookmarkCheck,
  Plus,
  Loader2,
  Inbox,
  Filter,
  FileWarning,
  Sparkles,
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { jobService } from '../services/jobService';

export const Reports = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await jobService.getUserJobs();
      if (res?.success && Array.isArray(res.jobs)) {
        setJobs(res.jobs);
      }
    } catch (err) {
      setError(err.customMessage || 'Failed to load reports.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleToggleSave = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await jobService.toggleSaveJob(id);
      if (res?.success) {
        setJobs((prev) =>
          prev.map((j) => (j._id === id ? { ...j, isSaved: res.isSaved } : j))
        );
      }
    } catch (err) {
      console.error('Save toggle error:', err);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      riskFilter === 'ALL' || job.classification === riskFilter;

    return matchesSearch && matchesFilter;
  });

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
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3.5 border-b border-[rgba(184,167,255,0.12)]">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[rgba(184,167,255,0.10)] border border-[rgba(184,167,255,0.24)] text-[#B8A7FF] text-xs font-semibold uppercase tracking-wider mb-2 shadow-[0_0_12px_rgba(184,167,255,0.12)]">
              <Sparkles className="w-3.5 h-3.5 text-[#7DD3FC]" />
              <span>Risk Intelligence Archive</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
              Recruitment Risk Reports
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
              Historical record of all job risk evaluations and explainable findings.
            </p>
          </div>

          <Link
            to="/analyze"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B8A7FF] to-[#7DD3FC] hover:from-[#C7B8FF] hover:to-[#93E0FF] text-[#070817] font-bold text-xs shadow-[0_0_15px_rgba(184,167,255,0.30)] transition-all self-start sm:self-auto shrink-0 hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Analyze New Job</span>
          </Link>
        </div>

        {/* Search & Filter Bar - Solid Elements */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
              <Search className="w-4 h-4 text-[#B9A7FF]" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search reports by job title or company..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B0E1E] border border-[rgba(185,167,255,0.20)] text-sm text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#B9A7FF] focus:ring-1 focus:ring-[#B9A7FF]/30 transition-all"
            />
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <Filter className="w-4 h-4 text-[#B9A7FF]" />
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-[#0B0E1E] border border-[rgba(185,167,255,0.20)] text-xs text-[#CBD5E1] focus:outline-none focus:border-[#B9A7FF] cursor-pointer"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="LOW_RISK">Low Risk</option>
              <option value="MEDIUM_RISK">Medium Risk</option>
              <option value="HIGH_RISK">High Risk</option>
            </select>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="py-16 text-center flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-7 h-7 text-[#B9A7FF] animate-spin" />
            <p className="text-xs text-[#94A3B8]">Loading analysis reports...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#111426] border border-[rgba(185,167,255,0.15)] flex flex-col items-center justify-center shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-[#171A32] border border-[rgba(185,167,255,0.15)] text-[#B9A7FF] flex items-center justify-center mb-3.5">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#F8FAFC] mb-1">No reports yet</h3>
            <p className="text-xs text-[#94A3B8] max-w-sm mb-5">
              {searchTerm || riskFilter !== 'ALL'
                ? 'No reports matched your search filters.'
                : 'Analyze your first job opportunity to generate a detailed risk report.'}
            </p>
            <Link
              to="/analyze"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#B9A7FF] hover:bg-[#C8BCFF] text-[#080A18] font-semibold text-xs shadow-md transition-all hover:scale-[1.01]"
            >
              <span>Analyze a Job Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredJobs.map((job) => {
              const badgeClass = getBadgeStyle(job.classification);

              return (
                <div
                  key={job._id}
                  onClick={() => navigate(`/jobs/${job._id}`)}
                  className="p-5 rounded-2xl bg-[#111426] hover:bg-[#171A32] border border-[rgba(185,167,255,0.15)] hover:border-[rgba(185,167,255,0.30)] transition-all shadow-md cursor-pointer group flex flex-col justify-between space-y-3.5"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase border ${badgeClass}`}
                        >
                          {job.classification.replace('_', ' ')}
                        </span>
                        <h3 className="text-sm font-bold text-[#F8FAFC] group-hover:text-[#B9A7FF] transition-colors mt-2">
                          {job.jobTitle}
                        </h3>
                        <p className="text-xs text-[#94A3B8] flex items-center space-x-1.5 mt-0.5">
                          <Building className="w-3.5 h-3.5 text-[#C8BCFF]" />
                          <span className="text-[#CBD5E1]">{job.company}</span>
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-lg font-extrabold text-[#F8FAFC]">
                          {job.riskScore}
                          <span className="text-[10px] text-[#94A3B8] font-normal">/100</span>
                        </div>
                        <span className="text-[8px] uppercase tracking-wider text-[#94A3B8] block">
                          Risk Score
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                      {job.summary}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-[rgba(185,167,255,0.10)] flex items-center justify-between text-xs text-[#94A3B8]">
                    <div className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#B9A7FF]" />
                      <span>
                        {new Date(job.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={(e) => handleToggleSave(e, job._id)}
                        className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                          job.isSaved
                            ? 'bg-[#171A32] text-[#B9A7FF] border-[rgba(185,167,255,0.30)]'
                            : 'bg-[#111426] text-[#94A3B8] border-[rgba(185,167,255,0.15)] hover:text-[#F8FAFC]'
                        }`}
                        title={job.isSaved ? 'Remove from saved' : 'Save opportunity'}
                      >
                        {job.isSaved ? (
                          <BookmarkCheck className="w-3.5 h-3.5 text-[#B9A7FF]" />
                        ) : (
                          <Bookmark className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <span className="inline-flex items-center space-x-1 text-[#B9A7FF] font-semibold group-hover:translate-x-0.5 transition-transform text-xs">
                        <span>View Report</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Reports;
