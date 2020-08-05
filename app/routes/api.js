
var User = require('../models/user');

module.exports = function(router){

  //user registeration
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
  
  // Route for user logins
  router.post('/authenticate', function(req, res) {
    var loginUser = (req.body.username).toLowerCase(); // Ensure username is checked in lowercase against database
    User.findOne({ username: loginUser }).select('email username password').exec(function(err, user) {
      if (err) {
         
          res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
      } else {
        // Check if user is found in the database (based on username)           
        if (!user) {
            res.json({ success: false, message: 'Username not found' }); // Username not found in database
        } else if (user) {
          // Check if user does exist, then compare password provided by user
          if (!req.body.password) {
              res.json({ success: false, message: 'No password provided' }); // Password was not provided
          } else {
            var validPassword = user.comparePassword(req.body.password); // Check if password matches password provided by user 
            if (!validPassword) {
                res.json({ success: false, message: 'Could not authenticate password' }); // Password does not match password in database
            } else {
              //var token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h' }); // Logged in: Give user token
              res.json({ success: true, message: 'User authenticated!'}); // Return token in JSON object to controller
            }
          }
        }
      }
    });
  });


return router;
};