var User = require('../models/user').User;
var HttpError = require('../libs/HttpError').HttpError;
var log = require("../libs/log");
var checkAuth = require("../libs/checkAuth");
var somefunc = require("./funcforpages");

module.exports = function(app) {

  app.get('/', function(req,res){
    res.render("index");
  });

  app.post('/', somefunc.login);
  app.post('/signup', somefunc.singup);
  app.post('/logout', function(req,res){
    req.session.destroy();
    res.redirect('/');
  });

  app.post('/newtwit', function(req,res){
    req.user.addNewTwit(req.body);
    res.end();
  });

  app.get('/profile', checkAuth, function(req,res,next){
    User.findById(req.session.user, function(err, user){
      if(err) return err;
      res.send(user);
    })
  });

  app.get('/error', function(req, res, next) {
    var error = {
      status : 500
    };
    req.query.message ? error.message = req.query.message : error.message = 'unknown error';
    return res.render('error', {error : error});
  });

  app.use(function(req,res,next){
    return next(new HttpError(404, 'Page was not found'))
  });

  app.use(function(err, req, res, next) {
    res.sendHttpError = function (error) {
      res.status(error.status);
      if (req.headers['x-requested-with'] == 'XMLHttpRequest') {
        res.json(error);
      } else {
        var errObj = {
          error : error
        };
        res.render('error', {error : error});
      }
    };
    if (typeof err == 'number') {
      err = new HttpError(err);
    }
    if (err instanceof HttpError) {
      res.sendHttpError(err);
    } else {
      //log.error(err);
      var error = new HttpError(500,"Server Error",err.stack);
      res.sendHttpError(error);
    }
  });

  process.on('uncaughtException', function (err) {
    console.log(err);
  });

};
