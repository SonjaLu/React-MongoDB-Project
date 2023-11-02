import React, { useState } from 'react';
import './App.css';
import Login from './Login.jsx';
import './Login.css';
import './Inputfield.css';
import './Register.css';
import './Submitbtn.css';
import './Showbox.css';
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

  const handleCloseRegister = () => {
    setShowRegister(false);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
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

      {showLogin && <Login onCloseLogin={handleCloseLogin} />}
{showRegister && <Register onCloseRegister={handleCloseRegister} />}
{showReviews && <Reviews />}
    </div>
  );
}


export default App;

