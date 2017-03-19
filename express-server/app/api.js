/**
 * Created by biwin on 19/3/17.
 */
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var csv = require('csvtojson');
var request = require('request');

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

const Game = mongoose.model('Game', GameSchema);


// ROUTES
router.get('/', function (req, res) {
    res.send('API Server Works!');
});


// HELPER FUNCTIONS
function InitDatabase() {
    csv()
        .fromStream(request.get('http://hck.re/fGVUJw'))
        .on('json', function (obj) {
            Game.findOne(obj, function (err, res) {
                if (!res) {
                    // Matching document not found

                    var game = new Game(obj);
                    game.save(function (error) {
                        console.log("Couldn't save the game" + error);
                    })
                }
            })
        }).on('done', function (error) {
        console.log(error);
    })
}

module.exports = router;
