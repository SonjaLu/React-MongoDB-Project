require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');

// Importieren Sie hier Ihre Mongoose-Modelle
const UserModel = require('../models/UserSchema')
const router = express.Router();


// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minuten
    max: 100 // Maximal 100 Anfragen pro IP in 15 Minuten
});


//==== Benutzer updaten ====
router.post("/", limiter, async (req, res) => {
    console.log(req.body);
    const { oldusername, firstName, lastName, email, username } = req.body;
    if (!firstName || !email || !username || !lastName || !oldusername) {
        return res.status(400).send({ message: "Nicht alle Felder wurden ausgefüllt" });
    }
    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { username: oldusername }, // Suche nach der eindeutigen ID
            { firstName, lastName, email, username }, // Aktualisierte Daten
            { new: true } // Gibt das aktualisierte Dokument zurück
        );
        if (!updatedUser) {
            return res.status(404).send({ message: "Benutzer ist nicht vorhanden" });
        }
        res.status(200).send({ message: "User Profil wurde geändert", user: updatedUser });
    } catch (error) {
        console.error('Updatefehler:', error);
        res.status(500).send({ message: "Error beim Ändern des Benutzers" });
    }
});

module.exports = router;