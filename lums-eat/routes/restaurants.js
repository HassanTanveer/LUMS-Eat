const router = require('express').Router();

let Restaurant = require('../models/restaurants.model');
let Orders = require('../models/orders.model');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    Restaurant.find()
        .then(RestaurantFind => res.json(RestaurantFind))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

router.route('/id').get((req, res) => {
    Restaurant.getbyID(req)
        .then(resp => res.status(200).json(resp))
        .catch(err => res.status(400).json(err))
});

router.route('/add').post((req, res) => {
    Restaurant.all(req)
        .then(resp => res.status(200).json(resp))
        .catch(err => res.status(400).json(err))
})

router.route('/delete').delete((req, res) => {
    Restaurant.findByIdAndDelete(req.body.RestaurantID)
        .then(() => res.status(200).json("Restuarant deleted"))
        .catch((err) => res.status(400).json(`Error: ${err}`))
})

router.route('/update/').post((req, res) => {
    Restaurant.findOneAndUpdate({RestaurantID: req.body.RestaurantID}, req.body.update, {useFindAndModify: false})
        .then((response) => {
            Restaurant.getbyID(req)
                .then(resp => resp?res.status(200).json(resp):res.status(200).json(`No restaurant with ID: ${req.body.RestaurantID}`))
                .catch(err => res.status(400).json(`Error in fetching details: ${err}`))
        })
        .catch((err) => res.status(400).json(`Error in updating: ${err}`))
})

router.route('/Orders').get((req, res) =>{
    Restaurant.findOrders(req)
        .then(resp => res.status(200).json(resp))
        .catch(err => res.status(400).json(err))
})

router.route('/User').get((req, res) => {
    Restaurant.findUserbyOrder(req.orderID)
        .then(resp => res.status(200).json(resp))
        .catch(err => res.status(400).json(err))
});

router.route('/OrderUser').get((req, res) =>{
    Restaurant.findOrders(req)
        .then(resp => {
            Restaurant.findUserbyOrder(resp.orderID)
            .then(userresp => res.status(200).json(userresp))
            .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err))
})



module.exports = router;