import React, { useState } from 'react';

function Login( {onCloseLogin} ) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div>
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
    </div>
  );
}

export default Login;


