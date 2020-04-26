const router = require('express').Router();

let Orders = require('../models/orders.model');
let Users = require('../models/user.model');
let Menu = require('../models/menuitems.model');


router.route('/').get((req, res) => {
    Orders.find()
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
});

router.route('/new').get((req, res) => {
    Orders.find({status: "New"})
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/all').get((req, res) => {
    Orders.find({status: ["Pending", "Dispatched"]})
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
    const OrderID = req.body.OrderID;
    const userID = req.body.userID;
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

router.route('/update/').post((req, res) => {
    Orders.findOneAndUpdate({OrderID: req.body.OrderID}, req.body.update, {useFindAndModify: false})
        .then((response) => res.json(response))
        .catch((err) => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
})

router.route('/:OrderID/items').get((req, res) => {
    Orders.findOne({OrderID: req.params.OrderID})
        .then((response) => res.status(200).json(response.items))
        .catch((err) => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
})

module.exports = router;