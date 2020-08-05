
var User = require('../models/user');
var jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer')
var secret = 'fullstack'

module.exports = function(router){

  const client = nodemailer.createTransport({
    service: "gmail.com",
    auth: {
        user: 'fullstackprojectpdx@gmail.com', // Your email address
        pass: 'Melcow1#' // Your password
}
});

  //user registeration
    //http:localhost:8080/api/users
router.post('/users',function(req,res){
  var user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;
  //for activation of account using mail
  user.temporarytoken = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h' });

  if (req.body.username === null || req.body.username === '' || req.body.password === null || req.body.password === '' || req.body.email === null || req.body.email === '' || req.body.name === null || req.body.name === '') {
    res.json({ success: false, message: 'Ensure username, email, and password were provided' });
} else {
    // Save new user to database
    user.save(function(err) {
        if (err) {
            console.log(err);
            if (err) {
                if (err.code == 11000) {
                    if (err.errmsg[61] == "u") {
                        res.json({ success: false, message: 'That username is already exists' }); 
                    } else if (err.errmsg[61] == "e") {
                        res.json({ success: false, message: 'That e-mail is already exsists' }); 
                    }
                } else {
                    res.json({ success: false, message: err }); 
                }
            }
        } else {
            console.log(user.email);
            var email = {
                from:  'fullstackprojectpdx@gmail.com',
                to: user.email, 
                subject: 'Your Activation Link',
                text: 'Hello ' + user.name + ', thank you for registering at La Taco. Please click on the following link to complete your activation: http://localhost:8080/activate/' + user.temporarytoken,
                html: '<h1>Welcome :)</h1></br>Hello<strong> ' + user.username + '</strong>,<br><br>Thank you for registering at localhost.com. Please click on the link below to complete your activation:<br><br><a href="http://localhost:8080/activate/' + user.temporarytoken + '">http://localhost:8080/activate/</a>'
            };
            client.sendMail(email, function(err, info) {
                if (err) {
                    console.log("err--> ",err); 
                } else {
                    console.log(info); 
                    console.log(user.email); 
                }
            });
            res.json({ success: true, message: 'Account registered! Please check your e-mail for activation link.' });
        }
    });
}
});
  
router.post('/authenticate', function(req, res) {
  var loginUser = (req.body.username).toLowerCase();
  User.findOne({ username: loginUser }).select('email username password active').exec(function(err, user) {
      if (err) {
          res.json({ success: false, message: 'Something went wrong.' });
      } else {          
          if (!user) {
              res.json({ success: false, message: 'Username not found' }); 
          } else if (user) {
              if (!req.body.password) {
                  res.json({ success: false, message: 'No password provided' }); 
              } else {
                  var validPassword = user.comparePassword(req.body.password);
                  if (!validPassword) {
                      res.json({ success: false, message: 'Password does not match' });
                  } else if (!user.active) {
                      res.json({ success: false, message: 'Account is not yet activated. Please check your e-mail for activation link.', expired: true });  
                  } else {
                      var token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h' });
                      res.json({ success: true, message: 'User authenticated!', token: token }); 
                  }
              }
          }
      }
  });
});


return router;
};