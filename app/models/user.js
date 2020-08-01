var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  //var bcrypt = require('bcrypt-nodejs');

  var userSchema = new Schema({
      username : {type:String, lowercase:true, required:true, unique:true},    
      email : {type:String, lowercase:true, required:true, unique:true},
      password :{type:String, lowercase:true, required:true}
  });

  // userSchema.pre('save',function(next){
  //   var user = this;
  //   bcrypt.hash(user.password, null, null, function(err, hash){
  //     if(err) return next(err);
  //     user.password = hash;
  //     next();
  //   });
    
  // });

  userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
  }, 'Invalid e-mail.');
  

  module.exports = mongoose.model('user', userSchema);