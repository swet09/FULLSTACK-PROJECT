var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var bcrypt = require('bcrypt-nodejs');

  var userSchema = new Schema({
      username : {type:String, lowercase:true, required:true, unique:true},    
      email : {type:String, lowercase:true, required:true, unique:true},
      password :{type:String, lowercase:true, required:true}
  });

  // Method to compare passwords in API (when user logs in) 
  userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password); // Returns true if password matches, false if doesn't
};

  module.exports = mongoose.model('user', userSchema);