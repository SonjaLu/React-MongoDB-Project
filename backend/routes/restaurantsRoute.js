require('dotenv').config();
const express = require('express');
const path = require('path');
const multer = require('multer');
const RestaurantModel = require('../models/RestaurantSchema');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { sortBy } = req.query;
        let queryOptions = {};

        if (sortBy === 'state') {
            queryOptions.sort = { state: 1 };
        } else if (sortBy === 'name') {
            queryOptions.sort = { name: 1 }; // Sortieren nach 'name' in aufsteigender Reihenfolge
        }

        const restaurants = await RestaurantModel.find({}, null, queryOptions);
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //Korrektur des Pfades damit die Bilder in frontend gespeichert werden. 
        cb(null, path.join(__dirname, '../../frontend/public/uploads/'))
    },
    filemane: function (req, file, cb) {
        const uniqueFileName = Date.now() + '-' + file.originalName;
        console.log("uniqueFileName: " + uniqueFileName);
        cb(null, uniqueFileName);
    }
})
const upload = multer({ storage: storage });



function calculateNewAverage(reviews) {
    if (reviews.length === 0) return 0;

    const total = reviews.reduce((acc, review) => {
        return acc + (isNaN(review.numericStarRating) ? 0 : review.numericStarRating);
    }, 0);

    return total / reviews.length;
}

router.post("/", upload.single("pic"), async (req, res) => {
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



module.exports = router;