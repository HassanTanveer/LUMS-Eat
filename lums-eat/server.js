const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

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

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

