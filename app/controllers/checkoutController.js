/** In this file we deal with operations realted to customer checkout page */

var customer = require('../models/address.model')
const express = require('express')

var router = express.Router();

/**import the database schemas */
const mongoose = require('mongoose')
const Customer = mongoose.model('Customer') 

