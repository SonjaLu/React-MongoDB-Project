require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');
const UserModel = require('../models/UserSchema')
const router = express.Router();


// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minuten
    max: 100 // Maximal 100 Anfragen pro IP in 15 Minuten
});

router.post("/", limiter, async (req, res) => {
    console.log(req.body);

    try {
        const { id, firstName, lastName, email, username, password } = req.body;
        if (!firstName || !email || !password || !username || !lastName) {
            return res.status(404).send({ message: "Nich alle Felder wurden ausgefüllt" });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ message: "Benutzer ist schon vorhanden" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({ id, firstName, lastName, email, username, hashedPassword });

        await UserModel.create(user);
        res.status(201).send({ message: "User wurde erstellt" });
    } catch (error) {
        res.status(500).send({ message: "Error beim Erstellen des Benutzers" });
    }
})


module.exports = router;