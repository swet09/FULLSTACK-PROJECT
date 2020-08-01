var customer = require('../../app/models/address.model')

const express = require('express')
var router = express.Router();
var path = require('path');

const mongoose = require('mongoose');
const Address = mongoose.model('Address'); 

router.post('/', (req, res)=>{
   insertRecord(req, res);
   res.sendFile(path.join(__dirname, '..', 'app', 'views', 'checkoutStatus.html'));
   //res.send("cash payment page");
   console.log('opening checkout page');
 });

 //insert body data into db
//1. create obj of customer schema
//2. populate the field with body content
function insertRecord(req, res){
  var address = new Address();
  address.addressLine1 = req.body.addressLine1;
  address.addressLine2 = req.body.addressLine2;
  address.phoneNumber = req.body.phoneNumber;
  address.save((err, doc) => {
    if(!err){
    console.log('ok 200');
    }
      else
        console.log('got an error: ',err);
    }
  )
}

// router.get('/list', (req, res) => {
//   res.json('form list')
//   Customer.find((err, docs) => {
//     if (!err) {
//         res.render("customer/list", {
//             list: docs
//         });
//     }
//     else {
//         console.log('Error in retrieving customer list :' + err);
//     }
// })
// .lean()
// });


 module.exports = router;