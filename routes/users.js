var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var database = require('../database/database');
// var passport = require('passport');
var mongoose = require('mongoose');
var ejwt = require('express-jwt');

var auth = ejwt({
  secret : 'my secret',
  userProperty : 'payload'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req,res) {
  var newuser = new User({
    name : req.body.name,
    username : req.body.username,
    email : req.body.email,
    gender : req.body.gender,
    image : req.body.image
  });  
 
  User.find({ $or : [{username : req.body.username}, {email : req.body.email}]}, function(err,data) {
    if(err) throw err;
    else if(data.length){
      if(data[0].username == req.body.username){
        res.json({success: false, msg: "username already exists", code: 0 });
      }
      else if(data[0].email == req.body.email){
         res.json({ success : false, msg: "email already exists", code: 1 });
      }
    }
      else{
        newuser.setPassword(req.body.password);
        newuser.save(function(err,doc){
          if(err) throw err;
          var token = newuser.generateJwt();
          res.json({ 
            success : true, 
            msg: 'User Registered Successfully', 
            "token" : token,
            code: 2});
        });
      }
  });
});


router.post("/login",function(req,res){
  User.find({$or:[{username:req.body.username},{email:req.body.email}]},function(err,docs){
    if(err){
      console.log("error while executing query");
      throw err
    }else if(docs[0] != null){
      // decrypt password 
      var hash = docs[0].validPassword(req.body.password);
      // console.log("hash "+hash);
      // console.log("user details "+docs[0]);
      if(hash == true){
        var token = docs[0].generateJwt();
        res.json({ 
          email : docs[0].email,
          username : docs[0].username,
          gender : docs[0].gender,
          // image : docs[0].image,
          success : true, 
          msg : 'User logged in Successfully',
          token : token,
          code : 2});
      }
      else{
        console.log("invalid password");
        res.json({success :false, msg : 'Invalid Password', code : 1 })
      }
    }else{
      console.log("User details not present");
      res.json({ success: false, msg : 'Username not found', code : 0 });
    }
  });
});

router.get('/allusers', function(req,res) {
  User.find({}, function(err, users) {
    res.json(users)
  })
})

// router.post('/changepassword', function(req,res) {
  
// });

module.exports = router;
