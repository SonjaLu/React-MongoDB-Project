require('dotenv').config();
const express = require('express');
const RestaurantModel = require('../models/RestaurantSchema');
const router = express.Router();

//  Route zum Löschen des Bewertungen aus der Datenbank. 
router.post("/deleteReview/:id", async (req, res) => {

    try {
        const { reviewID } = req.params;
        await RestaurantModel.deleteOne(reviewID);

        res.status(201).send({ "message": "delete Review" });
    } catch {
        res.status(500).send({ "message": "could not delete Review" });
    }
})



module.exports = router;