import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bookmark,
  Building,
  Calendar,
  ArrowRight,
  Inbox,
  Loader2,
  Trash2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { jobService } from '../services/jobService';

export const SavedJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      const res = await jobService.getUserJobs();
      if (res?.success && Array.isArray(res.jobs)) {
        setJobs(res.jobs.filter((j) => j.isSaved));
      }
    } catch (err) {
      console.error('Failed to load saved jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const handleUnsave = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await jobService.toggleSaveJob(id);
      if (res?.success) {
        setJobs((prev) => prev.filter((j) => j._id !== id));
      }
    } catch (err) {
      console.error('Failed to unsave:', err);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="pb-3.5 border-b border-[rgba(184,167,255,0.12)]">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[rgba(184,167,255,0.10)] border border-[rgba(184,167,255,0.24)] text-[#B8A7FF] text-xs font-semibold uppercase tracking-wider mb-2 shadow-[0_0_12px_rgba(184,167,255,0.12)]">
            <Sparkles className="w-3.5 h-3.5 text-[#7DD3FC]" />
            <span>Bookmarked Opportunities</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
            Saved Jobs
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Bookmarked job postings and risk analyses for future reference.
          </p>
        </div>

        {loading ? (
          <div className="py-16 text-center flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-7 h-7 text-[#B8A7FF] animate-spin" />
            <p className="text-xs text-[#94A3B8]">Loading saved opportunities...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#111426] border border-[rgba(185,167,255,0.15)] flex flex-col items-center justify-center shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-[#171A32] border border-[rgba(185,167,255,0.15)] text-[#B9A7FF] flex items-center justify-center mb-3.5">
              <Bookmark className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#F8FAFC] mb-1">No saved jobs</h3>
            <p className="text-xs text-[#94A3B8] max-w-sm mb-5">
              Jobs you save during analysis or from reports will appear here.
            </p>
            <Link
              to="/reports"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#B9A7FF] hover:bg-[#C8BCFF] text-[#080A18] font-semibold text-xs shadow-md transition-all hover:scale-[1.01]"
            >
              <span>Browse Analyzed Reports</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {jobs.map((job) => (
              <div
                key={job._id}
                onClick={() => navigate(`/jobs/${job._id}`)}
                className="p-5 rounded-2xl bg-[#111426] hover:bg-[#171A32] border border-[rgba(185,167,255,0.15)] hover:border-[rgba(185,167,255,0.30)] transition-all shadow-md cursor-pointer group flex flex-col justify-between space-y-3.5"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase border ${
                          job.classification === 'HIGH_RISK'
                            ? 'bg-rose-500/15 text-[#FB7185] border-rose-500/30'
                            : job.classification === 'MEDIUM_RISK'
                            ? 'bg-amber-500/15 text-[#FBBF24] border-amber-500/30'
                            : 'bg-emerald-500/15 text-[#34D399] border-emerald-500/30'
                        }`}
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

                    <div className="text-right">
                      <div className="text-lg font-extrabold text-[#F8FAFC]">{job.riskScore}/100</div>
                      <span className="text-[8px] uppercase tracking-wider text-[#94A3B8]">
                        Risk Score
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#94A3B8] mt-2.5 line-clamp-2 leading-relaxed">
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
                      onClick={(e) => handleUnsave(e, job._id)}
                      className="p-1.5 rounded-xl text-[#94A3B8] hover:text-[#FB7185] bg-[#171A32] hover:bg-[#1f2242] border border-[rgba(185,167,255,0.15)] hover:border-rose-500/30 transition-all cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <span className="inline-flex items-center space-x-1 text-[#B9A7FF] font-semibold group-hover:translate-x-0.5 transition-transform text-xs">
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SavedJobs;
