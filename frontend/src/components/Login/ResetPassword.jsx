import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8081/resetpassword', { token, newPassword });
            // Erfolgsmeldung anzeigen
        } catch (error) {
            // Fehlerbehandlung
        }
    };

    return (
        <div className="resetcontainer">
        <form onSubmit={handleSubmit}>
            <label>
                New Password:
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </label>
            <button className="resetbtn" type="submit">Reset Password</button>
        </form>
        </div>
    );
}

export default ResetPassword;
