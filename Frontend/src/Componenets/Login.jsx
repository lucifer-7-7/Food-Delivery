
import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5002/api/login', {
        email,
        password
      });
      
  
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
      
     
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address first');
      return;
    }
    
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/forgot-password', { email });
      alert('Password reset email sent. Please check your inbox.');
    } catch (err) {
      setError(err.response?.data?.message || 'Error sending reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="decorative-lines">
        <svg className="curves" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M0,500 C200,300 800,700 1000,500" stroke="purple" fill="none" strokeWidth="2" />
          <path d="M0,600 C300,400 700,800 1000,600" stroke="purple" fill="none" strokeWidth="2" />
        </svg>
      </div>

      <div className="content-container">
        <div className="login-card">
          <div className="form-container">
            <div className="form-wrapper">
              <div className="header">
                <h2 className="title">Log In</h2>
                <p className="subtitle">Welcome back! Please enter your details</p>
              </div>

              {error && <div className="error-message">{error}</div>}

              <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="label">Password</label>
                  <div className="password-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="toggle-password"
                    >
                      <img
                        src={`/icons/${showPassword ? 'eye-off.svg' : 'eye.svg'}`}
                        alt="Toggle visibility"
                        width="18"
                        height="18"
                      />
                    </button>
                  </div>
                  <div className="forgot-password">
                    <a href="#" className="forgot-link" onClick={handleForgotPassword}>
                      Forgot password?
                    </a>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="login-button"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Log In'}
                </button>

                <div className="divider">
                  <span className="divider-text">or continue with</span>
                </div>

                <div className="social-buttons">
                  <button type="button" className="social-button">
                    <img src="/icons/google.svg" alt="Google login" width="18" height="18" />
                  </button>
                  <button type="button" className="social-button">
                    <img src="/icons/facebook.svg" alt="Facebook login" width="18" height="18" />
                  </button>
                </div>

                <p className="signup-text">
                  Don't have an account?{' '}
                  <Link to="/register" className="signup-link">Register</Link>
                </p>
              </form>
            </div>
          </div>

          <div className="image-container">
            <div className="image-wrapper">
              <img
                src="/img/hero-img.png"
                alt="Delicious purple acai bowl with fruits"
                className="side-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;