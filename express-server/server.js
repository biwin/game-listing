/**
 * Created by biwin on 19/3/17.
 */
var express = require('express');
var api = require('./app/api');
var auth = require('./app/auth');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// CORS MIDDLEWARE
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    next()
});

// SET ROUTES
app.use('/', api.router);

// SET PORT
const port = process.env.PORT || '3000';
app.set('port', port);

// START SERVER
app.listen(port, function () {
    console.log('Express Server running on PORT ' + port)
});

api.init();
auth.initAuth();