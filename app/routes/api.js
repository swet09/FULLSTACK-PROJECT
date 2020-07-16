
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
        res.send('Ensure username, email and password were provided');
      }
      else{
        if(err){
          res.send('user name or email already exist');
        }
        else
        {
          res.send('user created!');
        }
      }
     
    });
   
});
return router;
}