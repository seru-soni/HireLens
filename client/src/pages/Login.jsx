import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Eye, EyeOff, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) {
      setServerError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) return;

    setIsSubmitting(true);
    const result = await login({
      email: formData.email,
      password: formData.password,
    });
    setIsSubmitting(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setServerError(result.message || 'Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center space-x-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform duration-200">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white flex items-center">
            Hire<span className="text-indigo-400">Lens</span>
          </span>
        </Link>
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-indigo-400 hover:text-indigo-300">
            Create account
          </Link>
        </p>
      </div>

      {/* Form Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-slate-900/90 border border-slate-800 py-8 px-6 sm:px-10 shadow-xl rounded-2xl">
          {serverError && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-start space-x-3 text-sm">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <span>{serverError}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-200">
                Email Address
              </label>
              <div className="mt-1.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  className={`block w-full rounded-xl bg-slate-950 border px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors ${
                    errors.email ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-slate-200">
                  Password
                </label>
              </div>
              <div className="mt-1.5 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`block w-full rounded-xl bg-slate-950 border px-3.5 py-2.5 pr-10 text-sm text-white placeholder:text-slate-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors ${
                    errors.password ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-rose-400">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-indigo-600/30 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
