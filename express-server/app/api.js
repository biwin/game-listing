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

router.get('/games', function (req, res) {
    Game.find({}, function(err, games){
        if (err) res.status(500).send(err);
        res.status(200).json(games)
    })
});

router.get('/games/:id', function(req, res){
    Game.findById(req.params.id, function(err, game){
        if (err) res.status(500).send(err);
        res.status(200).json(game);
    })
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
                    game.save()
                }
            })
        }).on('done', function (error) {
        console.log(error);
    })
}

module.exports =  {
    router: router,
    init: InitDatabase
};
