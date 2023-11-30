import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ResetPassword.css';
import { useNavigate } from 'react-router-dom';
import showNotification from "../NotifcationComponents/showNotification";


const handleEmailSubmit = async (e, formRef, navigator, setResetNumber) => {
    e.preventDefault();
    console.log("### handleEmailSubmit");
    const email = formRef.current.email.value;
    console.log("form: " + email);

    const config = {
        url: "http://localhost:8081/request-reset",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            email: email
        }
    }
    try {
        const response = await axios(config);
        console.log("##### test: " + response);
        console.log("##### emailtoken in frontend: " + response.data.token);

        showNotification(response.data.message, 'normal');
        setResetNumber(response.data.code);
        localStorage.setItem("resetEmail", response.data.token);
        navigator("/login/verify");

    } catch (error) {
        showNotification(e.response.data.message, "red");
        console.error("Fehler bei der Anfrage des Passwort-Resets: " + error);
    }
};


/**
 * Methode um den Code von der Email zu behandeln.
 */
const onVerifyHandle = (e, formRef, resetNumber, setResetAllowed, navigator) => {
    e.preventDefault();
    const code = formRef.current.code.value;
    console.log("### onVerifyHandle: " + code);
    if (code == resetNumber) {
        showNotification("Code verified", "normal");
        console.log(code);
        setResetAllowed(true);
        navigator("/login/newpassword");
    } else {
        showNotification("Code ist nicht richtig", "red");

        console.log("Code ist nicht richtig");
    }
};

const onPasswordHandle = async (e, formRef, navigator, emailToken, setEmailToken) => {
    const newPassword = formRef.current.password.value;
    const config = {
        url: "http://localhost:8081/reset-password",
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${emailToken}`
        },
        data: {
            password: newPassword
        }
    }


    try {
        const response = axios(config);
        console.log("## onPasswordHandle response: " + response);
        showNotification(response.data.message, "normal");
        setEmailToken("");
        localStorage.removeItem("resetEmail");
        navigator("/login");
    } catch (e) {
        showNotification(e.response.data.message, "red");
        console.log("Error bei reset passsss " + e);
    }
}

export default function ResetPage({ text, resetAllowed, setResetAllowed, resetNumber, setResetNumber }) {

    console.log("### ResetPage: " + text);

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailToken, setEmailToken] = useState('');
    const [equal, setEqual] = useState(false);
    const formRef = useRef();



    useEffect(() => {
        setEmailToken(localStorage.getItem("resetEmail"));
    }, [])
    console.log("emailtoken: " + emailToken);

    //wichtig : den javascriptcode immer in die Klammer: {} einsetzen wenn der in return jsx ist.
    {
        // E-Mail-Phase
        if (text === "Type in your Email to reset passwort") {
            return (
                <div className="resetcontainer">
                    <form ref={formRef} onSubmit={(e) => handleEmailSubmit(e, formRef, navigate, setResetNumber)}>
                        <h2>Type in your email to reset your password</h2>
                        <input type="email" className="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail-adress" />
                        <button className="submit" type="submit">Reset Password</button>
                    </form>
                </div>
            );
        }


        // Email Code -muss noch gemacht werden.
        else if (text === "Type in the code you received via Email") {
            return (
                <div className="resetcontainer">
                    <form ref={formRef} onSubmit={(e) => onVerifyHandle(e, formRef, resetNumber, setResetAllowed, navigate)}>
                        <h2>Type in your Code from Email</h2>
                        <input type="number" name="code" placeholder="Code" />
                        <button className="submit" type="submit">Bestätigen</button>
                    </form>
                </div>
            );
        }


        // Neues Passwort-Phase
        else if (text === "Type in your new Password") {
            return (
                <div className="resetcontainer">
                    <form ref={formRef} onSubmit={(e) => onPasswordHandle(e, formRef, navigate, emailToken, setEmailToken)}>
                        <h2>Type in your new password</h2>
                        <input type="password" name="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="new password" style={{ marginBottom: '10px' }} />
                        <input type="password" name="passwordVerify" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="confirm password" />
                        <button className="resetbtn" type="submit">Reset Password</button>
                    </form>
                </div>
            );
        }
    }
}

