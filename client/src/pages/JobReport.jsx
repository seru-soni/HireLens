import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Trash2,
  Calendar,
  Building,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Loader2,
  Share2,
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { jobService } from '../services/jobService';

export const JobReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [savingBookmark, setSavingBookmark] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const res = await jobService.getJobById(id);
        if (res?.success && res?.job) {
          setJob(res.job);
          setIsSaved(!!res.job.isSaved);
        } else {
          setError('Analysis report could not be found.');
        }
      } catch (err) {
        setError(err.customMessage || 'Failed to load report.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReport();
    }
  }, [id]);

  const handleToggleSave = async () => {
    try {
      setSavingBookmark(true);
      const res = await jobService.toggleSaveJob(id);
      if (res?.success) {
        setIsSaved(res.isSaved);
      }
    } catch (err) {
      console.error('Failed to toggle save:', err);
    } finally {
      setSavingBookmark(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this analysis report?')) return;
    try {
      await jobService.deleteJob(id);
      navigate('/reports');
    } catch (err) {
      alert(err.customMessage || 'Failed to delete report.');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="py-24 text-center flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-10 h-10 text-[#B8A7FF] animate-spin" />
          <p className="text-sm text-[#94A3B8]">Loading risk assessment report...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !job) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[rgba(244,63,94,0.12)] border border-[rgba(244,63,94,0.25)] text-[#FB7185] flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(244,63,94,0.2)]">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-[#F8FAFC]">Report Not Found</h2>
          <p className="text-sm text-[#94A3B8]">{error || 'This job report does not exist or has been removed.'}</p>
          <Link
            to="/reports"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[rgba(184,167,255,0.10)] hover:bg-[rgba(184,167,255,0.18)] text-[#F8FAFC] text-xs font-semibold border border-[rgba(184,167,255,0.20)] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Reports</span>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const getRiskConfig = (classification) => {
    switch (classification) {
      case 'HIGH_RISK':
        return {
          label: 'HIGH RISK',
          badgeBg: 'bg-[rgba(244,63,94,0.14)] text-[#FB7185] border-[rgba(244,63,94,0.30)] shadow-[0_0_12px_rgba(244,63,94,0.25)]',
          gaugeBg: 'text-[#FB7185]',
          borderColor: 'border-[rgba(244,63,94,0.28)]',
          icon: ShieldAlert,
        };
      case 'MEDIUM_RISK':
        return {
          label: 'MEDIUM RISK',
          badgeBg: 'bg-[rgba(251,191,36,0.14)] text-[#FBBF24] border-[rgba(251,191,36,0.30)] shadow-[0_0_12px_rgba(251,191,36,0.20)]',
          gaugeBg: 'text-[#FBBF24]',
          borderColor: 'border-[rgba(251,191,36,0.28)]',
          icon: AlertTriangle,
        };
      default:
        return {
          label: 'LOW RISK',
          badgeBg: 'bg-[rgba(52,211,153,0.14)] text-[#34D399] border-[rgba(52,211,153,0.30)] shadow-[0_0_12px_rgba(52,211,153,0.25)]',
          gaugeBg: 'text-[#34D399]',
          borderColor: 'border-[rgba(52,211,153,0.28)]',
          icon: ShieldCheck,
        };
    }
  };

  const riskConfig = getRiskConfig(job.classification);
  const StatusIcon = riskConfig.icon;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Navigation & Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3.5 border-b border-[rgba(184,167,255,0.12)]">
          <Link
            to="/reports"
            className="inline-flex items-center space-x-2 text-xs font-medium text-[#94A3B8] hover:text-[#B8A7FF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Reports</span>
          </Link>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={handleShare}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[rgba(184,167,255,0.06)] hover:bg-[rgba(184,167,255,0.12)] text-[#CBD5E1] text-xs font-medium border border-[rgba(184,167,255,0.14)] transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#B8A7FF]" />
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={handleToggleSave}
              disabled={savingBookmark}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                isSaved
                  ? 'bg-[rgba(184,167,255,0.18)] text-[#B8A7FF] border-[rgba(184,167,255,0.35)] shadow-[0_0_12px_rgba(184,167,255,0.25)]'
                  : 'bg-[rgba(184,167,255,0.06)] hover:bg-[rgba(184,167,255,0.12)] text-[#CBD5E1] border-[rgba(184,167,255,0.14)]'
              }`}
            >
              {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-[#B8A7FF]" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-xl text-[#94A3B8] hover:text-[#FB7185] hover:bg-[rgba(244,63,94,0.10)] border border-[rgba(184,167,255,0.12)] hover:border-[rgba(244,63,94,0.25)] transition-all cursor-pointer"
              title="Delete Report"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 1. Risk Assessment Hero Card - Solid Panel */}
        <div className={`p-6 sm:p-7 rounded-2xl bg-[#111426] border ${riskConfig.borderColor} shadow-xl relative overflow-hidden`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2.5 max-w-xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border mb-1 bg-[#171A32] border-[rgba(185,167,255,0.20)] text-[#B9A7FF]">
                <Sparkles className="w-3 h-3 text-[#B9A7FF]" />
                <span>Job Risk Assessment</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
                {job.jobTitle}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#94A3B8]">
                <div className="flex items-center space-x-1.5">
                  <Building className="w-4 h-4 text-[#C8BCFF]" />
                  <span className="font-semibold text-[#F8FAFC]">{job.company}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-[#B9A7FF]" />
                  <span>
                    {new Date(job.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                {job.jobUrl && (
                  <a
                    href={job.jobUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 text-[#B9A7FF] hover:text-[#C8BCFF] hover:underline transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Posting URL</span>
                  </a>
                )}
              </div>
            </div>

            {/* Risk Score Gauge */}
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-[#0B0E1E] border border-[rgba(185,167,255,0.18)] shrink-0 shadow-sm">
              <div className="text-right">
                <div className="text-[10px] uppercase font-semibold text-[#94A3B8] tracking-wider">
                  Classification
                </div>
                <div className={`text-xs font-extrabold px-2.5 py-0.5 rounded-md inline-block border mt-1 ${riskConfig.badgeBg}`}>
                  {riskConfig.label}
                </div>
              </div>

              <div className="w-14 h-14 rounded-xl bg-[#171A32] border border-[rgba(185,167,255,0.18)] flex flex-col items-center justify-center">
                <span className={`text-xl font-black ${riskConfig.gaugeBg}`}>
                  {job.riskScore}
                </span>
                <span className="text-[8px] text-[#94A3B8] font-semibold uppercase">/ 100</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Executive Summary / Reasons - Solid Panel */}
        <section className="p-5 sm:p-6 rounded-2xl bg-[#111426] border border-[rgba(185,167,255,0.15)] shadow-lg space-y-2.5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#B9A7FF] flex items-center space-x-2">
            <StatusIcon className={`w-4 h-4 ${riskConfig.gaugeBg}`} />
            <span>Executive Risk Assessment</span>
          </h2>
          <p className="text-[#CBD5E1] text-sm leading-relaxed whitespace-pre-line">
            {job.summary}
          </p>
        </section>

        {/* 3. Key Risk Signals */}
        {job.riskSignals && job.riskSignals.length > 0 && (
          <section className="space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FB7185]" />
              <h2 className="text-sm font-bold text-[#F8FAFC]">
                Detected Risk Signals ({job.riskSignals.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {job.riskSignals.map((signal, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#111426] border border-[rgba(185,167,255,0.15)] space-y-2.5 shadow-sm hover:border-[rgba(185,167,255,0.28)] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#B9A7FF] uppercase tracking-wider">
                      {signal.category}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase border ${
                        signal.severity === 'HIGH'
                          ? 'bg-rose-500/15 text-[#FB7185] border-rose-500/30'
                          : signal.severity === 'MEDIUM'
                          ? 'bg-amber-500/15 text-[#FBBF24] border-amber-500/30'
                          : 'bg-[#171A32] text-[#CBD5E1] border-[rgba(185,167,255,0.18)]'
                      }`}
                    >
                      {signal.severity}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-[#F8FAFC]">{signal.finding}</p>

                  {signal.evidence && (
                    <div className="p-2.5 rounded-xl bg-[#0B0E1E] border border-[rgba(185,167,255,0.12)] text-xs text-[#94A3B8] font-mono leading-relaxed">
                      <span className="text-[#B9A7FF] block text-[9px] uppercase font-sans mb-0.5 font-semibold">
                        Observed Evidence:
                      </span>
                      "{signal.evidence}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. Positive Signals / Indicators */}
        {job.positiveSignals && job.positiveSignals.length > 0 && (
          <section className="space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#34D399]" />
              <h2 className="text-sm font-bold text-[#F8FAFC]">
                Positive Signals & Legitimate Indicators
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {job.positiveSignals.map((pos, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#111426] border border-emerald-500/20 flex items-start space-x-3 shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-[#34D399] block mb-0.5">
                      {pos.category}
                    </span>
                    <p className="text-xs text-[#CBD5E1] leading-relaxed">{pos.finding}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Recommendations - Solid Panel */}
        {job.recommendations && job.recommendations.length > 0 && (
          <section className="p-5 sm:p-6 rounded-2xl bg-[#111426] border border-[rgba(185,167,255,0.15)] shadow-lg space-y-3.5">
            <h2 className="text-sm font-bold text-[#F8FAFC] flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#B9A7FF]" />
              <span>Recommended Pre-Application Steps</span>
            </h2>

            <ul className="space-y-2">
              {job.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                  <span className="w-5 h-5 rounded-lg bg-[#171A32] border border-[rgba(185,167,255,0.22)] text-[#B9A7FF] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Original Job Description Text - Solid Panel */}
        <details className="p-4 sm:p-5 rounded-2xl bg-[#111426] border border-[rgba(185,167,255,0.15)] group shadow-sm">
          <summary className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] cursor-pointer hover:text-[#F8FAFC] transition-colors list-none flex items-center justify-between">
            <span>Submitted Job Description</span>
            <span className="text-[#B9A7FF] text-xs font-sans capitalize group-open:hidden">
              (Expand)
            </span>
            <span className="text-[#B9A7FF] text-xs font-sans capitalize hidden group-open:inline">
              (Collapse)
            </span>
          </summary>
          <div className="mt-3 pt-3 border-t border-[rgba(185,167,255,0.10)] text-xs text-[#94A3B8] whitespace-pre-wrap font-mono leading-relaxed max-h-80 overflow-y-auto">
            {job.jobDescription}
          </div>
        </details>
      </div>
    </DashboardLayout>
  );
};

export default JobReport;
