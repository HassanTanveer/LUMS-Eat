const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuSchema = new Schema({
    ItemID: {
        type: String,
        required: true,
        unique: true,
    },
    RestaurantID: {
        type: String,
        required: true,
        unique: false,
    },
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    description: {
        type: String,
        required: false,
        unique: false,
    },
    category: {
        type: String,
        required: false,
        unique: false
    },
    availability: {
        type: String,
        required: false,
        unique: false
    },
    price: {
        type: Number,
        required: true,
        unique: false,
    },
    imageurl: {
        type: String,
        required: false,
        unique: false,
    },
   
}, {
    timestamps: true,
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;