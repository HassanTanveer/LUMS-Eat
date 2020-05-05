const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userID: {
        type: String,
        required: false,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: false
    },
    password: {
        type: String,
        required: true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: false,
        unique: false
    },
    number: {
        type: Number,
        required: false,
        unique: false,
    },
    question: {
        type: String,
        required: true,
        unique: false
    },
    answer: {
        type: String,
        required: true,
        unique: false,
    },
   
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;