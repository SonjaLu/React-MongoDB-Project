require('dotenv').config();
const express = require('express');

const app = express();
const Port = process.env.PORT;
const mongoose = require('mongoose');
const multer = require('multer')

const cors = require('cors');

/**
 * sergej@2023-11-12
 * Bcrypt eingefügt
 */
const bcrypt = require('bcrypt');

/**
 * sergej@2023-11-12
 * rateLimit für die Anzahl der Zugriffe etc eingefügt.
 */
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 2// Limit each IP to 100 requests per `window` (here, per 15 minutes).
})

/**
 * Verbinde mit der Mongo DB.
 */
const connectString = process.env.MONGO_DB_CLIENT;
app.use(async (req, res, next) => {
    try {
        await mongoose.connect(connectString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("erfolgreich verbunden");

        //weiteres Objekt in der Abfrage
        //next - übergibt an den nächsten haendler.
        next();
    } catch (error) {
        console.log("ERROR " + error);
    }
})

// Erlaube Anfragen von einem bestimmten Ursprung (http://localhost:3000)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//erstmal auskommentiert da 
//app.use(express.json());
app.use ('/uploads', express.static ('uploads'))
app.use(cors());

//sergej@2023-11-18 - eingfügt da es sonst nicht funktioniert. Sollte hier sein.
app.use(express.json());


/**
 * sergej@2023-10-30 - erstelle Schema für die Daten der DB.
 * Alte Parameter erstmal auskommenitert. 
 * TODO: Parameter werden später eingefügt.
 * 
 * sergej@2023-11-18 - Werte von dem Objekt von Sonja eingefügt.
 */
const reviewSchema = new mongoose.Schema({

    id: String,
    name: String,
    category: String,
    location: String,
    state: String,
    pic: String,
    reviews: String,
    starRating: String,
    description: String
})

/**
 * sergej@2023-11-12
 * => Shema für die UserData.
 * minLength + maxLength eingefügt, erstmal auskommentiert. Später kann man noch verwenden.
 */
const userShema = new mongoose.Schema ({

    id : {
        type: String,
        required: true
    },


    firstName: {
        type: String,
        required: true,
        //minlength : 3,
        //maxLength: 30
    },
    lastName: {
        type: String,
        required: true,
        //minlength : 5
    },

    email: {
        type: String,
        required: true,
        //minlength : 10
    },


    username :{
        type: String,
        required: true,
        //minlength : 7
    },
    
    hashedPassword: {
        type: String,
        required: true,
        //minlength : 8
    },
    hashedPasswordConfirm: {
        type: String,
        required: true,
        //minlength : 3
    }
})

//sergej@2023-11-12 shema für User
const UserModel = mongoose.model('User', userShema);


//collection in der DB wo daten gespeichert werden
const ReviewModel = mongoose.model('RestaurantReviews', reviewSchema);


app.get("/", (req, res) => {
    //zum senden der Daten body verwenden.
    //url die request schickt.
    //const urlQuery = req.query;
    res.send("Hallo welt");
})

//erste route. prüfe ob alles ordentlich funktioniert.
//wichtig: message: "text" und nicht "mesage" :"text" schreiben.
app.get("/health-check", (req, res) => {
    res.status(200).send({ "message": "Running Backend works" });
    console.log("Running health check");
})

/**
 * sergej@2023-10-30 - Bekomme die Reviews aus der DB.
 */
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

/**
 * sergej@2023-10-30 - FÜge neues Review in die DB ein.
 */
app.post("/addReview", async (req, res) => {

    console.log(req.body);
    const {id, name, category, location, state, pic, reviews, starRating, description} = req.body;
    const reviewToAdd = new ReviewModel({id, name, category, location, state, pic, reviews, starRating, description});
    try {
        const addedReview = await ReviewModel.create(reviewToAdd);

        res.status(201).send({ "message": "added new Review" });
    } catch {
        res.status(500).send({ "message": "could not add Review" });
    }
})


/**
 * Route zum Löschen des Bewertungen aus der Datenbank. 
 */
app.post("/deleteReview/:id", async (req, res) => {

    try {
        const {reviewID} = req.params;
        await ReviewModel.deleteOne(reviewID);

        res.status(201).send({ "message": "delete Review" });
    } catch {
        res.status(500).send({ "message": "could not delete Review" });
    }
})


/**
 *sergej@2023-11-10 
 => Route um die Posts zu bekommen / zu senden.
 => nicht notwendig da wir schon reviews haben. add und get.
 */
/** 
 app.get("/posts", (req, res) => {

 });
 
 app.post("/posts",(req,res) => {
 
 })
 */
 
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
 app.post("/register", limiter, async (req,res) => {
     console.log(req.body);

     try{
     const {id, firstName, lastName, email, username, password, passwordRepeat} = req.body;
     if (!firstName || !email || !password || !passwordRepeat|| !username || !lastName) {
        return res.status(404).send({message: "Nich alle Felder wurden ausgefüllt"});
     }

     const existingUser = await UserModel.findOne({email});
     if (existingUser){
        return res.status(409).send({message: "Benutzer ist schon vorhanden"});
     }

     const hashedPassword = await bcrypt.hash(password, 10);
     const hashedPasswordConfirm = await bcrypt.hash(passwordRepeat, 10);


     const user = new UserModel({id, firstName, lastName, email, username, hashedPassword, hashedPasswordConfirm});
   
     await UserModel.create(user);
     res.status(201).send({message: "User wurde erstellt"});
    } catch(error){
        res.status(500).send({message: "Error beim Erstellen des Benutzers"});

    }
 })


app.listen(Port, () => {
    console.log("Running backend");
})

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
        res.status(500).send({ message: "Servererrornpm run dev" });
    }
});

