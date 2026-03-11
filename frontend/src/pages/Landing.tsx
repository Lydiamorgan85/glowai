import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { FiCamera, FiShield, FiTrendingUp, FiHeart, FiCheckCircle } from 'react-icons/fi';
import './Landing.css';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await authAPI.login(email, password);
      } else {
        await authAPI.signup(email, password, name);
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing">
      <header className="landing-header">
        <div className="logo">✨ GlowAI</div>
        <nav>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#pricing">Pricing</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Your Skin's AI-Powered Personal Skincare Expert</h1>
          <p>Get personalized skincare recommendations based on advanced AI analysis. Stop guessing, start glowing.</p>
          
          <div className="hero-features">
            <div className="feature-badge">
              <FiCheckCircle /> Works for ALL skin tones
            </div>
            <div className="feature-badge">
              <FiCheckCircle /> Budget-friendly options
            </div>
            <div className="feature-badge">
              <FiCheckCircle /> Science-backed results
            </div>
          </div>

          <div className="auth-form">
            <h2>{isLogin ? 'Login to GlowAI' : 'Start Your Glow Journey'}</h2>
            
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              )}
              
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <input
                type="password"
                placeholder="Password (min 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              
              <button type="submit" disabled={loading}>
                {loading ? 'Processing...' : (isLogin ? 'Login' : 'Get Started Free')}
              </button>
              
              {error && <p className="error">{error}</p>}
            </form>

            <p className="toggle">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Sign Up' : 'Login'}
              </span>
            </p>
          </div>
        </div>

        <div className="hero-image">
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="analysis-preview">
                <div className="scan-animation"></div>
                <p>Analyzing your skin...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <h2>Why GlowAI is Different</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FiCamera size={40} />
            <h3>AI Skin Analysis</h3>
            <p>Upload a selfie and get instant analysis of your skin type, concerns, and strengths</p>
          </div>
          
          <div className="feature-card">
            <FiHeart size={40} />
            <h3>Positive Approach</h3>
            <p>We celebrate your skin's strengths first, then gently guide improvements</p>
          </div>
          
          <div className="feature-card">
            <FiShield size={40} />
            <h3>All Skin Tones</h3>
            <p>Trained on diverse data for accurate analysis across all Fitzpatrick types</p>
          </div>
          
          <div className="feature-card">
            <FiTrendingUp size={40} />
            <h3>Progress Tracking</h3>
            <p>See your skin improve week by week with photo comparisons and insights</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Upload Your Selfie</h3>
            <p>Take a clear photo in natural lighting</p>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <h3>AI Analysis</h3>
            <p>Our AI analyzes 20+ skin attributes</p>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Your Routine</h3>
            <p>Personalized AM/PM skincare routines</p>
          </div>
          
          <div className="step">
            <div className="step-number">4</div>
            <h3>Track Progress</h3>
            <p>Watch your skin transform over time</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>© 2026 GlowAI by Lydia Morgan. All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="mailto:lydia@glowai.com">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;