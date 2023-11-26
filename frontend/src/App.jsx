import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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

  const [isLoggedIn, setIsLoggedId] = useState(false);
  const [resetAllowed, setResetAllowed] = useState (false);

  //Nummer zum Zurücksetzen.
  const [resetNumber, setResetNumber] = useState(0);

  //1. token aus localstorage auslesen
  //2 . token vorhanden ? ja - setze isloggedin auf true
  //nachgucken ist evlt. wo anders.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token){
      setIsLoggedId(true);
    } else{
      setIsLoggedId(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedId(false);
  }

  const handleLogin = () => {
    setIsLoggedId(true);
  }
 
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

          <Route path="/login/askemail" element={<ResetPage 
          text={"Type in your Email to reset passwort"}
            resetAllowed = {resetAllowed}
             setResetAllowed = {setResetAllowed}
              resetNumber = {resetNumber}
              setResetNumber = {setResetNumber}
          />} />

          <Route path="/login/verify" element={<ResetPage 
          text ={"Type in the code you received via Email"}
            resetAllowed = {resetAllowed}
            setResetAllowed = {setResetAllowed}
            resetNumber = {resetNumber}
            setResetNumber = {setResetNumber}
          />} />
          <Route path="/login/newpassword" element={resetAllowed ? <ResetPage 
          text={"Type in your new Password"}
          /> : <Navigate to= "/login"/>} />

          <Route path="/changeuser" element={<ChangeUser />} />
         
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;

