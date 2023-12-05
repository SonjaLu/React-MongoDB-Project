require('dotenv').config();
const express = require('express');
const router = express.Router();

// Routen
router.get("/", (req, res) => {
    res.send("Hallo Welt von meinem Express-Server!");
});


module.exports =router;