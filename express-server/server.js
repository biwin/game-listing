/**
 * Created by biwin on 19/3/17.
 */
var express = require('express');
var app = express();


app.get('/', function (req, res) {
    res.send('API Server Works!');
});


app.listen(3000, function () {
    console.log('Express Server running on PORT 3000')
});