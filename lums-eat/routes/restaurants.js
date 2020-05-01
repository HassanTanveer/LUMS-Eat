const router = require('express').Router();

let Restaurant = require('../models/restaurants.model');
let Orders = require('../models/orders.model');
let User = require('../models/user.model');

//Gets all the restaurants
router.route('/').get((req, res) => {
    Restaurant.find()
        .then(RestaurantFind => res.json(RestaurantFind))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
});

//Gets a specific restaurant by its ID
router.route('/id').get((req, res) => {
    Restaurant.getbyID(req)
        .then(resp => res.status(200).json(resp))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
});

//Get restaurant's status
router.route('/s/:RestaurantID').get((req, res) => {
    Restaurant.findOne({RestaurantID: req.params.RestaurantID})
    .then(statusresp => res.json(statusresp))
    .catch((err) => res.status(400).json({
        'Status': 'Failed',
        'Message': `${err}`
    }))
})

//Adds a new restaurant
router.route('/add').post((req, res) => {
    Restaurant.all(req)
        .then(resp => res.status(200).json(resp))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
})

//Delets a restaurant
router.route('/delete').delete((req, res) => {
    Restaurant.findOneAndDelete({RestaurantID: req.body.RestaurantID})
        .then(() => res.status(200).json({
            'Status': 'Success',
            'Message': `Done`
        }))
        .catch((err) => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
})

//Updates restaurant information
router.route('/update/').post((req, res) => {
    Restaurant.findOneAndUpdate({RestaurantID: req.body.RestaurantID}, req.body.update, {useFindAndModify: false})
        .then((response) => {
            Restaurant.getbyID(req)
                .then(resp => res.status(200).json(resp))
                .catch(err => res.status(400).json({
                    'Status': 'Failed',
                    'Message': `${err}`
                }))
        })
        .catch((err) => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
})

//Gets the orders of the restaurants
router.route('/Orders').get((req, res) =>{
    Restaurant.findOrders(req)
        .then(resp => res.status(200).json(resp))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
})

//Gets the users that have orders pending from a restuarant
router.route('/User').get((req, res) => {
    Restaurant.findUserbyOrder(req.orderID)
        .then(resp => res.status(200).json(resp))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
});

//Gets the user of a specific orders
router.route('/OrderUser').get((req, res) =>{
    Restaurant.findOrders(req)
        .then(resp => {
            Restaurant.findUserbyOrder(resp.orderID)
            .then(userresp => res.status(200).json(userresp))
            .catch(err => res.status(400).json({
                'Status': 'Failed',
                'Message': `${err}`
            }))
        })
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
})



module.exports = router;