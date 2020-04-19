const mongoose = require('mongoose');
let Orders = require('../models/orders.model');
let User = require('../models/user.model');

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

    restaurantsSchema.statics.all = function all(req, callback){
            const RestaurantID = req.body.RestaurantID;
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;
            const rating = req.body.rating;
            const imageurl = req.body.imageurl;
            const address = req.body.address;
            const number = req.body.number;
            const category = req.body.category;
            const description  = req.body.description;
            const openingtime = req.body.openingtime;
            const closingtime = req.body.closingtime;
            
            const newRestaurant = new Restaurants({
                RestaurantID,
                name,
                email,
                password,
                address,
                number,
                imageurl,
                rating,
                category,
                description,
                openingtime,
                closingtime
            });

            newRestaurant.save()
                .then(res => callback(null, res))
                .catch(err => callback(err.errmsg, null))    
    }

    restaurantsSchema.statics.getbyID = function getbyID (req, callback) {
            Restaurants.findOne({RestaurantID: req.body.RestaurantID})
                .then(RestRes => callback(null, RestRes))
                .catch(err => callback(err, null))
    }

    restaurantsSchema.statics.findOrders = function findOrders (req, callback) {
        Restaurants.findOne({RestaurantID: req.body.RestaurantID})
        .then(ResResp => {
            Orders.findOne({RestaurantID: ResResp.RestaurantID})
                .then(OrderResp => callback(null, OrderResp))
                .catch(err => callback(`An error occured: ${err}`, null))
        })
        .catch(err => callback("Can't find the restaurant", null));
    }

    restaurantsSchema.statics.findUserbyOrder = function findbyOrder (order_ID, callback) {
        User.findOne({OrderID: order_ID})
            .then(UserResp => callback(null, UserResp))
            .catch(err => callback(`An error occured: ${err}`, null))
    }

const Restaurants = mongoose.model('Restaurants', restaurantsSchema);

module.exports = Restaurants;