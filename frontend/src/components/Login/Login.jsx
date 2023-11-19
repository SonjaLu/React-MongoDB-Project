
/**
 * sergej@2023-11-04 - Formular für den Login.
 * @returns 
 */
/*
function Login (){
    return  (
        <div>
            <form>
            <label for="username">Benutzername:</label>
            <input type="text" className="username" name="username" required/>
            <br></br>

            <label for="password">Password:</label>
            <input type="password" className="password" name="password" required/>
            <br></br>

            <input type="submit" value="Einloggen"/>
            </form>

            <p><a href="#">Passwort vergessen</a></p>
            <p>Noch kein Account ? <a href ="#">Registrieren</a> </p>
      </div>
    )
}
*/
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; 
import '../../App.css';
import ForgotPassword from './ForgotPassword';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

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

      if (resp.data.success) {
        // Erfolgreiche Authentifizierung
        navigate('/NewReview');
      } else {
        // Fehlgeschlagene Authentifizierung
        setLoginError(true);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError(true);
    }
  };

  const onCloseRegister = () => {
    navigate(-1); // This will take the user back to the previous page
  };

  return (
    <>
      <h1 id="headline">GOURMET EXPLORER</h1>
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
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input className="password"
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="
          ">
            <Link to="/forgotpassword">Forgot Password?</Link> {/* Add this line */}
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
    </>
  );
}

export default Login;
  
  