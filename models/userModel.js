const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    healthCardNum: Number,
    password: String,
    role: String
});

module.exports = mongoose.model('User', dataSchema, 'users');