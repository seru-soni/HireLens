import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0b0c0f] flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[rgba(196,107,107,0.12)] border border-[rgba(196,107,107,0.25)] text-[#c46b6b] flex items-center justify-center mb-6">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-[#F2EFE8] mb-2">404</h1>
      <h2 className="text-xl font-semibold text-[#DDD9CF] mb-3">Page Not Found</h2>
      <p className="text-sm text-[#85858A] max-w-sm mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#A8C7E8] hover:bg-[#BFD7F0] text-[#0d1218] font-semibold text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
