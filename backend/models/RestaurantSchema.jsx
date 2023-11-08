const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  category: String,
  location: String,
  state: String,
  pic: String,
  reviews: Number,
 
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;