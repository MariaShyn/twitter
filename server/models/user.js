var crypto = require('crypto');


var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
    fullname:{
        type: String,
        required: true
    },
    hashedPassword:{
        type: String,
        required:true
    },
    salt:{
        type: String,
        required: true
    },
    created:{
        type: Date,
        default : Date.now
    },
    twits: [String]
});

schema.methods.encryptPassword = function(password){
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function(password){
            this._plainPassword = password;
            this.salt = Math.random() +'';
            this.hashedPassword = this.encryptPassword(password);
        })
    .get(function(){return this._plainPassword;});

schema.methods.checkPassword = function(password){
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.methods.addNewTwit = function(newOne){
    this.twits.push(newOne);
    this.save();
}


exports.User = mongoose.model('User', schema);
