var mongoose = require('mongoose');
  var Schema = mongoose.Schema; // Assign Mongoose Schema function to variable to defined a table schema
  var bcrypt = require('bcrypt-nodejs'); // for encrypting 

  //user table definition
  var userSchema = new Schema({
      username : {type:String, lowercase:true, required:true, unique:true},    
      email : {type:String, lowercase:true, required:true, unique:true},
      password :{type:String, required:true}
  });

  // Method to compare passwords  
  userSchema.methods.comparePassword = function(password) 
  {
  return bcrypt.compareSync(password, this.password); // Returns true if password matches, false if doesn't
  };

  module.exports = mongoose.model('user', userSchema); // Export User Model in API