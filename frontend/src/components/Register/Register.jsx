import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    // Registrierungslogik
  };
  const onCloseRegister = () => {
    navigate('/');
  };

  return (
    <>
      <h1 id="headline">GOURMET EXPLORER</h1>
      <div className="showbox2">
        <h2 id="registerheadline">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputs-wrapper">
            <div className="input-group">
              <label htmlFor="firstName">Firstname:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Lastname:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="passwordRepeat">Password repeat:</label>
              <input
                type="password"
                id="passwordRepeat"
                name="passwordRepeat"
                required
                value={passwordRepeat}
                onChange={e => setPasswordRepeat(e.target.value)}
              />
            </div>
          </div>
          <button id="submitbtn" role="button" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
  Submit
</button>
<div>
<div className="back-button" onClick={onCloseRegister} style={{ position: 'absolute', bottom: '20px', right: '20px', cursor: 'pointer' }}>
        &#8592; back
      </div>
    </div>
        </form>
      </div>
    </>
  );
}

export default Register;
