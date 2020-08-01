const express = require('express')
var router = express.Router();
var path = require('path');

router.post('/', (req, res)=>{
   //res.sendFile(path.join(__dirname, '..', 'app', 'views', 'checkout.html'));
   res.send("cash payment page");
   console.log('opening checkout page');
 });

 module.exports = router;