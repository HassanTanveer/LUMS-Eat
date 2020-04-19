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
    Restaurant.getbyID(req, (err, resp) => {
        if(err != null){
            res.status(400).json(`Error occured: while fetching: ${err}`)
        }
        if(resp != null)
            res.status(200).json(resp)
        else
            res.status(200).json(`No restaurant with ID: ${req.body.RestaurantID}`)
    })
});

router.route('/add').post((req, res) => {
    Restaurant.all(req, (err, resp)=>{
        if(err != null){
            res.status(400).json(err)
        }  
        else
            res.status(200).json(resp)
    })
})

router.route('/delete').delete((req, res) => {
    Restaurant.findByIdAndDelete(req.body.RestaurantID)
        .then(() => res.status(200).json("Restuarant deleted"))
        .catch((err) => res.status(400).json(`Error: ${err}`))
})

router.route('/update/').post((req, res) => {
    Restaurant.findOneAndUpdate({RestaurantID: req.body.RestaurantID}, req.body.update, {useFindAndModify: false})
        .then((response) => {
            Restaurant.getbyID(req, (err, resp) => {
                if(err != null)
                    res.status(200).json(`Error in fetching details: ${err}`)
                if(resp != null)
                    res.status(200).json(resp)
                else
                    res.status(400).json(`No restaurant with ID: ${req.body.RestaurantID}`)
            })
        })
        .catch((err) => res.status(400).json(`Error in updating: ${err}`))
})

router.route('/Orders').get((req, res) =>{
    Restaurant.findOrders(req, (err, resp) => {
        if(err != null)
            res.status(400).json(err)
        if(resp != null)
            res.status(200).json(resp)
        else
            res.status(200).json("No orders found")
    })
})

router.route('/User').get((req, res) => {
    Restaurant.findUserbyOrder(req.orderID, (err, resp) => {
        if(err != null)
            res.status(400).json(err)
        if(resp != null)
            res.status(200).json(resp)
        else
            res.status(200).json("No user found")
    })
});

module.exports = router;