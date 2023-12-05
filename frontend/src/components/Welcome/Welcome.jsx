import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

function Welcome() {
  return (
    <>
      <div className="animated-image left-image"></div> 
      
        <h1 id="headline">GOURMET<br /> EXPLORER</h1>
        <div className="showbox2">
          <h2 id="greeting">W e l c o m e<br /><br /> Restaurant-Tester</h2>
          <div id="navbar">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
     

      <div className="animated-image right-image"></div> 
    </>
  );
}

export default Welcome;


