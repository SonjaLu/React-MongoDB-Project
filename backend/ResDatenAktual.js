const mongoose = require('mongoose');
require('dotenv').config();
const Restaurant = require('./models/RestaurantSchema');
const restaurantData = require('./PlaceholderRestaurants');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Hilfsfunktion zur Berechnung des Durchschnitts-Ratings
function calculateAverageRating(starRating) {
    const stars = starRating.split('').filter(char => char === '★').length;
    return stars;
}


async function updateRestaurants() {
    for (const data of restaurantData) {
        const existingRestaurant = await Restaurant.findOne({ name: data.name });

        if (existingRestaurant) {
            // Aktualisiere das bestehende Restaurant
            await Restaurant.updateOne(
                { _id: existingRestaurant._id },
                { $set: data }
            );
        } else {
            // Füge ein neues Restaurant hinzu
            const newRestaurant = new Restaurant(data);
            await newRestaurant.save();
        }
    }
}


updateRestaurants().then(() => mongoose.disconnect());
console.log("Restaurants aktualisiert");




