import React, { useState } from 'react';
import axios from 'axios';
import './ResetPassword.css';
import { useNavigate } from 'react-router-dom';

export default function ResetPage() {
    const navigate = useNavigate();
    const [stage, setStage] = useState(0); // 0: E-Mail, 1: Token, 2: Neues Passwort
    const [email, setEmail] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleEmailSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8081/request-reset', { email });
            setResetToken(response.data.resetToken);
            setStage(1); // Gehe zur nächsten Stufe
        } catch (error) {
            console.error('Fehler bei der Anfrage des Passwort-Resets:', error);
        }
    };


    const handleNewPasswordSubmit = async () => {
        if (newPassword !== confirmPassword) {
            alert('Passwörter stimmen nicht überein.');
            return;
        }

        try {
            await axios.post('http://localhost:8081/reset-password', {
                email,
                token: resetToken,
                newPassword
            });
            alert('Passwort erfolgreich zurückgesetzt.');
            navigate('/login');
        } catch (error) {
            console.error('Fehler beim Zurücksetzen des Passworts:', error);
        }
    };
    // E-Mail-Phase
    if (stage === 0) {
        return (
            <div className="resetcontainer">
                <h2>Type in your email to reset your password</h2>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail-adress" />
                <button className="resetbtn" type="button" onClick={handleEmailSubmit}>Reset Password</button>
            </div>
        );
    } 
    // Neues Passwort-Phase
    else if (stage === 1) {
        return (
            <div className="resetcontainer">
                <h2>Type in your new password</h2>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="new password" style={{ marginBottom: '10px' }}/>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="confirm password" />
                <button className="resetbtn" type="button" onClick={handleNewPasswordSubmit}>Reset Password</button>
            </div>
        );
    }
}

