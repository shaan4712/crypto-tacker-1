import React, { useState } from 'react';
import '../styles/CryptoTips.css';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Header from '../components/Common/Header';
import BackOnTop from '../components/Common/BackOnTop'

const CryptoTips = () => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userPrompt, setUserPrompt] = useState('');

  const suggestedPrompts = [
    "What are the top 3 cryptocurrencies I should consider investing in right now and why?",
    "Which low-market-cap cryptocurrencies have high growth potential in 2024?",
    "What are the key factors I should consider before investing in any cryptocurrency?",
    "Explain the current market trends and potential investment opportunities in DeFi tokens.",
    "What's your analysis of the NFT market and related tokens worth investing in?"
  ];

  const generateResponse = async (prompt) => {
    setLoading(true);
    setError(null);
    
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
      const fullPrompt = `Provide a clear and detailed analysis for the following crypto question:
  
      ${prompt}
  
      Format your response in these sections without any special characters or markdown:
      1. Main Analysis
      2. Key Points to Consider
      3. Potential Risks
      4. Investment Strategy Suggestion
  
      Keep the response clean and professional without any asterisks, hashes, or formatting symbols.`;
  
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      
      // Clean up any remaining special characters from the response
      const cleanResponse = response.text()
        .replace(/\*\*/g, '')  // Remove double asterisks
        .replace(/##/g, '')    // Remove hashes
        .trim();
        
      setResponse(cleanResponse);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to generate advice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <Header />
        <BackOnTop />
        <div className="advisor-container">
      {/* Gradient Header */}
      <div className="advisor-header">
        <div className="header-content">
          <h1>AI Crypto Investment Advisor</h1>
          <p>Get personalized cryptocurrency investment advice powered by AI</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="advisor-content">
        {/* Input Section */}
        <div className="input-section">
          <div className="input-wrapper">
            <textarea
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="What would you like to know about crypto investments?"
              className="prompt-input"
            />
            <button
              onClick={() => generateResponse(userPrompt)}
              disabled={loading || !userPrompt.trim()}
              className={`generate-btn ${loading ? 'loading' : ''}`}
            >
              {loading ? (
                <>
                  <span className="loader"></span>
                  Analyzing...
                </>
              ) : (
                'Get AI Advice'
              )}
            </button>
          </div>
        </div>

        {/* Suggested Questions */}
        <div className="suggested-section">
          <h2>Suggested Questions</h2>
          <div className="questions-grid">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => {
                  setUserPrompt(prompt);
                  generateResponse(prompt);
                }}
                className="question-card"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Response Section */}
        {error && <div className="error-message">{error}</div>}
        
        {response && (
          <div className="response-section">
            <h2>AI Investment Advice</h2>
            <div className="response-content">
              {response}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="disclaimer">
          <p>This AI-generated advice is for informational purposes only. Always conduct your own research and consult with financial advisors before making investment decisions.</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default CryptoTips;