const JobAnalysis = require('../models/JobAnalysis');
const { analyzeJobWithGemini } = require('../services/geminiService');

/**
 * @desc    Analyze a job posting using Gemini and save the report
 * @route   POST /api/jobs/analyze
 * @access  Private (JWT protected)
 */
const analyzeJob = async (req, res) => {
  try {
    const { jobTitle, company, jobDescription, jobUrl } = req.body;

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Job description is required for risk assessment.',
      });
    }

    if (!jobTitle || !jobTitle.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Job title is required.',
      });
    }

    if (!company || !company.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Company name is required.',
      });
    }

    // Call Gemini Service
    const analysisResult = await analyzeJobWithGemini({
      jobTitle: jobTitle.trim(),
      company: company.trim(),
      jobDescription: jobDescription.trim(),
      jobUrl: jobUrl ? jobUrl.trim() : '',
    });

    // Save report to MongoDB associated with authenticated user
    const savedAnalysis = await JobAnalysis.create({
      userId: req.user._id,
      jobTitle: jobTitle.trim(),
      company: company.trim(),
      jobDescription: jobDescription.trim(),
      jobUrl: jobUrl ? jobUrl.trim() : '',
      classification: analysisResult.classification,
      riskScore: analysisResult.riskScore,
      summary: analysisResult.summary,
      riskSignals: analysisResult.riskSignals,
      positiveSignals: analysisResult.positiveSignals,
      recommendations: analysisResult.recommendations,
    });

    return res.status(201).json({
      success: true,
      message: 'Job analysis completed successfully.',
      analysis: savedAnalysis,
    });
  } catch (error) {
    console.error('[Job Controller Error]:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to complete job risk assessment.',
    });
  }
};

/**
 * @desc    Get user's analyzed job reports history
 * @route   GET /api/jobs
 * @access  Private (JWT protected)
 */
const getUserJobs = async (req, res) => {
  try {
    const jobs = await JobAnalysis.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error('[Get Jobs Error]:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch analyzed jobs history.',
    });
  }
};

/**
 * @desc    Get a single job analysis report by ID
 * @route   GET /api/jobs/:id
 * @access  Private (JWT protected)
 */
const getJobById = async (req, res) => {
  try {
    const job = await JobAnalysis.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Analysis report not found or unauthorized.',
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error('[Get Job By Id Error]:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve analysis report.',
    });
  }
};

/**
 * @desc    Toggle bookmark/saved status for a job report
 * @route   PUT /api/jobs/:id/save
 * @access  Private (JWT protected)
 */
const toggleSaveJob = async (req, res) => {
  try {
    const job = await JobAnalysis.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Analysis report not found.',
      });
    }

    job.isSaved = !job.isSaved;
    await job.save();

    return res.status(200).json({
      success: true,
      message: job.isSaved ? 'Job saved to bookmarks.' : 'Job removed from bookmarks.',
      isSaved: job.isSaved,
      job,
    });
  } catch (error) {
    console.error('[Toggle Save Job Error]:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to update job saved status.',
    });
  }
};

/**
 * @desc    Delete a job analysis report
 * @route   DELETE /api/jobs/:id
 * @access  Private (JWT protected)
 */
const deleteJob = async (req, res) => {
  try {
    const job = await JobAnalysis.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Analysis report not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Job analysis report deleted successfully.',
    });
  } catch (error) {
    console.error('[Delete Job Error]:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete report.',
    });
  }
};

/**
 * @desc    Get dashboard metrics computed from real MongoDB user data
 * @route   GET /api/jobs/dashboard/stats
 * @access  Private (JWT protected)
 */
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const [totalAnalysed, highRiskCount, savedCount, recentJobs] = await Promise.all([
      JobAnalysis.countDocuments({ userId }),
      JobAnalysis.countDocuments({ userId, classification: 'HIGH_RISK' }),
      JobAnalysis.countDocuments({ userId, isSaved: true }),
      JobAnalysis.find({ userId }).sort({ createdAt: -1 }).limit(5),
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        jobsAnalysed: totalAnalysed,
        reportsSubmitted: totalAnalysed,
        highRiskJobs: highRiskCount,
        savedJobs: savedCount,
      },
      recentJobs,
    });
  } catch (error) {
    console.error('[Dashboard Stats Error]:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics.',
    });
  }
};

module.exports = {
  analyzeJob,
  getUserJobs,
  getJobById,
  toggleSaveJob,
  deleteJob,
  getDashboardStats,
};
