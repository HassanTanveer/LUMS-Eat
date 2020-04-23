const router = require('express').Router();

let Restaurant = require('../models/restaurants.model');
let Orders = require('../models/orders.model');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    Restaurant.find()
        .then(RestaurantFind => res.json(RestaurantFind))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
});

router.route('/id').get((req, res) => {
    Restaurant.getbyID(req)
        .then(resp => res.status(200).json(resp))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
});

router.route('/add').post((req, res) => {
    Restaurant.all(req)
        .then(resp => res.status(200).json(resp))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
})

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

router.route('/Orders').get((req, res) =>{
    Restaurant.findOrders(req)
        .then(resp => res.status(200).json(resp))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
})

router.route('/User').get((req, res) => {
    Restaurant.findUserbyOrder(req.orderID)
        .then(resp => res.status(200).json(resp))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
});

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