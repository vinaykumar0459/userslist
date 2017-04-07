var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var db = require('../database/database');

var user = mongoose.Schema({
    name : String,
    username : { type: String },  
    email : { type: String },
    gender : String,
    hash : String,
    salt : String,
    image : String
});


user.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

user.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

user.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id : this._id,
    email : this.email,
    name : this.name,    
    username : this.username,
    exp : parseInt(expiry.getTime()/ 1000),
  }, "my secret");
}

module.exports = mongoose.model('apps', user);