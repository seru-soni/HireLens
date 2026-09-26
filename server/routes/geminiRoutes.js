const express = require('express');
const router = express.Router();
const { testGeminiConnection } = require('../controllers/geminiController');

// Test Gemini integration endpoint
router.get('/test', testGeminiConnection);

module.exports = router;
