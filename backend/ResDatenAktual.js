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
    const averageRating = calculateAverageRating(data.starRating);

    const updatedData = {
      ...data,
      averageRating 
    };

    delete updatedData.starRating;
    await Restaurant.updateOne(
      { name: data.name }, // Suchkriterium
      updatedData, 
      { upsert: true } 
    );
  }

  console.log("Restaurants aktualisiert");
}


updateRestaurants().then(() => mongoose.disconnect());
