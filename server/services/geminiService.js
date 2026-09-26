const ai = require('../config/gemini');

/**
 * Gemini Prompt Template for Job Risk Analysis
 */
const SYSTEM_INSTRUCTION = `You are an expert recruitment fraud analyst and job opportunity risk assessor for HireLens.
Analyze the provided job posting for observable risk indicators, suspicious patterns, and potential red flags.

CRITICAL GUIDELINES:
- Do NOT make absolute claims that a job is definitely fraudulent or fake based solely on text.
- Present your findings as an explainable risk assessment with concrete observed signals.
- Evaluate observable characteristics including:
  * Unrealistic compensation promises or salary-to-experience mismatch
  * Vague or generic job descriptions and responsibilities
  * Suspicious contact info (e.g. Gmail/Yahoo/Telegram/WhatsApp for corporate roles)
  * Requests for upfront money, check deposits, equipment fees, or cryptocurrency
  * Requests for sensitive financial or personal identification (SSN, banking) before interview/offer
  * High-pressure tactics, urgency, or immediate hire with no formal vetting
  * Missing, inconsistent, or unverified company background
  * Suspicious redirect links, unverified domains, or deceptive application methods
- Also identify positive signals that indicate legitimate recruitment practices.
- Give a riskScore between 0 and 100:
  * 0-30: LOW_RISK
  * 31-65: MEDIUM_RISK
  * 66-100: HIGH_RISK
- Output ONLY a valid raw JSON object matching the exact schema below, with no markdown code blocks, no backticks, and no extraneous text.

JSON Schema:
{
  "classification": "LOW_RISK" | "MEDIUM_RISK" | "HIGH_RISK",
  "riskScore": number (0-100),
  "summary": "Concise overview of the risk assessment findings",
  "riskSignals": [
    {
      "category": "Compensation | Communication | Company Profile | Application Process | Job Scope | Sensitive Data",
      "severity": "LOW" | "MEDIUM" | "HIGH",
      "finding": "Specific observable finding",
      "evidence": "Quoted or referenced text/pattern from the posting"
    }
  ],
  "positiveSignals": [
    {
      "category": "Clear Requirements | Verified Domain | Standard Process | Defined Compensation",
      "finding": "Positive indicator observed"
    }
  ],
  "recommendations": [
    "Actionable step for the candidate to verify and protect themselves"
  ]
}`;

/**
 * Analyze a job posting with Gemini
 * @param {Object} jobData - { jobTitle, company, jobDescription, jobUrl }
 * @returns {Promise<Object>} Structured analysis result
 */
const analyzeJobWithGemini = async ({ jobTitle = '', company = '', jobDescription = '', jobUrl = '' }) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured on the server.');
  }

  const promptContent = `${SYSTEM_INSTRUCTION}

--- JOB POSTING TO ANALYZE ---
Job Title: ${jobTitle || 'Not specified'}
Company: ${company || 'Not specified'}
Application / Job URL: ${jobUrl || 'Not provided'}

Job Description:
${jobDescription}
-------------------------------

Remember: Return ONLY valid JSON matching the specified structure without markdown formatting or code fences.`;

  const candidateModels = ['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-3.8-flash'];
  let rawText = '';
  let lastError = null;

  for (const modelName of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: promptContent,
      });

      if (response && response.text) {
        rawText = response.text.trim();
        break;
      }
    } catch (err) {
      lastError = err;
      console.warn(`[Gemini Service] Model ${modelName} encountered error: ${err.message}`);
    }
  }

  if (!rawText) {
    throw lastError || new Error('Failed to generate analysis response from Gemini.');
  }

  // Strip possible markdown code blocks if the model returned ```json ... ```
  let cleanedJson = rawText;
  if (cleanedJson.startsWith('```')) {
    cleanedJson = cleanedJson.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  }

  try {
    const parsed = JSON.parse(cleanedJson);

    // Validate and sanitize response structure
    const validClassifications = ['LOW_RISK', 'MEDIUM_RISK', 'HIGH_RISK'];
    let classification = parsed.classification?.toUpperCase();
    if (!validClassifications.includes(classification)) {
      if (parsed.riskScore > 65) classification = 'HIGH_RISK';
      else if (parsed.riskScore > 30) classification = 'MEDIUM_RISK';
      else classification = 'LOW_RISK';
    }

    const riskScore = Math.max(0, Math.min(100, Math.round(Number(parsed.riskScore) || 0)));

    return {
      classification,
      riskScore,
      summary: parsed.summary || 'Job risk analysis completed.',
      riskSignals: Array.isArray(parsed.riskSignals) ? parsed.riskSignals : [],
      positiveSignals: Array.isArray(parsed.positiveSignals) ? parsed.positiveSignals : [],
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : [],
    };
  } catch (parseError) {
    console.error('[Gemini Service] JSON parsing failed. Raw response:', rawText);
    throw new Error('Gemini returned an invalid response format. Please try again.');
  }
};

module.exports = {
  analyzeJobWithGemini,
};
