import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ResetPassword.css';
import { useNavigate } from 'react-router-dom';
import showNotification from "../NotifcationComponents/showNotification";
import { requestEmail } from '../../util/requestEmail';
import { resetPassword } from '../../util/resetPassword';



const handleEmailSubmit = async (e, formRef, navigator, setResetNumber) => {
    e.preventDefault();
    console.log("### handleEmailSubmit");
    requestEmail(formRef,navigator,showNotification, setResetNumber);
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
    resetPassword(formRef, navigator, emailToken, setEmailToken);
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

