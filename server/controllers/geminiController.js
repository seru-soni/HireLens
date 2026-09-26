const ai = require('../config/gemini');

/**
 * @desc    Test Gemini AI API connection
 * @route   GET /api/gemini/test
 * @access  Public
 */
const testGeminiConnection = async (req, res, next) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'Gemini API key is not configured on the server.',
      });
    }

    const candidateModels = ['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-3.8-flash'];
    let response;
    let lastError;

    for (const modelName of candidateModels) {
      try {
        response = await ai.models.generateContent({
          model: modelName,
          contents: 'Respond with exactly: HireLens Gemini connection successful.',
        });
        if (response && response.text) break;
      } catch (err) {
        lastError = err;
      }
    }

    if (!response) {
      throw lastError || new Error('No response received from Gemini models');
    }

    const replyText = response.text ? response.text.trim() : '';

    return res.status(200).json({
      success: true,
      message: replyText || 'HireLens Gemini connection successful.',
    });
  } catch (error) {
    console.error('[Gemini Test Error]:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to connect to Gemini API: ' + error.message,
    });
  }
};

module.exports = {
  testGeminiConnection,
};
