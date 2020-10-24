const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    healthCardNum: Number,
    password: String
});

module.exports = mongoose.model('User', dataSchema, 'users');