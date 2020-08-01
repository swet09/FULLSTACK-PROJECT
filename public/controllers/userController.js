var user = require('../../app/models/user')

const express = require('express')
var router = express.Router();
var path = require('path');

const mongoose = require('mongoose');
const User = mongoose.model('user'); 

router.post('/', (req, res)=>{
    insertRecord(req, res);
    res.sendFile(path.join(__dirname, '..', 'app', 'views', 'index.html'));
    //res.send("cash payment page");
    console.log('user added');
  });

  function insertRecord(req, res){
    var user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
      if(!err){
      console.log('ok 200');
      }
        else
          console.log('got an error: ',err);
      }
    )
  }

  module.exports = router;


