const express = require('express');
const mongoose = require('mongoose');
const RestaurantModel = require('./models/RestaurantSchema'); 
require('dotenv').config();
const app = express();
const cors = require('cors');
const path = require('path');

// Middleware
app.use(express.json()); // Middleware zum Parsen von JSON-Bodies
app.use(cors()); // Middleware zur Aktivierung von CORS

app.use('/assets', express.static(path.join(__dirname, '../frontend/src/assets')));

// Umgebungsvariablen
const port = process.env.PORT || 8081;
const uri = process.env.MONGO_URI;

// Mongoose-Verbindung
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// GET-Route zum Abrufen von Restaurants
app.get('/api/restaurants', async (req, res) => {
    try {
        const restaurants = await RestaurantModel.find({});
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST-Route zum Hinzufügen von Restaurants
app.post('/restaurants', async (req, res) => {
    try {
        const createdRestaurants = await RestaurantModel.insertMany(req.body);
        res.status(201).json(createdRestaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Serverstart
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
