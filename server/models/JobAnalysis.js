const mongoose = require('mongoose');

const riskSignalSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      default: 'General',
    },
    severity: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH'],
      default: 'MEDIUM',
    },
    finding: {
      type: String,
      required: true,
    },
    evidence: {
      type: String,
      default: '',
    },
  },
  { _id: false }
);

const positiveSignalSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      default: 'General',
    },
    finding: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const jobAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    jobTitle: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    jobDescription: {
      type: String,
      required: [true, 'Job description is required'],
    },
    jobUrl: {
      type: String,
      trim: true,
      default: '',
    },
    classification: {
      type: String,
      enum: ['LOW_RISK', 'MEDIUM_RISK', 'HIGH_RISK'],
      default: 'LOW_RISK',
      index: true,
    },
    riskScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    summary: {
      type: String,
      default: '',
    },
    riskSignals: [riskSignalSchema],
    positiveSignals: [positiveSignalSchema],
    recommendations: [
      {
        type: String,
      },
    ],
    isSaved: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const JobAnalysis = mongoose.model('JobAnalysis', jobAnalysisSchema);

module.exports = JobAnalysis;
