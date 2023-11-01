import React, { useState } from 'react';
import './App.css';
import Login from './Login.jsx';
import './Login.css';
import './Register.css';
import './submitbtn.css';
import Register from './Register.jsx';
import Reviews from './Reviews.jsx';
import Welcome from './Welcome.jsx';

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
    <div>
      <h1 id="headline">GOURMET EXPLORER</h1>
      {!showLogin && !showRegister && !showReviews && (
        <Welcome
          onLoginClick={handleLoginClick}
          onRegisterClick={handleRegisterClick}
          onReviewsClick={handleReviewsClick}
        />
      )}

      {showLogin && <Login />}
      {showRegister && <Register />}
      {showReviews && <Reviews />}
    </div>
  );
}


export default App;

