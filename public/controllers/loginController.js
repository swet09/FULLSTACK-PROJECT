var user = require('../../app/models/user')

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const express = require('express')
var router = express.Router();
var path = require('path');

const mongoose = require('mongoose');
const User = mongoose.model('user'); 



  router.post('/', function(req, res){
   
    var username = req.body.username;
    
    var password = req.body.password;
    
    user.findOne({username: username , password:password}, function(err, user) {
        
      if(err) {
        console.log(err);
        return res.status(500).send();
      }
      if(!user){
        //res.sendFile(path.join(__dirname, '..', 'app', 'views', 'index.html'));
        return res.status(404).send();
      }
      else{
        res.sendFile(path.join(__dirname, '..', 'app', 'views', 'index.html'));
        //return res.status(200).send();
      }
      
      
    })
  });

  

  module.exports = router;


