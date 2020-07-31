/**
 * this file defines schema and structure of cash on delevery from document
*/
const mongoose = require('mongoose')

/**
 * customer cod address schema definition
*/
var addressSchema = new mongoose.Schema({

  /** this will be imported from users schema*/
  
  name: {
    type: String
  },

  /** Below three will be imported from the cod form in checkout.html */

  addressLine1: {
    type: String,
    required: 'this field is required'
  },
  addressLine2: {
    type: String,
    required: 'this field is required' 
  },
  phoneNumebr: {
    type: Number,
    required: 'this field is required'
  }
});

/**
 * validate Phone Number Entered.
 */
customerSchema.path('phoneNumber').validate((val) => {
  phnoRegex = /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/;
  return phnoRegex.test(val);
}, 'Invalid e-mail.');

/**
 * registering this addressSchema inside mongoose
 * */
module.exports = mongoose.model('Address', addressSchema);