require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8081;
const crypto = require('crypto');

const changeUserRoute = require("./routes/changeUserRoute");
const loginRoutes = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoute");
const requestEmailRoute = require("./routes/requestEmailRoute");
const resetPasswordRoute = require("./routes/resetPasswordRoute");
const restaurantsRoute = require("./routes/restaurantsRoute");
const testRoutes = require("./routes/testRoutes");
const healthCheckRoute = require("./routes/healthCheckRoute");


// CORS-Konfiguration
app.use(cors({
    origin: 'http://localhost:5173', // Anpassen an Ihr Frontend
}));

// JSON-Body-Parser-Middleware
app.use(express.json());

// Generieren eines 20-Zeichen langen Tokens
function generateResetToken() {
    return crypto.randomBytes(20).toString('hex');
}

// Statische Dateien
app.use('/uploads', express.static(path.join(__dirname, '../frontend/public/uploads')));
app.use('/assets', express.static(path.join(__dirname, '../frontend/src/assets')));


// MongoDB-Verbindung
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Erfolgreich mit MongoDB verbunden"))
    .catch(error => console.error("Fehler bei der Verbindung zu MongoDB: ", error));

// Routen
app.use('/test', testRoutes);


app.use('/api/restaurants', restaurantsRoute);
app.use('/login', loginRoutes);
app.use('/addReview', restaurantsRoute);



/**
 * sergej@2023-11-12
 */
//route für Register.
app.use(express.json());
app.use('/register', registerRoute);

/**
 * sergej@2023-11-23 - Setze Password zurück.
 * Funktioniert: Email senden und Code senden.
 */
app.use('/request-reset', requestEmailRoute);
app.use('/reset-password', resetPasswordRoute);

//==== Benutzer updaten ====
app.use('/changeuser', changeUserRoute);


// //erste route. prüfe ob alles ordentlich funktioniert.
// //wichtig: message: "text" und nicht "mesage" :"text" schreiben.
app.use('/health-check', healthCheckRoute);

// Serverstart
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});