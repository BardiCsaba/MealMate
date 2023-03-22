const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Food = db.model('Food', {
    name: String,
    description: String,
    price: Number,
});

module.exports = Food;