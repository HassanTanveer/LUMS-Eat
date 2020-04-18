const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    OrderID: {
        type: String,
        required: true,
        unique: true,
    },
    userID: {
        type: String,
        required: true,
        unique: false,
    },
    RestaurantID: {
        type: String,
        required: true,
        unique: false,
    },
    time: {
        type: Date,
        required: true,
        unique: false,
    },
    totalPrice: {
        type: Number,
        required: true,
        unique: false,
    },
    status: {
        type: String,
        required: true,
        unique: false,
    },
    Type: {
        type: String,
        required: true,
        unique: false,
    },
   
}, {
    timestamps: true,
});

const Orders = mongoose.model('Orders', ordersSchema);

module.exports = Orders;