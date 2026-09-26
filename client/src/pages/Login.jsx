import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthLayout } from '../components/auth/AuthLayout';

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
    <AuthLayout
      heroSubtitle="Sign in to continue inspecting recruiters, tracking job risk signals, and auditing opportunities."
      features={[
        'Job posting analysis',
        'Risk indicators',
        'Personal reports',
      ]}
    >
      <div className="auth-card">
        {/* Compact Card Header */}
        <div className="auth-card-header">
          <h2 className="auth-card-title">Welcome back</h2>
          <p className="auth-card-subtitle">
            Sign in to continue to your HireLens dashboard.
          </p>
        </div>

        {/* Server Error Alert */}
        {serverError && (
          <div className="auth-error-alert" role="alert">
            <AlertCircle className="w-4 h-4 text-[#c46b6b] shrink-0 mt-0.5" />
            <span>{serverError}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Email Address */}
          <div className="auth-form-group">
            <label htmlFor="email" className="auth-label">
              Email Address
            </label>
            <div
              className={`auth-input-wrapper ${
                errors.email ? 'auth-input-wrapper-error' : ''
              }`}
            >
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="auth-input"
              />
            </div>
            {errors.email && (
              <p className="auth-field-error">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="auth-form-group">
            <label htmlFor="password" className="auth-label">
              Password
            </label>
            <div
              className={`auth-input-wrapper ${
                errors.password ? 'auth-input-wrapper-error' : ''
              }`}
            >
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="auth-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="auth-password-toggle"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="auth-field-error">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="auth-primary-btn"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </div>
        </form>

        {/* Footer Navigation */}
        <div className="auth-footer-nav">
          <span>Don't have an account?</span>
          <Link to="/register" className="auth-link">
            Create account
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
