import React, { useState } from 'react';
import './App.css';
import Login from './Login.jsx';
import Welcome from './Welcome.jsx';
import Register from './Register.jsx'; 
import Reviews from './Register.jsx'; 

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  const handleReviewsClick = () => {
    setShowReviews(true);
  };

  return (
    <>
      <h1 id="headline">GOURMET EXPLORER</h1>

      <div className="showbox2">
        <h2 id="greeting"><br /><br />W e l c o m e<br /><br /><br /> Restaurant-Tester</h2>
        <div id="navbar">
          <a href="#" onClick={handleLoginClick}>Login</a>
          <a href="#" onClick={handleRegisterClick}>Register</a>
          <a href="#" onClick={handleReviewsClick}>Reviews</a>
        </div>
      </div>

      {showLogin ? <Login /> : null}
      {showRegister ? <Register /> : null}
      {showReviews ? <Reviews /> : null}
    </>
  );
}

export default App;
