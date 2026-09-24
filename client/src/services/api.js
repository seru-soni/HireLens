import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for clean error messaging
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Standardize error message extraction
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred. Please try again.';
    return Promise.reject({ ...error, customMessage: message });
  }
);

export default API;
