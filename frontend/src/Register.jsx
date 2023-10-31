// Register.jsx
import React from 'react';

function Register() {
  // Hier können Sie das Formular für die Registrierung erstellen
  return (
    <div>
      <h2 id="greeting">Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Hier können Sie die Eingabefelder für Name, E-Mail und Passwort erstellen */}
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required /><br />

        <label htmlFor="email">E-Mail:</label>
        <input type="email" id="email" name="email" required /><br />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required /><br />

        <button id="registerbtn" type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
