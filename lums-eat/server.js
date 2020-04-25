const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then("Connected")
    .catch(err => console.log(err))

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established!")
})

const usersRoute = require('./routes/users');
const restaurantRoute = require('./routes/restaurants');
const ordersRoute = require('./routes/orders');
const menuRoute = require('./routes/menuitems');


app.use('/restaurants', restaurantRoute);
app.use('/users', usersRoute);
app.use('/orders', ordersRoute);
app.use('/menu', menuRoute);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

