
var User = require('../models/user');

module.exports = function(router){
    //http:localhost:8080/api/users
router.post('/users',function(req,res){
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.save(function(err){
      if(req.body.username == null || req.body.username == ''||req.body.password == null || req.body.password == ''||req.body.email == null || req.body.email == ''  ){
  
        res.json({success: false, message: 'Ensure username, email and password were provided'});
      }
      else{
        user.save(function(err){
          if(err){
            res.json({success: false, message: 'user name or email already exist'});
          }
          else
          {
            res.json({success: true, message: 'user created!'});
          }
        });
        
      }
     
    });
   
});
return router;
}