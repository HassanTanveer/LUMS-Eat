const router = require('express').Router();

let Orders = require('../models/orders.model');

router.route('/').get((req, res) => {
    Orders.find()
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
    const OrderID = req.body.Orderid;
    const userID = req.body.userID;
    const RestaurantID = req.body.RestaurantID;
    const time = req.body.time;
    const totalPrice = req.body.totalPrice;
    const status = req.body.status;
    const Type = req.body.Type;
    const newOrder = new Orders({
        OrderID,
        userID,
        RestaurantID,
        time,
        totalPrice,
        status,
        Type});

    newOrder.save()
        .then(() => res.json('Order added!'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    
})

module.exports = router;