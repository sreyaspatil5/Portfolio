import React, { useState } from 'react';
import './SignInForm.css'; // Ensure this CSS file is created and styled as needed
import { FaGoogle, FaLinkedin } from 'react-icons/fa';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleGoogleLogin = () => {
    // Handle Google login functionality
    console.log('Logging in with Google');
  };

  const handleLinkedInLogin = () => {
    // Handle LinkedIn login functionality
    console.log('Logging in with LinkedIn');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send sign-in request to backend
    try {
      const response = await fetch('http://localhost:8080/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000); // Hide after 3 seconds
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText);
        console.error('Sign-in failed:', errorText);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error occurred during sign-in');
    }
  };

  return (
    <div className="signin-container">
      <h2 style={{ color: '#ff9102', fontWeight: 'bold' }}>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signin-button">
          Sign In
        </button>
      </form>
      <div className="login-options">
        <button onClick={handleGoogleLogin} className="google-login">
          <FaGoogle className="login-icon" />
          Login with Google
        </button>
        <button onClick={handleLinkedInLogin} className="linkedin-login">
          <FaLinkedin className="login-icon" />
          Login with LinkedIn
        </button>
      </div>

      {/* Success Popup */}
      {showSuccess && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowSuccess(false)}>&times;</span>
            <p>Sign In Successful!</p>
          </div>
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div className="error-box">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default SignInForm;
