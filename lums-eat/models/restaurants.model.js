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

    restaurantsSchema.statics.all = req => new Promise((resolve, reject) => {
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
                .then(res => resolve(res))
                .catch(err => reject(err.errmsg))    
    })

    restaurantsSchema.statics.getbyID = req => new Promise((resolve, reject) => {
        Restaurants.findOne({RestaurantID: req.body.RestaurantID})
            .then(RestRes => {
                RestRes?resolve(RestRes):resolve(`No restaurant with ID: ${req.body.RestaurantID}`)
            })
            .catch(err => reject(`An error occured: ${err}`))
    })

    restaurantsSchema.statics.findOrders = req => new Promise ((resolve, reject) => {
        Restaurants.findOne({RestaurantID: req.body.RestaurantID})
        .then(ResResp => {
            Orders.find({RestaurantID: ResResp.RestaurantID})
                .then(OrderResp => OrderResp?resolve(OrderResp):resolve(`No orders found`))
                .catch(err => reject(`An error occured: ${err}`))
        })
        .catch(err => reject("Can't find the restaurant"));
    })

    restaurantsSchema.statics.findUserbyOrder = order_ID => new Promise((resolve, reject) => {
        User.findOne({OrderID: order_ID})
            .then(UserResp => resolve(UserResp))
            .catch(err => reject(`An error occured: ${err}`))
    })

const Restaurants = mongoose.model('Restaurants', restaurantsSchema);

module.exports = Restaurants;