import React, { createContext, useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import '../../App.css';
import { useAuth } from './LoginAuthen';



function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      username,
      password,
    };

    try {
      const config = {
        url: "http://localhost:8081/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(loginData)
      };

      const resp = await axios(config);

      if (resp.status === 200) {
        // Erfolgreiche Authentifizierung
        console.log("Eingeloggter Benutzername:", username);
        login(username);
        navigate('/NewReview');
      } else {
        // Fehlgeschlagene Authentifizierung
        setLoginError(true);
      }
    } catch (error) {
      console.error('Login failed:' + error);
      setLoginError(true);
    }
  };

  const onCloseRegister = () => {
    navigate(-1); // This will take the user back to the previous page
  };

  return (
    <>
     <div className="login-animated-image login-left-image"></div>
      <h1 id="headline">GOURMET<br /> EXPLORER</h1>
      <div className="showbox2">
        <h1 id="loginheadline">Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input className="username"
              type="text"
              id="username"
              name="username"
              required
              value={username}
              onChange={e => setUsername(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input className="password"
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="">
            <Link to="/login/askemail">Forgot Password?</Link>
          </div>
          <button id="submitbtn" type="submit" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
            Submit
          </button>
        </form>
        {loginError && <p>Invalid username or password</p>}
        <div className="back-button" onClick={onCloseRegister} style={{ position: 'absolute', bottom: '20px', right: '20px', cursor: 'pointer' }}>
          &#8592; back
        </div>
        
      </div>
      <div className="login-animated-image login-right-image"></div> 
    </>
  );
}

export default Login;

