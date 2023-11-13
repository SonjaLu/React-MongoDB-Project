require('dotenv').config();
const express = require('express');

const app = express();
const Port = process.env.PORT;
const mongoose = require('mongoose');
const multer = require('multer')

const cors = require('cors');


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

/**
 * sergej@2023-10-30 - erstelle Schema für die Daten der DB.
 * Alte Parameter erstmal auskommenitert. 
 * TODO: Parameter werden später eingefügt.
 */
const reviewSchema = new mongoose.Schema({

    // text: String,
    // category: String,
    // id: String,
    // done: String
})

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

    try {
        const reviewToAdd = req.body;
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


app.listen(Port, () => {
    console.log("Running backend");
})

/**
 *sergej@2023-11-10 
 => Route um die Posts zu bekommen / zu senden.
 */
app.get("/posts", (req, res) => {

});

app.post("/posts",(req,res) => {

})

const storage = multer.diskStorage({
    destination: function (req,res, cb) {
        cb (null, '/uploads')
    },
    filemane : function(req, file, cb){
        const uniqueSuffix = Date.now() + '-' + originalName 
        cb(null, file.filemane + '-' + uniqueSuffix)
    }
})