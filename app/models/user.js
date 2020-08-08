var mongoose = require('mongoose');
  var Schema = mongoose.Schema; // Assign Mongoose Schema function to variable to defined a table schema
  var bcrypt = require('bcrypt-nodejs'); // for encrypting 

  var userSchema = new Schema({
      username : {type:String, lowercase:true, required:true, unique:true},    
      email : {type:String, lowercase:true, required:true, unique:true},
      password :{type:String, required:true}
  });


  // Middleware to encrypted password before saving user to database
//UserSchema.pre('save', function(next) {
  
  // Function to encrypt password 
  //bcrypt.hash(user.password, null, null, function(err, hash) {
  //    if (err) return next(err); // Exit if error is found
   //   user.password = hash; // Assign the hash to the user's password so it is saved in database encrypted
    //  next(); // Exit Bcrypt function
 // });
//});

  // Method to compare passwords  
  userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password); // Returns true if password matches, false if doesn't
};

  module.exports = mongoose.model('user', userSchema); // Export User Model in API