import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Building,
  Briefcase,
  Globe,
  Sparkles,
  Loader2,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { jobService } from '../services/jobService';

export const AnalyzeJob = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobUrl, setJobUrl] = useState(searchParams.get('url') || '');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sample template loader to help users test easily
  const handleLoadSample = (type) => {
    setError('');
    if (type === 'suspicious') {
      setJobTitle('Remote Data Entry Specialist / Virtual Assistant');
      setCompany('Global Express Careers Ltd');
      setJobUrl('http://bit.ly/quick-hire-online-jobs');
      setJobDescription(
        'Immediate opening! Work from home 2 hours daily and earn $8,500/month. No previous experience or resume required. Immediate start without an interview. Please contact hiring manager via Telegram (@fastrecruiter99) or WhatsApp at +1-987-555-0199. Selected candidates will receive a $3,500 cashier check to purchase home office equipment from our approved vendor before beginning training. Personal bank account details and ID card copy required upfront for company registration.'
      );
    } else {
      setJobTitle('Senior Full Stack Developer');
      setCompany('CloudScale Systems Inc.');
      setJobUrl('https://cloudscale.example.com/careers/senior-fullstack');
      setJobDescription(
        'CloudScale Systems is looking for a Senior Full Stack Developer (React & Node.js). 4+ years of experience with modern web architectures, REST APIs, and cloud services (AWS/GCP). Competitive salary ($130k-$160k), 401(k) matching, health insurance, and 4 weeks PTO. 3-stage interview process including recruiter screen, technical architecture discussion, and team fit. Applications must be submitted through our verified portal with corporate email communications.'
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!jobTitle.trim()) {
      setError('Please enter a job title.');
      return;
    }

    if (!company.trim()) {
      setError('Please enter the company name.');
      return;
    }

    if (!jobDescription.trim() || jobDescription.trim().length < 20) {
      setError('Please provide a detailed job description (at least 20 characters).');
      return;
    }

    try {
      setLoading(true);
      const response = await jobService.analyzeJob({
        jobTitle: jobTitle.trim(),
        company: company.trim(),
        jobDescription: jobDescription.trim(),
        jobUrl: jobUrl.trim(),
      });

      if (response?.success && response?.analysis?._id) {
        navigate(`/jobs/${response.analysis._id}`);
      } else {
        setError('Analysis completed but failed to retrieve the report.');
      }
    } catch (err) {
      setError(
        err.customMessage ||
          err.response?.data?.message ||
          'Failed to analyze job posting. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Page Title */}
        <div className="pb-3.5 border-b border-[rgba(185,167,255,0.12)]">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[rgba(185,167,255,0.10)] border border-[rgba(185,167,255,0.24)] text-[#B9A7FF] text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-[0_0_15px_rgba(185,167,255,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#B9A7FF]" />
            <span>AI Risk Auditor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
            Analyze Job Opportunity
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Evaluate compensation plausibility, domain integrity, and recruitment fraud signals before you apply.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-xl bg-[rgba(244,63,94,0.12)] border border-[rgba(244,63,94,0.28)] text-[#FB7185] flex items-center space-x-3 text-sm shadow-[0_0_15px_rgba(244,63,94,0.15)]">
            <AlertCircle className="w-5 h-5 text-[#FB7185] shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Quick Sample Buttons - Solid Panel */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#111426] border border-[rgba(185,167,255,0.15)] text-xs shadow-sm">
          <span className="text-[#CBD5E1] font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B9A7FF]" />
            <span>Test with pre-configured samples:</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleLoadSample('suspicious')}
              className="px-3 py-1.5 rounded-lg bg-[#171A32] hover:bg-[#1f2242] text-[#FB7185] border border-rose-500/20 transition-all cursor-pointer"
            >
              Suspicious Example
            </button>
            <button
              type="button"
              onClick={() => handleLoadSample('legitimate')}
              className="px-3 py-1.5 rounded-lg bg-[#171A32] hover:bg-[#1f2242] text-[#34D399] border border-emerald-500/20 transition-all cursor-pointer"
            >
              Legitimate Example
            </button>
          </div>
        </div>

        {/* Clean Solid SaaS Analysis Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-[#111426] border border-[rgba(185,167,255,0.15)] shadow-xl space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Job Title */}
            <div>
              <label htmlFor="job-title" className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-1.5">
                Job Title <span className="text-[#FB7185]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                  <Briefcase className="w-4 h-4 text-[#B9A7FF]" />
                </div>
                <input
                  id="job-title"
                  type="text"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B0E1E] border border-[rgba(185,167,255,0.20)] text-sm text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#B9A7FF] focus:ring-1 focus:ring-[#B9A7FF]/30 transition-all"
                />
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="company" className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-1.5">
                Company <span className="text-[#FB7185]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                  <Building className="w-4 h-4 text-[#C8BCFF]" />
                </div>
                <input
                  id="company"
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Acme Corp, Google"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B0E1E] border border-[rgba(185,167,255,0.20)] text-sm text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#B9A7FF] focus:ring-1 focus:ring-[#B9A7FF]/30 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Job Posting URL */}
          <div>
            <label htmlFor="job-url" className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-1.5">
              Job Posting URL <span className="text-[#94A3B8] normal-case text-xs">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                <Globe className="w-4 h-4 text-[#B9A7FF]" />
              </div>
              <input
                id="job-url"
                type="url"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                placeholder="https://company.com/careers/job-id or recruiter link"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B0E1E] border border-[rgba(185,167,255,0.20)] text-sm text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#B9A7FF] focus:ring-1 focus:ring-[#B9A7FF]/30 transition-all"
              />
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label htmlFor="job-description" className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-1.5">
              Job Description <span className="text-[#FB7185]">*</span>
            </label>
            <textarea
              id="job-description"
              required
              rows={7}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job posting text, recruiter messages, requirements, and salary details here..."
              className="w-full p-4 rounded-xl bg-[#0B0E1E] border border-[rgba(185,167,255,0.20)] text-sm text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#B9A7FF] focus:ring-1 focus:ring-[#B9A7FF]/30 transition-all font-mono leading-relaxed resize-y"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-3 border-t border-[rgba(185,167,255,0.12)] flex items-center justify-between">
            <span className="text-xs text-[#94A3B8]">
              Instant multi-signal scan via Gemini API
            </span>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center space-x-2 px-7 py-3 rounded-xl bg-[#B9A7FF] hover:bg-[#C8BCFF] text-[#080A18] font-bold text-sm shadow-md disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer hover:scale-[1.01]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Evaluating Risk Signals...</span>
                </>
              ) : (
                <>
                  <span>Analyze Job</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AnalyzeJob;
