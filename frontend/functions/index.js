/* eslint-disable */
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateCryptoTip = onRequest(async (request, response) => {
  // Enable CORS
  response.set('Access-Control-Allow-Origin', '*');
  
  if (request.method === 'OPTIONS') {
    response.set('Access-Control-Allow-Methods', 'GET, POST');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Max-Age', '3600');
    response.status(204).send('');
    return;
  }

  try {
    logger.info("Generating crypto tip", {structuredData: true});
    const { coinData } = request.body;

    // Format the prompt for Gemini
    const prompt = `Based on the following cryptocurrency data for ${coinData.name} (${coinData.symbol}):
    Current Price: $${coinData.current_price}
    24h Change: ${coinData.price_change_percentage_24h}%
    Market Cap: $${coinData.market_cap}

    Please provide a concise, analytical investment tip considering:
    1. Current market trends
    2. Price movement patterns
    3. Market sentiment
    4. Potential risks

    Format the response as a clear, actionable tip in 2-3 sentences.`;

    // Generate content using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const tip = result.response.text();

    logger.info("Tip generated successfully", {structuredData: true});
    response.json({ tip });
  } catch (error) {
    logger.error("Error generating tip:", error);
    response.status(500).json({ error: 'Failed to generate tip' });
  }
});