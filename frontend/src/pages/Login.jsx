import React from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';  

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-header">
          <div className="crypto-icon">
            <svg viewBox="0 0 24 24" className="crypto-svg">
              <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" />
              <path d="M12 22V12" />
              <path d="M22 7L12 12L2 7" />
            </svg>
          </div>
          <h1>CryptoTracker.</h1>
          <p>Track. Analyze. Prosper.</p>
        </div>
        
        <div className="login-card">
          <div className="card-glass">
            <div className="card-content">
              <h2>Welcome Back</h2>
              <p>Sign in to access your portfolio</p>
              
              <button className="google-btn" onClick={handleGoogleSignIn}>
                <svg className="google-icon" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
        </div>

        <div className="login-floating-coins">
          <div className="coin coin-1">₿</div>
          <div className="coin coin-2">Ξ</div>
          <div className="coin coin-3">◈</div>
        </div>
      </div>
    </div>
  );
};

export default Login;