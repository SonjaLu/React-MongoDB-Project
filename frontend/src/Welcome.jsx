import React from 'react';

function Welcome({ onLoginClick, onRegisterClick, onReviewsClick }) {
  return (
    <div>
      <h1 id="headline">GOURMET EXPLORER</h1>
      <div className="showbox2">
        <h2 id="greeting"><br /><br />W e l c o m e<br /><br /><br /> Restaurant-Tester</h2>
        <div id="navbar">
          <a href="#" onClick={onLoginClick}>Login</a>
          <a href="#" onClick={onRegisterClick}>Register</a>
          <a href="#" onClick={onReviewsClick}>Reviews</a>
        </div>
      </div>
    </div>
  );
}

export default Welcome;

