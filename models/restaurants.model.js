const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantsSchema = new Schema({
    RestaurantID: { type: String, required: true, unique: true},
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false},
    address: {type: String, required: true, unique: false},
    number: {type: Number, required: true, unique: true},
    imageurl: {type: String, required: false, unique: false},
    rating: {type: Number, required: false, unique:false},
    category: {type: String, required: true, unique: false},
    description: {type: String, required: true, unique: false},
    openingtime: {type: String, required: true, unique: false},
    closingtime: {type: String, required: true, unique: false},
}, {
    timestamps: true,
});


const Restaurants = mongoose.model('Restaurants', restaurantsSchema);
// Restaurants.ensureIndexes()
//This is a comment

module.exports = Restaurants;