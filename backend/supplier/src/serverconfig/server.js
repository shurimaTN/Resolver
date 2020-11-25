const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { dir } = require('console');

const app = express();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.set('port', process.env.PORT || 3002);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

console.log(__dirname)
app.use(bodyParser.urlencoded({ extended: false }));
app.use('hello',()=>{console.log("hellosss")})

module.exports = app;