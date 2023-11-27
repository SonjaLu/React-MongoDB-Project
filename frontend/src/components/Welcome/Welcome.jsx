// import React from 'react';

// function Welcome({ onLoginClick, onRegisterClick, onReviewsClick }) {
//   return (
//     <div>
//       <h1 id="headline">GOURMET EXPLORER</h1>
//       <div className="showbox2">
//         <h2 id="greeting"><br /><br />W e l c o m e<br /><br /><br /> Restaurant-Tester</h2>
//         <div id="navbar">
//           <a href="#" onClick={onLoginClick}>Login</a>
//           <a href="#" onClick={onRegisterClick}>Register</a>
//           <a href="#" onClick={onReviewsClick}>Reviews</a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Welcome;

import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

function Welcome() {
  return (
    <>
      <h1 id="headline">GOURMET<br/> EXPLORER</h1>
      <div className="showbox2">
        <h2 id="greeting">W e l c o m e<br/><br/> Restaurant-Tester</h2>
        <div id="navbar">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          {/* <Link to="/newreview">Reviews</Link> */}
          
        </div>
      </div>
     </>
  );
}

export default Welcome;


