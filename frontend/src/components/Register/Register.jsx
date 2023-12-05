import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { register } from '../../util/register';

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [equal, setEqual] = useState(false);
  //sergej@2023-11-12 - Ref aus dem Video eingefügt.
  const formRef = useRef();

  const checkPassword = () => {
    const form = formRef.current;
    form.password.value === form.passwordRepeat.value ? setEqual(true)
      : setEqual(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    register(formRef, navigate);
  };

  const onCloseRegister = () => {
    navigate('/');
  };

  return (
    <>
      <h1 id="headline">GOURMET<br /> EXPLORER</h1>
      <div className="showbox2">
        <h2 id="registerheadline">Register</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <div className="input-group">
              <label htmlFor="firstName">Firstname:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={firstName}
                onChange={e => setFirstName(e.target.value)} />
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Lastname:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={lastName}
                onChange={e => setLastName(e.target.value)} />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="input-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={username}
                onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="input-group">
              <label htmlFor="passwordRepeat">Password repeat:</label>
              <input
                type="password"
                id="passwordRepeat"
                name="passwordRepeat"
                required
                value={passwordRepeat}
                onChange={e => setPasswordRepeat(e.target.value)} />
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
