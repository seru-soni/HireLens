import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-6">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-white mb-2">404</h1>
      <h2 className="text-xl font-semibold text-slate-200 mb-3">Page Not Found</h2>
      <p className="text-sm text-slate-400 max-w-sm mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return Home</span>
      </Link>
    </div>
  );
};
