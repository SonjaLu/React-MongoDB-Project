import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './ChangeUser.css';
import { changeUser } from '../../util/changeUser';

const ChangeUser = ({ id }) => {
  const navigate = useNavigate();
  const [newUsername, setUsername] = useState('')
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    changeUser(formRef, navigate);
  };

  const onCloseRegister = () => {
    navigate('/login');
  };

  return (
    <div className='restaurant-form'>
      <h2>UPLOAD FILE</h2>
      <hr />

      <div>
        <label className="newUsername">User: {newUsername}</label>
        <hr />
      </div>

      <form ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor="newUsername">Change newUsername:</label>
        <input type="text" className="name" id="newUsername" name="newUsername"
          required value={newUsername} onChange={e => setUsername(e.target.value)} />
        <label htmlFor="firstName">Change Firstname:</label>
        <input type="text" className="location" name="firstName" id="firstName"
          required value={firstName} onChange={e => setFirstName(e.target.value)} />
        <label htmlFor="lastName">Change Lastname:</label>
        <input type="text" id="lastName" name="lastName"
          required value={lastName} onChange={e => setLastName(e.target.value)} />
        <label htmlFor="email">Change Email:</label>
        <input type="email" id="email" name="email"
          required value={email} onChange={e => setEmail(e.target.value)} />
        <div>
          <input type="submit" className="submit" value="Send Change" />
          <div className="longbtn" onClick={onCloseRegister} style={{ position: 'absolute', bottom: '20px', right: '20px', cursor: 'pointer' }}>
            &#8592; back
          </div>
        </div>
      </form>
    </div>
  )
}

export default ChangeUser