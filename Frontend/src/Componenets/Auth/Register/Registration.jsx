import React, { useState } from 'react';
import '../Login/Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await axios.post('http://localhost:5002/api/register', {
        fullName,
        email,
        password
      });

     
      window.location.href = 'http://localhost:3000';
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
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
                <h2 className="title">Sign Up</h2>
                <p className="subtitle">Create an account to get started</p>
              </div>

              {error && <div className="error-message">{error}</div>}

              <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label className="label">Full Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

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
                      type={showPassword ? 'text' : 'password'}
                      className="input"
                      placeholder="Create a password"
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
                </div>

                <div className="input-group">
                  <label className="label">Confirm Password</label>
                  <div className="password-input-container">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="input"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="toggle-password"
                    >
                      <img
                        src={`/icons/${showConfirmPassword ? 'eye-off.svg' : 'eye.svg'}`}
                        alt="Toggle visibility"
                        width="18"
                        height="18"
                      />
                    </button>
                  </div>
                </div>

                <button type="submit" className="login-button" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>

                <div className="divider">
                  <span className="divider-text">or continue with</span>
                </div>

                <div className="social-buttons">
                  <button type="button" className="social-button">
                    <img src="/icons/google.svg" alt="Google signup" width="18" height="18" />
                  </button>
                  <button type="button" className="social-button">
                    <img src="/icons/facebook.svg" alt="Facebook signup" width="18" height="18" />
                  </button>
                </div>

                <p className="signup-text">
                  Already have an account? <Link to="/login" className="signup-link">Log in</Link>
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

export default Registration;
