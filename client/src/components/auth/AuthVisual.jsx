import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Check, Sparkles } from 'lucide-react';
import AuthImageCarousel from './AuthImageCarousel';
import './Auth.css';

export const AuthVisual = ({
  title = 'Analyze before you apply.',
  subtitle = 'Identify potential risks in job postings and make more informed application decisions.',
  features = ['Job posting analysis', 'Risk indicators', 'Personal reports'],
}) => {
  return (
    <div className="auth-visual-section">
      {/* Background image crossfade carousel with slow zoom animation */}
      <AuthImageCarousel />

      {/* Brand and Value Proposition Overlaid on Image */}
      <div className="auth-visual-content">
        <Link to="/" className="auth-brand-logo-group">
          <div className="auth-brand-icon-box">
            <ShieldCheck className="w-5 h-5 text-[#A8C7E8]" />
          </div>
          <span className="auth-brand-text">
            Hire<span className="auth-brand-text-accent">Lens</span>
          </span>
        </Link>

        <div className="auth-visual-text-block">
          <div className="auth-visual-badge">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Job Risk Intelligence</span>
          </div>

          <h1 className="auth-visual-headline">
            Analyze before <br />
            <span className="auth-visual-headline-accent">you apply.</span>
          </h1>

          <p className="auth-visual-subtext">{subtitle}</p>

          <div className="auth-visual-features">
            {features.map((feature, idx) => (
              <div key={idx} className="auth-visual-feature-item">
                <div className="auth-visual-feature-check">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security watermark footer */}
        <div className="auth-visual-footer">
          <span>AI-POWERED JOB OPPORTUNITY RISK AUDITOR</span>
        </div>
      </div>
    </div>
  );
};

export default AuthVisual;
