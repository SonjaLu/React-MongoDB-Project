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
import ResetPage from './components/Login/ResetPassword';
import { AuthProvider } from './components/Login/LoginAuthen';
import ChangeUser from './components/Register/ChangeUser';

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/newreview" element={<NewReview />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/login/resetpassword/" element={<ResetPage />} />
          <Route path="/changeuser" element={<ChangeUser />} />
         
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;

