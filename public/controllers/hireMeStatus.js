const express = require('express')
var router = express.Router();
var path = require('path');

const mongoose = require('mongoose');

router.get('/', (req, res)=>{
   res.sendFile(path.join(__dirname, '..', 'app', 'views', 'hireMeStatus.html'));
   console.log('opening checkout page');
 });


 module.exports = router;