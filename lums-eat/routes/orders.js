const router = require('express').Router();

let Orders = require('../models/orders.model');
let Users = require('../models/user.model');
let Menu = require('../models/menuitems.model');


//Gets all the orders
router.route('/').get((req, res) => {
    Orders.find()
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
});

//Gets the orders with the status "New"
router.route('/new/:RestaurantID').get((req, res) => {
    Orders.find({RestaurantID: req.params.RestaurantID, status: "New"})
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

//Gets the orders with the status "Pending" or "Dispatched"
router.route('/all/:RestaurantID').get((req, res) => {
    Orders.find({RestaurantID: req.params.RestaurantID, status: ["Pending", "Dispatched"]})
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

//Gets the orders with the status "Complete"
router.route('/complete/:RestaurantID').get((req, res) => {
    Orders.find({RestaurantID: req.params.RestaurantID, status: "Complete"})
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/complete/:Date/:RestaurantID').get((req, res) => {
    Orders.find({RestaurantID: req.params.RestaurantID, status: "Complete", createdAt: { $gte : new Date(req.params.Date).toISOString() } })
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

//Adds a new order
router.route('/add').post((req, res) => {
    const OrderID = req.body.OrderID;
    const userID = req.body.userID;
    const userName = req.body.userName;
    const userContact = req.body.userContact;
    const userAddress = req.body.userAddress;
    const items = req.body.items;
    const RestaurantID = req.body.RestaurantID;
    const time = req.body.time;
    const totalPrice = req.body.totalPrice;
    const status = req.body.status;
    const Type = req.body.Type;

    const newOrder = new Orders({
        OrderID,
        userID,
        userName,
        userContact,
        userAddress,
        items,
        RestaurantID,
        time,
        totalPrice,
        status,
        Type
    });

    newOrder.save()
        .then(() => res.status(200).json({
            'Status': 'Success',
            'Message': `Done`
        }))
        .catch((err) => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
    
})

//Updates the order information
router.route('/update/').post((req, res) => {
    Orders.findOneAndUpdate({OrderID: req.body.OrderID}, req.body.update, {useFindAndModify: false})
        .then((response) => res.json(response))
        .catch((err) => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
})

//Gets the items of a specific order
router.route('/:OrderID/items').get((req, res) => {
    Orders.findOne({OrderID: req.params.OrderID})
        .then((response) => res.status(200).json(response.items))
        .catch((err) => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
})

module.exports = router;