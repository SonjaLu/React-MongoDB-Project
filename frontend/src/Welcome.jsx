import React from 'react';

function Welcome() {
  return (
    <div>
      <h1 id="headline">GOURMET EXPLORER</h1>
      <div className="showbox2">
        <h2 id="greeting"><br /><br />W e l c o m e<br /><br /><br /> Restaurant-Tester</h2>
        <div id="navbar">
          <a href="#login">Login</a>
          <a href="#register">Register</a>
          <a href="#reviews">Reviews</a>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
