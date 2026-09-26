import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthLayout } from '../components/auth/AuthLayout';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must contain at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
    setIsSubmitting(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setServerError(result.message || 'Failed to create account. Please try again.');
    }
  };

  return (
    <AuthLayout
      heroSubtitle="Identify potential risks in job postings and make more informed application decisions."
      features={[
        'Job posting analysis',
        'Risk indicators',
        'Personal reports',
      ]}
    >
      <div className="auth-card">
        {/* Compact Card Header */}
        <div className="auth-card-header">
          <h2 className="auth-card-title">Create your account</h2>
          <p className="auth-card-subtitle">
            Create an account to start assessing job opportunities.
          </p>
        </div>

        {/* Server Error Alert */}
        {serverError && (
          <div className="auth-error-alert" role="alert">
            <AlertCircle className="w-4 h-4 text-[#c46b6b] shrink-0 mt-0.5" />
            <span>{serverError}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="auth-form-group">
            <label htmlFor="name" className="auth-label">
              Full Name
            </label>
            <div
              className={`auth-input-wrapper ${
                errors.name ? 'auth-input-wrapper-error' : ''
              }`}
            >
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                className="auth-input"
              />
            </div>
            {errors.name && (
              <p className="auth-field-error">{errors.name}</p>
            )}
          </div>

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
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 8 characters"
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

          {/* Confirm Password */}
          <div className="auth-form-group">
            <label htmlFor="confirmPassword" className="auth-label">
              Confirm Password
            </label>
            <div
              className={`auth-input-wrapper ${
                errors.confirmPassword ? 'auth-input-wrapper-error' : ''
              }`}
            >
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="auth-input"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="auth-password-toggle"
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="auth-field-error">{errors.confirmPassword}</p>
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
                  <span>Creating account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </div>
        </form>

        {/* Footer Navigation */}
        <div className="auth-footer-nav">
          <span>Already have an account?</span>
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
