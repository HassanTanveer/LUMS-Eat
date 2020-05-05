const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");


let User = require('../models/user.model');
let Order = require('../models/orders.model');
let Restaurant = require('../models/restaurants.model');


// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const validateChangeInfoInput = require("../validation/changeinfo");
const validateChangePassInput = require("../validation/changepass");
const validateResetPassInput = require("../validation/resetpass");

router.get("/security/:email", (req, res) => {
    const { errors, isValid } = validateResetPassInput(req.params);
    // Check validation
    if (!isValid) {
        return res.json({"Errors": errors});
    }

    const email = req.body.email;
    User.findOne({email: req.params.email})
        .then((response) => res.json(response.question))
        .catch((err) => {
            console.log(err)
            res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
    })})
});

router.post("/checkanswer", (req, res) => {

    User.findOne({email: req.body.email})
        .then((response) => {
            if(response.answer == req.body.answer){
                res.json("Correct")
            }
            else{
                res.json({
                    'Status': 'Failed',
                    'Message': "Answer not matched"
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
    })})
});

router.post("/changeinfo", (req, res) => {
    const { errors, isValid } = validateChangeInfoInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const number = req.body.number;

    const update = {
        "name": name,
        "email": email,
        "address": address,
        "number": number
    }

    User.findOneAndUpdate({userID: req.body.userID}, update, {useFindAndModify: false})
        .then((response) => {
            User.findOne({userID: req.body.userID})
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
});

router.post("/changepass", (req, res) => {
    console.log(req.body)
    const { errors, isValid } = validateChangePassInput(req.body);
    // Check validation
    if (!isValid) {
        return res.json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        const newpassword =  req.body.newpassword
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newpassword, salt, (err, hash) => {
                if (err) throw err;
                console.log(hash)
                update = {
                    "password": hash
                };
                User.findOneAndUpdate({email: req.body.email}, update, {useFindAndModify: false})
                .then((response) => {
                    User.findOne({userID: req.body.userID})
                        .then(resp => res.status(200).json("Success"))
                        .catch(err => res.status(400).json("Error"))
                })
                .catch((err) => res.status(400).json("Error"))
            });
        });
    });
});

router.post("/changepass", (req, res) => {
    const { errors, isValid } = validateChangePassInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ userID: req.body.userID }).then(user => {
        const oldpassword =  req.body.oldpassword
        const newpassword =  req.body.newpassword
        // Hash password before saving in database
        bcrypt.compare(oldpassword, user.password).then(isMatch => {
            if (isMatch) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newpassword, salt, (err, hash) => {
                        if (err) throw err;
                        console.log(hash)
                        update = {
                            "password": hash
                        };
                        User.findOneAndUpdate({userID: req.body.userID}, update, {useFindAndModify: false})
                        .then((response) => {
                            User.findOne({userID: req.body.userID})
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
                    });
                });
            } else {
            return res
                .status(400)
                .json({ passwordincorrect: "Old Password incorrect" });
            }
        });
    });
});

//Registration route
router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {s
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: (req.body.email).toLowerCase(),
                password: req.body.password,
                userID: req.body.userID,
                number: req.body.number,
                address: req.body.address,
                question: req.body.question,
                answer: req.body.answer,
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
            });
        }
    });
});

router.post("/login", (req, res) => {
        // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
        // Check validation
    if (!isValid) {
    return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    const isRest = req.body.isRest;

    if(isRest){
        Restaurant.findOne({ email }).then(rest => {
            // Check if restaurant exists
            if (!rest) {
                return res.status(404).json({ emailnotfound: "Email not found" });
            }
            // Check password
            if(password == rest.password){
                const payload = {
                    id: rest.id,
                    name: rest.name,
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                    expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token,
                        email: rest.email,
                        name: rest.name,
                        restID: rest.RestaurantID,
                        isRest: "true"
                    });
                    }
                );
                } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
                }
            });
    }
    if(!isRest){
        User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
            // Create JWT Payload
            const payload = {
                id: user.id,
                name: user.name
            };
            // Sign token
            jwt.sign(
                payload,
                keys.secretOrKey,
                {
                expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                res.json({
                    success: true,
                    token: "Bearer " + token,
                    email: user.email,
                    name: user.name,
                    userID: user.userID,
                    address: user.address,
                    number: user.number
                });
                }
            );
            } else {
            return res
                .status(400)
                .json({ passwordincorrect: "Password incorrect" });
            }
        });
        });
    }
});

//Gets all the users
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
});

//Adds a new user
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

//Will be modified after implementation of the authentication system
router.route('/neworders/:userID').get((req, res) => {
    Order.find({userID:req.params.userID, status: "New"})
        .then(orders => res.status(200).json(orders))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
});

//Will be modified after implementation of the authentication system
router.route('/pendingorders/:userID').get((req, res) => {
    Order.find({userID:req.params.userID, status: ["Pending", "Dispatched"]})
        .then(orders => res.status(200).json(orders))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
});

//Will be modified after implementation of the authentication system
router.route('/completedorders/:userID').get((req, res) => {
    Order.find({userID:req.params.userID, status: "Complete"})
        .then(orders => res.status(200).json(orders))
        .catch(err => res.status(400).json({
            'Status': 'Failed',
            'Message': `${err}`
        }))
});




module.exports = router;