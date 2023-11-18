const mongoose = require('mongoose');
require('dotenv').config();
const Restaurant = require('./models/RestaurantSchema'); // Pfad zum Mongoose-Modell
const restaurantData = require('./PlaceholderRestaurants'); // Pfad zur JSON-Daten-Datei

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function updateRestaurants() {
  for (const data of restaurantData) {
    await Restaurant.updateOne(
      { name: data.name }, // Suchkriterium, z.B. Name des Restaurants
      data, // Aktualisierte Daten
      { upsert: true } // Erstellt ein neues Dokument, falls keines gefunden wird
    );
  }

  console.log("Restaurants aktualisiert");
}

updateRestaurants()
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  });