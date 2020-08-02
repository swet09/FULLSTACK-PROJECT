//var customer = require('../../app/models/address.model')

const express = require('express')
var router = express.Router();
var path = require('path');

const mongoose = require('mongoose');
//const Address = mongoose.model('Address'); 

router.post('/', (req, res)=>{
   res.sendFile(path.join(__dirname, '..', 'app', 'views', 'checkoutPayment.html'));
 });

 
 module.exports = router;