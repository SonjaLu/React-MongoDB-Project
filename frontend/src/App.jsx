// import { useState } from 'react';
// import './App.css';
// import Login from './components/Login/Login';
// import Register from './components/Register/Register';
// import Reviews from './components/Reviews/Reviews';
// import Welcome from './components/Welcome/Welcome';


// function App() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [showRegister, setShowRegister] = useState(false);
//   const [showReviews, setShowReviews] = useState(false);


//   const handleLoginClick = () => {
//     setShowLogin(true);
//   };

//   const handleCloseRegister = () => {
//     setShowRegister(false);
//   };

//   const handleCloseLogin = () => {
//     setShowLogin(false);
//   };

//   const handleRegisterClick = () => {
//     setShowRegister(true);
//   };

//   const handleReviewsClick = () => {
//     setShowReviews(true);
//   };


//   return (
//     <div>
//       <h1 id="headline">GOURMET EXPLORER</h1>
//       <div className="showbox2">
//         <h2 id="greeting">W e l c o m e Restaurant-Tester</h2>
//         <div id="navbar">
//           <button onClick={handleLoginClick}>Login</button>
//           <button onClick={handleRegisterClick}>Register</button>
//           <button onClick={handleReviewsClick}>Reviews</button>
//         </div>
//       </div>
//       {showLogin && <Login />}
//       {showRegister && <Register />}
//       {showReviews && <Reviews />}
//       {!showLogin && !showRegister && !showReviews && (
//         <Welcome
//           onLoginClick={handleLoginClick}
//           onRegisterClick={handleRegisterClick}
//           onReviewsClick={handleReviewsClick}
//         />
//       )}
//     </div>
//   );
// }

// export default App

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './components/Login/Login.css';
import './components/showBox/Showbox.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Reviews from './components/Reviews/Reviews';
import Welcome from './components/Welcome/Welcome';
import NewReview from './components/NewReview/NewReview';
import ForgotPassword from './components/Login/ForgotPassword';

function App() {
  return (
    <NewReview />
    /*
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/newreview" element={<NewReview />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
    */
  );
}

export default App;

