var customer = require('../../app/models/address.model')

const express = require('express')
var router = express.Router();
var path = require('path');

const mongoose = require('mongoose');
const Address = mongoose.model('Address'); 

//router.use('/cardPay', require('./cardPay.js'));

router.get('/', (req, res)=>{
 // res.sendFile('../../public/app/views/checkout.html');
  res.sendFile(path.join(__dirname, '..', 'app', 'views', 'checkout.html'));
  console.log('opening checkout page');
  //res.json("sample text");
});

// router.post('/', (req, res) => {
//   console.log(req.body);
//   //res.json("this is card payment");
//   insertRecord(req, res);
// })

// //insert body data into db
// //1. create obj of customer schema
// //2. populate the field with body content
// function insertRecord(req, res){
//   var address = new Address();
//   address.addressLine1 = req.body.addressLine1;
//   address.addressLine2 = req.body.addressLine2;
//   address.phoneNumber = req.body.phoneNumber;
//   address.save((err, doc) => {
//     if(!err){
//     res.redirect('/list');
//     }
//       else
//         console.log('got an error: ',err);
//     }
//   )
// }

// router.get('/list', (req, res) => {
//   res.json('form list')
// //   Customer.find((err, docs) => {
// //     if (!err) {
// //         res.render("customer/list", {
// //             list: docs
// //         });
// //     }
// //     else {
// //         console.log('Error in retrieving customer list :' + err);
// //     }
// // })
// // .lean()
// });


// // router.get('/cashPay', (req, res) => {
// //   //res.sendFile(path.join(__dirname, '..', 'app', 'views', 'checkoutStatus.html'));
// //   //console.log("hey");
// //   res.send("this is card payment");
// // })

module.exports = router;

