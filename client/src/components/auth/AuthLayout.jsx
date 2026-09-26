import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Check, Sparkles } from 'lucide-react';
import AuthImageCarousel from './AuthImageCarousel';
import './Auth.css';

export const AuthLayout = ({
  children,
  heroSubtitle = 'Identify potential risks in job postings and make more informed application decisions.',
  features = ['Job posting analysis', 'Risk indicators', 'Personal reports'],
}) => {
  return (
    <div className="auth-page-wrapper">
      {/* Blended Career Image Backdrop Layer (occupies 58% width and fades softly into dark neutral background) */}
      <div className="auth-blended-visual-layer" aria-hidden="true">
        <AuthImageCarousel />
        {/* Soft horizontal multi-stop fade overlay */}
        <div className="auth-image-horizontal-fade" />
        {/* Top/bottom subtle vignettes */}
        <div className="auth-image-vignette-overlay" />
      </div>

      {/* Main Responsive Grid Layout */}
      <div className="auth-content-grid">
        {/* Left Marketing & Value Proposition Column */}
        <div className="auth-left-brand-col">
          <Link to="/" className="auth-brand-logo-group">
            <div className="auth-brand-icon-box">
              <ShieldCheck className="w-5 h-5 text-[#A8C7E8]" />
            </div>
            <span className="auth-brand-text">
              Hire<span className="auth-brand-text-accent">Lens</span>
            </span>
          </Link>

          <div className="auth-left-text-block">
            <div className="auth-visual-badge">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Job Risk Intelligence</span>
            </div>

            <h1 className="auth-visual-headline">
              Analyze before <br />
              <span className="auth-visual-headline-accent">you apply.</span>
            </h1>

            <p className="auth-visual-subtext">{heroSubtitle}</p>

            <div className="auth-visual-features">
              {features.map((feature, idx) => (
                <div key={idx} className="auth-visual-feature-item">
                  <div className="auth-visual-feature-check">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="auth-visual-footer">
            <span>AI-POWERED JOB OPPORTUNITY RISK AUDITOR</span>
          </div>
        </div>

        {/* Right Authentication Form Column */}
        <div className="auth-right-form-col">
          {/* Mobile-only header banner */}
          <div className="auth-mobile-header">
            <Link to="/" className="inline-flex items-center space-x-2 mb-1.5">
              <div className="w-7 h-7 rounded-lg bg-[#15171d] border border-white/10 flex items-center justify-center text-[#A8C7E8]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-[#F2EFE8] tracking-tight">
                Hire<span className="text-[#A8C7E8]">Lens</span>
              </span>
            </Link>
            <p className="text-xs text-[#B8B6B0]">
              Analyze before you apply
            </p>
          </div>

          <div className="auth-card-anchor">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
