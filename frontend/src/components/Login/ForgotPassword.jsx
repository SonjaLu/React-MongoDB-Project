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
      const response = await axios.post('http://localhost:8081/forgotpassword', { email });
      setMessage("If an account with that email exists, instructions for resetting your password have been sent.");
    } catch (error) {
      console.error('Error sending password reset email:', error);

      setMessage('If an account with that email exists, instructions for resetting your password have been sent.');
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
