const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    UserID: {
        type: String,
        required: true,
        unique: false
    },

    // ItemID: {
    //     type: String,
    //     required: true,
    //     unique: false
    // },

    OrderID: {
        type: String,
        required: true,
        unique: true
    },

    RestaurantID: {
        type: String,
        required: true,
        unique: false
    },

    Feedback: {
        type: String,
        required: false,
        unique: false
    }
});

const Fback = mongoose.model('Feedback', feedbackSchema)

module.exports = Fback