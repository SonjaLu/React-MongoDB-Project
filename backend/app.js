require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');
const multer = require('multer');

// Importieren Sie hier Ihre Mongoose-Modelle
const RestaurantModel = require('./models/RestaurantSchema'); 
const UserModel = require('./models/UserSchema')
const app = express();
const PORT = process.env.PORT || 8081;
const crypto = require('crypto');


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

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minuten
    max: 100 // Maximal 100 Anfragen pro IP in 15 Minuten
});
app.use(limiter);

// MongoDB-Verbindung
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Erfolgreich mit MongoDB verbunden"))
.catch(error => console.error("Fehler bei der Verbindung zu MongoDB: ", error));

// Routen
app.get("/", (req, res) => {
    res.send("Hallo Welt von meinem Express-Server!");
});

app.get('/api/restaurants', async (req, res) => {
    try {
        const restaurants = await RestaurantModel.find({});
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).send({ message: "user not found" });
        }

        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
            return res.status(401).send({ message: "invalid password" });
        }

        // Authentifizierung erfolgreich
        res.status(200).send({ message: "Login succesful", user });
    } catch (error) {
        res.status(500).send({ message: "Servererror:npm run dev" });
        
    }
});


const storage = multer.diskStorage({
    destination: function (req,file, cb) {
        cb (null, 'uploads/')
    },
    filemane : function(req, file, cb){
        const uniqueFileName = Date.now() + '-' + file.originalName; 
        console.log("uniqueFileName: " +uniqueFileName);
        cb(null, uniqueFileName);
    }
})
const upload = multer({storage: storage});



function calculateNewAverage(reviews) {
    if (reviews.length === 0) return 0;

    const total = reviews.reduce((acc, review) => {
        return acc + (isNaN(review.numericStarRating) ? 0 : review.numericStarRating);
    }, 0);

    return total / reviews.length;
}

app.post("/addReview", upload.single("pic"), async (req, res) => {
    try {
        const { name, category, location, state, description, username, numericStarRating } = req.body;

        // Konvertiere numericStarRating in eine Zahl und überprüfe, ob es gültig ist
        const starRating = parseFloat(numericStarRating);
        if (isNaN(starRating) || starRating < 1 || starRating > 5) {
            return res.status(400).send({ message: "numericStarRating not valid" });
        }

        // Überprüfe, ob das Restaurant bereits existiert
        const existingRestaurant = await RestaurantModel.findOne({ name, location });

        if (existingRestaurant) {
            // Füge die Bewertung zum existierenden Restaurant hinzu
            existingRestaurant.reviews.push({ description, username, numericStarRating });
            existingRestaurant.averageRating = calculateNewAverage(existingRestaurant.reviews);
            await existingRestaurant.save();
            res.status(200).send({ message: "Review added to existing restaurant" });
        } else {
            // Für ein neues Restaurant: Bild-Upload verarbeiten
            let pic = "";
            if (req.file) {
                pic = `/uploads/${req.file.filename}`;
                // pic = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
            }

            const restaurantToAdd = new RestaurantModel({
                name, 
                category, 
                location, 
                state, 
                pic,
                reviews: [{ description, username, starRating }],
                averageRating: starRating
            });
            await restaurantToAdd.save();
            res.status(201).send({ message: "New restaurant and review added" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error adding review" });
    }
});





/**
 * sergej@2023-11-12
 */
//route für Register.
app.use(express.json());
app.post("/register", limiter, async (req,res) => {
    console.log(req.body);

    try{
    const {id, firstName, lastName, email, username, password } = req.body;
    if (!firstName || !email || !password ||  !username || !lastName) {
       return res.status(404).send({message: "Nich alle Felder wurden ausgefüllt"});
    }

    const existingUser = await UserModel.findOne({email});
    if (existingUser){
       return res.status(409).send({message: "Benutzer ist schon vorhanden"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // const hashedPasswordConfirm = await bcrypt.hash(passwordRepeat, 10);


    const user = new UserModel({id, firstName, lastName, email, username, hashedPassword});
  
    await UserModel.create(user);
    res.status(201).send({message: "User wurde erstellt"});
   } catch(error){
       res.status(500).send({message: "Error beim Erstellen des Benutzers"});

   }
})

//  Route zum Löschen des Bewertungen aus der Datenbank. 
app.post("/deleteReview/:id", async (req, res) => {

   try {
       const {reviewID} = req.params;
       await ReviewModel.deleteOne(reviewID);

       res.status(201).send({ "message": "delete Review" });
   } catch {
       res.status(500).send({ "message": "could not delete Review" });
   }
})


// app.post("/forgotpassword", async (req, res) => {
//     try {
//         const { email } = req.body;
//         const user = await UserModel.findOne({ email });

//         if (user) {
//             const resetToken = generateResetToken(); 
//             const expiryDate = new Date();
//             expiryDate.setHours(expiryDate.getHours() + 1); 
//             user.passwordResetToken = resetToken;
//             user.tokenExpiry = expiryDate;

//             await user.save();
//             // Senden einer E-Mail mit dem Token
//             sendResetEmail(email, resetToken); 
//         }
//         res.status(200).send({ message: "If an account with that email exists, instructions for resetting your password have been sent." });
//     } catch (error) {
//         console.error("Error in /forgotpassword route:", error);
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// });

// Beispiel-Route für Passwort-Zurücksetzungsanfrage
app.post('/request-reset', async (req, res) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(400).send('Benutzer nicht gefunden.');
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 5); // 5 Min gültig

    user.passwordResetToken = resetToken;
    user.tokenExpiry = expiryDate;

    await user.save();

    // Token direkt senden (nicht empfohlen für Produktionsumgebungen)
    res.json({ resetToken });
});

app.post('/reset-password', async (req, res) => {
    const { email, token, newPassword } = req.body;

    // if (newPassword !== confirmPassword) {
    //     return res.status(400).send('Passwörter stimmen nicht überein.');
    // }
    
    const user = await UserModel.findOne({ email, passwordResetToken: token, tokenExpiry: { $gte: new Date() } });

    if (!user) {
        return res.status(400).send('Ungültiger oder abgelaufener Token.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.hashedPassword = hashedPassword;
    user.passwordResetToken = undefined; // Token entfernen
    user.tokenExpiry = undefined; // Ablaufdatum entfernen

    await user.save();

    res.send('Passwort erfolgreich zurückgesetzt.');
});


//==== Benutzer updaten ====
app.post("/changeuser", limiter, async (req, res) => {
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

const addReview = async (restaurantId, newRating) => {
    const restaurant = await Restaurant.findById(restaurantId);
    restaurant.starRating += newRating; // Update der Gesamtbewertung
    restaurant.reviews += 1; // Erhöhung der Anzahl der Bewertungen
    restaurant.averageRating = restaurant.starRating / restaurant.reviews; // Neuer Durchschnitt
    // Speichern des aktualisierten Dokuments
    await restaurant.save();
  };


// //erste route. prüfe ob alles ordentlich funktioniert.
// //wichtig: message: "text" und nicht "mesage" :"text" schreiben.
app.get("/health-check", (req, res) => {
    res.status(200).send({ "message": "Running Backend works" });
    console.log("Running health check");
})

// Serverstart
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});