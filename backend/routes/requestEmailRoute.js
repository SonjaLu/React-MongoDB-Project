require('dotenv').config();
const express = require('express');
const UserModel = require('../models/UserSchema')
const nodmailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const router = express.Router();

/**
 * sergej@2023-11-23 - Setze Password zurück.
 * Funktioniert: Email senden und Code senden.
 */
router.post('/', async (req, res) => {
    console.log("reset-request");

    const { email } = req.body;

    console.log("email. Backend: " + email);
    if (!email) {
        return res.status(404).send({ message: "Bitte Email angeben." });
    }

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: "User not exists" });
        }

        const code = Math.floor(100000 + Math.random() * 900000);
        console.log(code);

        const transporter = nodmailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD_EMAIL,
            }
        });

        const mailMessage = {
            from: process.env.EMAIL,
            to: email,
            subject: "Reset password with 6 digit number",
            text: `Your reset Code is ${code}`
        };

        transporter.sendMail(mailMessage, (error, info) => {
            if (error) {
                console.log("Some error: " + error);
                //return message to frontend
            } else {
                console.log("Email send: " + info);
                //email als jwt token zurückgeben

                const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
                //return message to frontend.
                res.status(200).send({ code, token, message: "Reset number sent to Email" });
            }
        })

    } catch (e) {
        res.status(500).send({ message: "Server error" });
    }
});

module.exports = router;