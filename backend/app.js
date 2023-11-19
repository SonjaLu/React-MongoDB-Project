// require('dotenv').config();
// const express = require('express');

// const app = express();
// const Port = process.env.PORT;
// const mongoose = require('mongoose');
// const multer = require('multer')

// const cors = require('cors');
// const RestaurantModel = require('./models/RestaurantSchema');

// /**
//  * sergej@2023-11-12
//  * Bcrypt eingefügt
//  */
// const bcrypt = require('bcrypt');

// /**
//  * sergej@2023-11-12
//  * rateLimit für die Anzahl der Zugriffe etc eingefügt.
//  */
// const rateLimit = require('express-rate-limit');

// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, // 15 minutes
// 	limit: 2// Limit each IP to 100 requests per `window` (here, per 15 minutes).
// })

// /**
//  * Verbinde mit der Mongo DB.
//  */
// const connectString = process.env.MONGO_DB_CLIENT;
// app.use(async (req, res, next) => {
//     try {
//         await mongoose.connect(connectString, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         })
//         console.log("erfolgreich verbunden");

//         //weiteres Objekt in der Abfrage
//         //next - übergibt an den nächsten haendler.
//         next();
//     } catch (error) {
//         console.log("ERROR " + error);
//     }
// })

// // Erlaube Anfragen von einem bestimmten Ursprung (http://localhost:3000)
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

// //erstmal auskommentiert da 
// //app.use(express.json());
// app.use ('/uploads', express.static ('uploads'))
// app.use(cors());
// app.use(express.json());
// app.use('/assets', express.static(path.join(__dirname, '../frontend/src/assets')));
// /**
//  * sergej@2023-10-30 - erstelle Schema für die Daten der DB.
//  * Alte Parameter erstmal auskommenitert. 
//  * TODO: Parameter werden später eingefügt.
//  */
// const uri = process.env.MONGO_URI;
// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// const reviewSchema = new mongoose.Schema({

//     // text: String,
//     // category: String,
//     // id: String,
//     // done: String
// })

// /**
//  * sergej@2023-11-12
//  * => Shema für die UserData.
//  * minLength + maxLength eingefügt, erstmal auskommentiert. Später kann man noch verwenden.
//  */
// const userShema = new mongoose.Schema ({

//     id : {
//         type: String,
//         required: true
//     },


//     firstName: {
//         type: String,
//         required: true,
//         //minlength : 3,
//         //maxLength: 30
//     },
//     lastName: {
//         type: String,
//         required: true,
//         //minlength : 5
//     },

//     email: {
//         type: String,
//         required: true,
//         //minlength : 10
//     },


//     username :{
//         type: String,
//         required: true,
//         //minlength : 7
//     },
    
//     hashedPassword: {
//         type: String,
//         required: true,
//         //minlength : 8
//     },
//     hashedPasswordConfirm: {
//         type: String,
//         required: true,
//         //minlength : 3
//     }
// })

// //sergej@2023-11-12 shema für User
// const UserModel = mongoose.model('User', userShema);


// //collection in der DB wo daten gespeichert werden
// const ReviewModel = mongoose.model('RestaurantReviews', reviewSchema);


// app.get("/", (req, res) => {
//     //zum senden der Daten body verwenden.
//     //url die request schickt.
//     //const urlQuery = req.query;
//     res.send("Hallo welt");
// })

// app.get('/api/restaurants', async (req, res) => {
//     try {
//         const restaurants = await RestaurantModel.find({});
//         res.json(restaurants);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// //erste route. prüfe ob alles ordentlich funktioniert.
// //wichtig: message: "text" und nicht "mesage" :"text" schreiben.
// app.get("/health-check", (req, res) => {
//     res.status(200).send({ "message": "Running Backend works" });
//     console.log("Running health check");
// })

// /**


// /**
//  * sergej@2023-10-30 - FÜge neues Review in die DB ein.
//  */



// /**



// /**
//  *sergej@2023-11-10 
//  => Route um die Posts zu bekommen / zu senden.
//  => nicht notwendig da wir schon reviews haben. add und get.
//  */
// /** 
//  app.get("/posts", (req, res) => {

//  });
 
//  app.post("/posts",(req,res) => {
 
//  })
//  */
//  const port = process.env.PORT || 8081;
//  app.listen(port, () => {
//      console.log(`Server listening at http://localhost:${port}`);
//  });
 



// app.listen(Port, () => {
//     console.log("Running backend");
// })



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
const { sendResetEmail } = require('./PasswordResetMail');

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
app.use('/uploads', express.static('uploads'));
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
    destination: function (req,res, cb) {
        cb (null, '/uploads')
    },
    filemane : function(req, file, cb){
        const uniqueSuffix = Date.now() + '-' + originalName 
        cb(null, file.filemane + '-' + uniqueSuffix)
    }
})

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

app.post("/addReview", async (req, res) => {

    try {
        const reviewToAdd = req.body;
        const addedReview = await ReviewModel.create(reviewToAdd);

        res.status(201).send({ "message": "added new Review" });
    } catch {
        res.status(500).send({ "message": "could not add Review" });
    }
})

// * sergej@2023-10-30 - Bekomme die Reviews aus der DB.

app.get("/reviews", async (req, res) => {
   try {

       const reviews = await ReviewModel.find({});
       res.status(200).send({
           "reviews": reviews,
           "message": "fetched reviews"
       });
   } catch {
       res.status(500).send({ "message": "could not fetch reviews" });
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

app.post("/forgotpassword", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            const resetToken = generateResetToken(); 
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1); 
            user.passwordResetToken = resetToken;
            user.tokenExpiry = expiryDate;

            await user.save();
            // Senden einer E-Mail mit dem Token
            sendResetEmail(email, resetToken); // Implementieren Sie diese Funktion
        }
        res.status(200).send({ message: "If an account with that email exists, instructions for resetting your password have been sent." });
    } catch (error) {
        console.error("Error in /forgotpassword route:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});
// Serverstart
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
