var express = require('express');

var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = require('./server/config');
var mongoose = require('./server/libs/mongoose.js');


var app = express();

app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'client')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var MongoStore = require('connect-mongo')(session);


app.use(session({
  secret : config.get('session:secret'),
  key : config.get('session:key'),
  cookie : config.get('session:cookie'),
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  resave: true,
  saveUninitialized: true
}));

app.use(require('./server/libs/loadUser'));
require("./server/routes")(app);


module.exports = app;
