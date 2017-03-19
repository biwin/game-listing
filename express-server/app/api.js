/**
 * Created by biwin on 19/3/17.
 */
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var csv = require('csvtojson');
var request = require('request');

// CONNECT TO MONGO
const dbHost = 'mongodb://database/games-docked';
mongoose.connect(dbHost);


// DATABASE MODELS

const GameSchema = mongoose.Schema({
    title: String,
    platform: String,
    score: Number,
    genre: String,
    editors_choice: String
});

const Game = mongoose.model('Game', GameSchema);


// ROUTES
router.get('/', function (req, res) {
    res.send('API Server Works!');
});

router.get('/games', function (req, res) {
    var searchTerm = req.query.query;
    if (searchTerm.length>=1){
        Game.find({title: { $regex: '.*' + searchTerm + '*.' }}, function(err, games){
            if (err){
                res.status(404).json({message: "No records found"});
            }
            res.status(200).json(games)
        })
    } else {
    Game.find({}, function(err, games) {
        if (err) res.status(404).json({message: "No records found"});
        res.status(200).json(games)
    })
    }
});

router.get('/games/:id', function(req, res){
    //noinspection JSUnresolvedFunction
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
