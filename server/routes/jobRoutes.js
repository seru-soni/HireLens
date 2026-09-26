const express = require('express');
const router = express.Router();
const {
  analyzeJob,
  getUserJobs,
  getJobById,
  toggleSaveJob,
  deleteJob,
  getDashboardStats,
} = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

// Dashboard statistics (Real MongoDB metrics)
router.get('/dashboard/stats', protect, getDashboardStats);

// Job Analysis with Gemini
router.post('/analyze', protect, analyzeJob);

// Get all user jobs history
router.get('/', protect, getUserJobs);

// Single job operations
router.get('/:id', protect, getJobById);
router.put('/:id/save', protect, toggleSaveJob);
router.delete('/:id', protect, deleteJob);

module.exports = router;
