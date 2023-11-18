import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ForgotPassword.css'; 

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your backend API endpoint for password reset
      const response = await axios.post('http://localhost:8081/forgotpassword', { email });
      setMessage('Instructions for resetting your password have been sent to your email.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setMessage('Failed to send password reset email.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h1>Forgot your password?</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Leave your email to send you the reset details</h2>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="animatedbtn" type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;
