'use strict'

var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var Comment = require('./model/comments')
var User = require('./model/users')
var Service = require('./model/services')
var items = require('./routes/items')
var comments = require('./routes/comments')
var users = require('./routes/users')
var services = require('./routes/services')
var path = require('path')

var app = express()
var router = express.Router()

var port = process.env.API_PORT || 3001;

mongoose.Promise = global.Promise
mongoose.connect('mongodb://cbdevelopers:IssaVibeCB321!@ds123556.mlab.com:23556/cbdb');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//now  we can set the route path & initialize the API
router.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../build','index.html'))
});

//Use our router configuration when we call /api
app.use(express.static(path.resolve(__dirname, 'build')))
app.use('/api', router);
app.use('/items', items);
app.use('/comments', comments);
app.use('/users', users);
app.use('/services', services);
//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
