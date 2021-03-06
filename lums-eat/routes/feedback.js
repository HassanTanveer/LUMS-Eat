const router = require('express').Router();

let Fback = require('../models/feedback.model')

//Gets the feedbacks of a specific restaurant
router.route('/byrestaurant/:RestaurantID').get((req, res) => {
    Fback.find({RestaurantID: req.params.RestaurantID})
        .then(feedbackresp => res.status(200).json(feedbackresp))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
});

//Gets the feedbacks provided by a specific users
router.route('/byuser/:UserID').get((req, res) => {
    Fback.find({UserID: req.params.UserID})
        .then(feedbackresp => res.status(200).json(feedbackresp))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))       
})

//Gets all the feedbacks
router.route('/all').get((req, res) => {
    Fback.find()
        .then(feedbackresp => res.status(200).json(feedbackresp))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
});

//Add new feedback
router.route('/add').post((req, res) => {
    const UserID = req.body.UserID
    // const ItemID = req.body.ItemID;
    const OrderID = req.body.OrderID
    const RestaurantID = req.body.RestaurantID;
    const Rating = req.body.Rating;
    const Feedback = req.body.Feedback

    const newfeedback = new Fback({
        UserID,
        // ItemID,
        OrderID,
        RestaurantID,
        Rating,
        Feedback
    });

    newfeedback.save()
        .then(() => res.status(200).json({
            'Status': 'Success',
            'Message': 'Done'
        }))
        .catch((err) => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))

})

module.exports = router;