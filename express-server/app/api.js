/**
 * Created by biwin on 19/3/17.
 */
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var csv = require('csvtojson');
var request = require('request');
const auth = require('../app/auth');
const passport = require('passport');

// CONNECT TO MONGO
const dbHost = 'mongodb://database/games';
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

router.get('/games', passport.authenticate('basic', { session: false }),  function (req, res) {
    var searchTerm = req.query.query;
    if (searchTerm){
        Game.find({title: { $regex: '(' + searchTerm + ')', '$options': 'i' }}, function(err, games){
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

router.get('/games/:id', passport.authenticate('basic', { session: false }), function(req, res){
    //noinspection JSUnresolvedFunction
    Game.findById(req.params.id, function(err, game){
        if (err) res.status(500).send(err);
        res.status(200).json(game);
    })
});

router.post('/users', function(req, res) {
    auth.createNewUser(req, res);
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