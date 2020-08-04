var customer = require('../../app/models/address.model')

const express = require('express')
var router = express.Router();
var path = require('path');

const mongoose = require('mongoose');
const user = mongoose.model('user'); 

router.get('/', (req, res)=>{
   res.sendFile(path.join(__dirname, '..', 'app', 'views', 'hireMe.html'));
   console.log('opening hireMe page');
 });


 module.exports = router;