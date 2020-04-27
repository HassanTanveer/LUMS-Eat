const router = require('express').Router();

let User = require('../models/user.model');
let Order = require('../models/orders.model');


router.route('/').get((req, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
});

router.route('/add').post((req, res) => {
    const userID = req.body.userID;
    const username = req.body.username;
    const email = req.body.email;
    const address = req.body.address;
    const number = req.body.number;

    const newUser = new User({
        userID,
        username,
        email,
        address,
        number
    });

    newUser.save()
        .then(() => res.status(200).json({
            'Status': 'Success',
            'Message': `Done`
        }))
        .catch((err) => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
    
})

router.route('/neworders').get((req, res) => {
    Order.find({status: "New"})
        .then(orders => res.status(200).json(orders))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
});

router.route('/pendingorders').get((req, res) => {
    Order.find({status: ["Pending", "Dispatched"]})
        .then(orders => res.status(200).json(orders))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
});

router.route('/completedorders').get((req, res) => {
    Order.find({status: "Complete"})
        .then(orders => res.status(200).json(orders))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
});


module.exports = router;