const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: String,
    age: Number,
    healthCardNum: Number
});

module.exports = mongoose.model('User', dataSchema);