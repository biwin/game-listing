/**
 * Created by biwin on 19/3/17.
 */
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();


// CONNECT TO MONGO
const dbHost = 'mongodb://localhost:27017/';
mongoose.connect(dbHost);


// DATABASE MODELS

const GameSchema = mongoose.Schema({
    title: String,
    platform: String,
    score: Number,
    genre: String,
    editors_choice: Boolean
});




// ROUTES
router.get('/', function (req, res) {
    res.send('API Server Works!');
});


module.exports = router;
