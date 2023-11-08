const express = require('express');
const mongoose = require('mongoose');
const Restaurant = require('./models/RestaurantSchema'); 

const app = express();
const port = process.env.PORT || 8080;

const express = require('express');
const cors = require('cors');


app.use(cors());



mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use(express.json());


app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



