
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
import './login.css';
import '../showBox/submitbtn.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const onCloseLogin = () => {
    
    navigate('/');
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <>
    <h1 id="headline">GOURMET EXPLORER</h1>
    <div className="showbox2">
      
      <h2 id="loginheadline">Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />


<button id="submitbtn" role="button" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
  Submit
</button>
<div>
<div className="back-button" onClick={onCloseLogin} style={{ position: 'absolute', bottom: '20px', right: '20px', cursor: 'pointer' }}>
        &#8592; back
      </div>
    </div>
       
       </form>
    </div>
    </>
  );
}



export default Login;