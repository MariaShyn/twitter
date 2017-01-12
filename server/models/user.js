var crypto = require('crypto'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken');

var Schema = mongoose.Schema,

    schema = new Schema({
        mysqlid:{
            type: Number,
            unique: true,
            required: true
        },
        fullname:{
            type: String,
            required: true
        },
        salt:{
            type: String,
            required: true
        },
        created:{
            type: Date,
            default : Date.now
        },
        twits: []
});

schema.methods.addNewTwit = function(newOne){
    this.twits.push({"text": newOne.text, "date": newOne.date});
    this.save();
}

exports.User = mongoose.model('User', schema);
