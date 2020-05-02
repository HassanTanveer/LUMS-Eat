const router = require('express').Router();

let Menu = require('../models/menuitems.model');

//Gets a specific menu item
router.route('/find/:id').get((req, res) => {
    Menu.find({RestaurantID: req.params.id, availability: "Yes"})
        .then(menuresp => res.status(200).json(menuresp))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
});

//Gets all the menu items
router.route('/all/:RestaurantID').get((req, res) => {
    Menu.find({RestaurantID: req.params.RestaurantID, availability: ["Yes", "No"]})
        .then(menuresp => res.status(200).json(menuresp))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
});

//Updates a menu item
router.route('/update/').post((req, res) => {
    Menu.findOneAndUpdate({ItemID: req.body.ItemID}, req.body.update, {useFindAndModify: false})
        .then((response) => {
            Menu.find({ItemID: req.body.ItemID})
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

//Deletes a menu item
router.route('/delete').delete((req, res) => {
    Menu.findOneAndDelete({ItemID: req.body.ItemID})
        .then(resp => res.status(200).json({
            'Status': 'Success',
            'Message': 'Done'
        }))
        .catch((err) => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
})

//Add a new menu item
router.route('/add').post((req, res) => {
    const ItemID = req.body.ItemID;
    const RestaurantID = req.body.RestaurantID;
    const name = req.body.name;
    const description = req.body.description;
    const category = req.body.category;
    const availability = req.body.availability;
    const price = req.body.price;
    const imageurl = req.body.imageurl;
    const newItem = new Menu({
        ItemID,
        RestaurantID,
        name,
        description,
        category,
        availability,
        price,
        imageurl
    });

    newItem.save()
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