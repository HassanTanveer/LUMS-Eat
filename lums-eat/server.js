const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );

app.use(bodyParser.json());

//Connecting to MongoDB

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then("Connected")
    .catch(err => console.log(err))

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established!")
})

//Defining routes for our MongoDB documents

const usersRoute = require('./routes/users');
const restaurantRoute = require('./routes/restaurants');
const ordersRoute = require('./routes/orders');
const menuRoute = require('./routes/menuitems');
const feedbackRoute = require('./routes/feedback');

app.use('/restaurants', restaurantRoute);
app.use('/users', usersRoute);
app.use('/orders', ordersRoute);
app.use('/menu', menuRoute);
app.use('/feedback', feedbackRoute);

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static('client/build'));
// Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

