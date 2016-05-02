var express = require('express');
var bodyParser = require('body-parser'); // GET/POST

var app = express();

var server = "http://hungry-hungry-hipster.herokuapp.com";

// app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
  db = databaseConnection;
});
