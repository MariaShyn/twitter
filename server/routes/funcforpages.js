var User = require("../models/user.js").User;

exports.get = function(req,res){
    res.render("index");
};

exports.login = function(req, res, next) {
    User.findOne({email: req.body.email}, function(err, user){
        if(err) return next(err);
        if(user){
            if(user.checkPassword(req.body.password)){
                req.session.user = user._id;
                return res.end();
            } else {
                return res.send(403);
            }
        }
        else{
            return res.send(404);
        }

    })
};

exports.singup = function(req, res, next) {
    var user = new User();
    user.fullname = req.body.fullname;
    user.email = req.body.email;
    user.set('password', req.body.password);
    user.save(function(err) {
        if(err){
            console.log(err);
            return res.sendStatus(403);
        }
        else {
            req.session.user = user._id;
            return res.end();
        }
    });
};