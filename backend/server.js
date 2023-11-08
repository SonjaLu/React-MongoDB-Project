const express = require('express');
const mongoose = require('mongoose');
const Restaurant = require('./models/RestaurantSchema');
require('dotenv').config();
const app = express();
const cors = require('cors');

// Ihre Umgebungsvariablen
const port = process.env.PORT || 8080;
const uri = process.env.MONGO_URI;  // Achten Sie darauf, dass diese Variable in Ihrer .env-Datei übereinstimmt

// Mongoose-Verbindungsoptionen
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Mongoose-Verbindung
mongoose.connect(uri, options);

// Middleware
app.use(cors());
app.use(express.json());

// Route zum Abrufen von Restaurants
app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Server starten
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


