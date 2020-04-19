const router = require('express').Router();

let Menu = require('../models/menuitems.model');

router.route('/').get((req, res) => {
    Menu.find()
        .then(orders => res.status(200).json(orders))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
    const ItemID = req.body.ItemID;
    const RestaurantID = req.body.RestaurantID;
    const name = req.body.name;
    const description = req.body.description;
    const category = req.body.category;
    const availability = req.body.availability;
    const price = req.body.price;
    const newItem = new Menu({
        ItemID,
        RestaurantID,
        name,
        description,
        category,
        availability,
        price
    });

    newItem.save()
        .then(() => res.status(200).json('Item added!'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    
})

module.exports = router;