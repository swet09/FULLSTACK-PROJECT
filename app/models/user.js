var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var userSchema = new Schema({
      username : {type:String, lowercase:true, required:true, unique:true},
      password :{type:String, lowercase:true, required:true},
      email : {type:String, lowercase:true, required:true, unique:true}
  });

  module.exports = mongoose.model('User', userSchema);