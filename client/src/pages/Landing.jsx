import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  SearchCode,
  FileCheck2,
  Lock,
  Globe,
  UserCheck,
  BrainCircuit,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Building,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Explainable Job Posting Risk Assessment</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
            Identify suspicious job opportunities <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-200">
              before you apply.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed font-normal">
            HireLens helps job seekers assess recruitment opportunities using explainable risk signals, recruiter verification, and evidence-based analysis.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
            >
              <span>Analyze a Job</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-base border border-slate-700 transition-all"
            >
              <span>Create Account</span>
            </Link>
          </div>

          {/* Quick trust metrics */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs text-indigo-400 font-semibold mb-1">01. URL Audit</div>
              <div className="text-sm font-medium text-slate-200">Domain & DNS verification</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs text-indigo-400 font-semibold mb-1">02. Recruiter Signals</div>
              <div className="text-sm font-medium text-slate-200">Email & channel validation</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs text-indigo-400 font-semibold mb-1">03. JD Language</div>
              <div className="text-sm font-medium text-slate-200">Pressure tactics & flags</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs text-indigo-400 font-semibold mb-1">04. Evidence Base</div>
              <div className="text-sm font-medium text-slate-200">Explainable breakdown</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 border-t border-slate-800/80 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-indigo-400 text-xs font-semibold uppercase tracking-wider">Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">How It Works</h2>
            <p className="text-slate-400 text-base">
              A transparent, structured assessment pipeline designed to surface actionable insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div>
                <span className="text-4xl font-extrabold text-indigo-500/30 block mb-6">01</span>
                <h3 className="text-xl font-bold text-white mb-3">Submit a job</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Paste the job posting URL, company recruiter details, or the raw job description into the analysis intake.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center space-x-2 text-xs text-indigo-400">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Instant parsing and extraction</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div>
                <span className="text-4xl font-extrabold text-indigo-500/30 block mb-6">02</span>
                <h3 className="text-xl font-bold text-white mb-3">Analyze risk signals</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  HireLens inspects recruiter domains, contact requirements, compensation red flags, payment requests, and communication channels.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center space-x-2 text-xs text-indigo-400">
                <SearchCode className="w-3.5 h-3.5" />
                <span>Rule-based & heuristic heuristics</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div>
                <span className="text-4xl font-extrabold text-indigo-500/30 block mb-6">03</span>
                <h3 className="text-xl font-bold text-white mb-3">Understand the assessment</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Receive an explainable risk indicator score with concrete evidence points so you can make informed decisions before applying.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center space-x-2 text-xs text-indigo-400">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Evidence-backed transparency</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What HireLens Looks At Section */}
      <section id="signals" className="py-20 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-indigo-400 text-xs font-semibold uppercase tracking-wider">Signals</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">What HireLens Looks At</h2>
            <p className="text-slate-400 text-base">
              A comprehensive inspection of structural, linguistic, and operational indicators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white mb-2">Recruiter Information</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Checks for generic public domains (e.g. Gmail/Telegram instead of corporate domains), impersonation flags, and unofficial contact handles.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                <Building className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white mb-2">Company Information</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Validates company registration signals, official domain correlation, and presence across legitimate business registries.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white mb-2">Application URLs</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Detects spoofed redirect links, brand-new domain registrations, deceptive URL shorteners, and unencrypted portals.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                <SearchCode className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white mb-2">Job Description Signals</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Identifies unrealistic salary-to-experience ratios, vague duties, copied text patterns, and unusual urgency tactics.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white mb-2">Suspicious Requests</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Flags requests for upfront equipment checks, banking info prior to an interview, crypto fees, or identity document uploads.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white mb-2">Privacy Safety</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Helps you safeguard sensitive personal and financial identifiers before transmitting your resume or background details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Capabilities Section */}
      <section id="roadmap" className="py-20 border-t border-slate-800/80 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-indigo-400 text-xs font-semibold uppercase tracking-wider">Evolution</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">Future Capabilities</h2>
            <p className="text-slate-400 text-base">
              Upcoming milestones being integrated into the HireLens architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800/90">
              <BrainCircuit className="w-6 h-6 text-indigo-400 mb-3" />
              <h4 className="text-base font-semibold text-white mb-2">Explainable Risk Analysis</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Breakdowns highlighting exact sentences and metadata triggers contributing to risk ratings.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800/90">
              <UserCheck className="w-6 h-6 text-indigo-400 mb-3" />
              <h4 className="text-base font-semibold text-white mb-2">Community Reporting</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Crowdsourced feedback loops to verify recruitment encounters and flag recurring patterns.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800/90">
              <SearchCode className="w-6 h-6 text-indigo-400 mb-3" />
              <h4 className="text-base font-semibold text-white mb-2">Machine Learning</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Deep NLP classification models trained to spot sophisticated phishing and fraud vectors.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800/90">
              <Building className="w-6 h-6 text-indigo-400 mb-3" />
              <h4 className="text-base font-semibold text-white mb-2">Company Verification</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Official recruiter directory matching and direct corporate domain authentication.
              </p>
            </div>
          </div>

          {/* CTA Box */}
          <div className="mt-16 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/20 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Take control of your job search security
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
              Join HireLens today to start assessing job postings, tracking risk signals, and protecting your confidential data.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
