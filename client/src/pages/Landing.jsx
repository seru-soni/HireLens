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
    <div className="min-h-screen bg-[#0b0c0f] text-[#B8B6B0] flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[rgba(168,199,232,0.10)] border border-[rgba(168,199,232,0.22)] text-[#A8C7E8] text-xs font-semibold uppercase tracking-wider mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Explainable Job Posting Risk Assessment</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F2EFE8] leading-tight mb-6">
            Analyze before <br className="hidden sm:inline" />
            <span className="text-[#A8C7E8]">
              you apply.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-[#B8B6B0] mb-10 leading-relaxed font-normal">
            HireLens helps job seekers assess recruitment opportunities using explainable risk signals, recruiter verification, and evidence-based analysis.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-[#A8C7E8] hover:bg-[#BFD7F0] text-[#0d1218] font-semibold text-base shadow-lg transition-all"
            >
              <span>Analyze a Job</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#F2EFE8] font-semibold text-base border border-white/[0.10] transition-all"
            >
              <span>Create Account</span>
            </Link>
          </div>

          {/* Quick trust metrics */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.035)] border border-white/[0.08]">
              <div className="text-xs text-[#A8C7E8] font-semibold mb-1">01. URL Audit</div>
              <div className="text-sm font-medium text-[#F2EFE8]">Domain & DNS verification</div>
            </div>
            <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.035)] border border-white/[0.08]">
              <div className="text-xs text-[#A8C7E8] font-semibold mb-1">02. Recruiter Signals</div>
              <div className="text-sm font-medium text-[#F2EFE8]">Email & channel validation</div>
            </div>
            <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.035)] border border-white/[0.08]">
              <div className="text-xs text-[#A8C7E8] font-semibold mb-1">03. JD Language</div>
              <div className="text-sm font-medium text-[#F2EFE8]">Pressure tactics & flags</div>
            </div>
            <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.035)] border border-white/[0.08]">
              <div className="text-xs text-[#A8C7E8] font-semibold mb-1">04. Evidence Base</div>
              <div className="text-sm font-medium text-[#F2EFE8]">Explainable breakdown</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 border-t border-white/[0.08] bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#A8C7E8] text-xs font-semibold uppercase tracking-wider">Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F2EFE8] mt-2 mb-4">How It Works</h2>
            <p className="text-[#85858A] text-base">
              A transparent, structured assessment pipeline designed to surface actionable insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[rgba(255,255,255,0.035)] border border-white/[0.08] flex flex-col justify-between hover:border-white/[0.15] transition-colors">
              <div>
                <span className="text-4xl font-extrabold text-[#A8C7E8]/30 block mb-6">01</span>
                <h3 className="text-xl font-bold text-[#F2EFE8] mb-3">Submit a job</h3>
                <p className="text-[#85858A] text-sm leading-relaxed">
                  Paste the job posting URL, company recruiter details, or the raw job description into the analysis intake.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center space-x-2 text-xs text-[#A8C7E8]">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Instant parsing and extraction</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[rgba(255,255,255,0.035)] border border-white/[0.08] flex flex-col justify-between hover:border-white/[0.15] transition-colors">
              <div>
                <span className="text-4xl font-extrabold text-[#A8C7E8]/30 block mb-6">02</span>
                <h3 className="text-xl font-bold text-[#F2EFE8] mb-3">Analyze risk signals</h3>
                <p className="text-[#85858A] text-sm leading-relaxed">
                  HireLens inspects recruiter domains, contact requirements, compensation red flags, payment requests, and communication channels.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center space-x-2 text-xs text-[#A8C7E8]">
                <SearchCode className="w-3.5 h-3.5" />
                <span>Rule-based & heuristic heuristics</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[rgba(255,255,255,0.035)] border border-white/[0.08] flex flex-col justify-between hover:border-white/[0.15] transition-colors">
              <div>
                <span className="text-4xl font-extrabold text-[#A8C7E8]/30 block mb-6">03</span>
                <h3 className="text-xl font-bold text-[#F2EFE8] mb-3">Understand the assessment</h3>
                <p className="text-[#85858A] text-sm leading-relaxed">
                  Receive an explainable risk indicator score with concrete evidence points so you can make informed decisions before applying.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center space-x-2 text-xs text-[#A8C7E8]">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Evidence-backed transparency</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What HireLens Looks At Section */}
      <section id="signals" className="py-20 border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#A8C7E8] text-xs font-semibold uppercase tracking-wider">Signals</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F2EFE8] mt-2 mb-4">What HireLens Looks At</h2>
            <p className="text-[#85858A] text-base">
              A comprehensive inspection of structural, linguistic, and operational indicators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[rgba(255,255,255,0.025)] border border-white/[0.08]">
              <div className="w-10 h-10 rounded-lg bg-[rgba(168,199,232,0.10)] border border-[rgba(168,199,232,0.22)] flex items-center justify-center text-[#A8C7E8] mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-[#F2EFE8] mb-2">Recruiter Information</h4>
              <p className="text-sm text-[#85858A] leading-relaxed">
                Checks for generic public domains (e.g. Gmail/Telegram instead of corporate domains), impersonation flags, and unofficial contact handles.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[rgba(255,255,255,0.025)] border border-white/[0.08]">
              <div className="w-10 h-10 rounded-lg bg-[rgba(168,199,232,0.10)] border border-[rgba(168,199,232,0.22)] flex items-center justify-center text-[#A8C7E8] mb-4">
                <Building className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-[#F2EFE8] mb-2">Company Information</h4>
              <p className="text-sm text-[#85858A] leading-relaxed">
                Validates company registration signals, official domain correlation, and presence across legitimate business registries.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[rgba(255,255,255,0.025)] border border-white/[0.08]">
              <div className="w-10 h-10 rounded-lg bg-[rgba(168,199,232,0.10)] border border-[rgba(168,199,232,0.22)] flex items-center justify-center text-[#A8C7E8] mb-4">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-[#F2EFE8] mb-2">Application URLs</h4>
              <p className="text-sm text-[#85858A] leading-relaxed">
                Detects spoofed redirect links, brand-new domain registrations, deceptive URL shorteners, and unencrypted portals.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[rgba(255,255,255,0.025)] border border-white/[0.08]">
              <div className="w-10 h-10 rounded-lg bg-[rgba(168,199,232,0.10)] border border-[rgba(168,199,232,0.22)] flex items-center justify-center text-[#A8C7E8] mb-4">
                <SearchCode className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-[#F2EFE8] mb-2">Job Description Signals</h4>
              <p className="text-sm text-[#85858A] leading-relaxed">
                Identifies unrealistic salary-to-experience ratios, vague duties, copied text patterns, and unusual urgency tactics.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[rgba(255,255,255,0.025)] border border-white/[0.08]">
              <div className="w-10 h-10 rounded-lg bg-[rgba(168,199,232,0.10)] border border-[rgba(168,199,232,0.22)] flex items-center justify-center text-[#A8C7E8] mb-4">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-[#F2EFE8] mb-2">Suspicious Requests</h4>
              <p className="text-sm text-[#85858A] leading-relaxed">
                Flags requests for upfront equipment checks, banking info prior to an interview, crypto fees, or identity document uploads.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[rgba(255,255,255,0.025)] border border-white/[0.08]">
              <div className="w-10 h-10 rounded-lg bg-[rgba(168,199,232,0.10)] border border-[rgba(168,199,232,0.22)] flex items-center justify-center text-[#A8C7E8] mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-[#F2EFE8] mb-2">Privacy Safety</h4>
              <p className="text-sm text-[#85858A] leading-relaxed">
                Helps you safeguard sensitive personal and financial identifiers before transmitting your resume or background details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Capabilities Section */}
      <section id="roadmap" className="py-20 border-t border-white/[0.08] bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#A8C7E8] text-xs font-semibold uppercase tracking-wider">Evolution</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F2EFE8] mt-2 mb-4">Future Capabilities</h2>
            <p className="text-[#85858A] text-base">
              Upcoming milestones being integrated into the HireLens architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-[rgba(255,255,255,0.035)] border border-white/[0.08]">
              <BrainCircuit className="w-6 h-6 text-[#A8C7E8] mb-3" />
              <h4 className="text-base font-semibold text-[#F2EFE8] mb-2">Explainable Risk Analysis</h4>
              <p className="text-xs text-[#85858A] leading-relaxed">
                Breakdowns highlighting exact sentences and metadata triggers contributing to risk ratings.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[rgba(255,255,255,0.035)] border border-white/[0.08]">
              <UserCheck className="w-6 h-6 text-[#A8C7E8] mb-3" />
              <h4 className="text-base font-semibold text-[#F2EFE8] mb-2">Community Reporting</h4>
              <p className="text-xs text-[#85858A] leading-relaxed">
                Crowdsourced feedback loops to verify recruitment encounters and flag recurring patterns.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[rgba(255,255,255,0.035)] border border-white/[0.08]">
              <SearchCode className="w-6 h-6 text-[#A8C7E8] mb-3" />
              <h4 className="text-base font-semibold text-[#F2EFE8] mb-2">Automated Heuristics</h4>
              <p className="text-xs text-[#85858A] leading-relaxed">
                Multi-vector reasoning to spot sophisticated phishing and impersonation tactics.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[rgba(255,255,255,0.035)] border border-white/[0.08]">
              <Building className="w-6 h-6 text-[#A8C7E8] mb-3" />
              <h4 className="text-base font-semibold text-[#F2EFE8] mb-2">Company Verification</h4>
              <p className="text-xs text-[#85858A] leading-relaxed">
                Official recruiter directory matching and direct corporate domain authentication.
              </p>
            </div>
          </div>

          {/* CTA Box */}
          <div className="mt-16 p-8 md:p-12 rounded-2xl bg-[rgba(15,17,23,0.72)] backdrop-blur-md border border-white/[0.08] text-center max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#F2EFE8] mb-4">
              Take control of your job search security
            </h3>
            <p className="text-[#B8B6B0] text-sm sm:text-base max-w-xl mx-auto mb-8">
              Join HireLens today to start assessing job postings, tracking risk signals, and protecting your confidential data.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-[#A8C7E8] hover:bg-[#BFD7F0] text-[#0d1218] font-semibold text-base shadow-lg transition-all"
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

export default Landing;
