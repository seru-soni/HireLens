const { GoogleGenAI } = require('@google/genai');

// Initialize GoogleGenAI client with the API key from environment
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

module.exports = ai;
