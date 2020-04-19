const router = require('express').Router();

let Menu = require('../models/menuitems.model');

router.route('/find/:id').get((req, res) => {
    Menu.find({RestaurantID: req.params.id})
        .then(menuresp => res.status(200).json(menuresp))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update/').post((req, res) => {
    Menu.findOneAndUpdate({ItemID: req.body.ItemID}, req.body.update, {useFindAndModify: false})
        .then((response) => {
            Menu.find({ItemID: req.body.ItemID})
                .then(resp => resp?res.status(200).json(resp):res.status(200).json(`No menu with ID: ${req.body.ItemID}`))
                .catch(err => res.status(400).json(`Error in fetching details: ${err}`))
        })
        .catch((err) => res.status(400).json(`Error in updating: ${err}`))
})

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
        .then(() => res.status(200).json('Item added!'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    
})

module.exports = router;