
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
                subject: 'Welcome to La Taco',
                text: 'Hello ' + user.name + ', thank you for registering at La Taco.',
                html: '<h1>Welcome :)</h1></br>Hello<strong> ' + user.username + '</strong>,<br><br>Thank you for registering at localhost.com.'
            };
            client.sendMail(email, function(err, info) {
                if (err) {
                    console.log("err--> ",err); 
                } else {
                    console.log(info); 
                    console.log(user.email); 
                }
            });
            res.json({ success: true, message: 'User registered Successfully' });
        }
    });
}
});
  
router.post('/authenticate', function(req, res) {
    if(req.body.username == null || req.body.username == ''||req.body.password == null || req.body.password == ''){

        res.json({success: false, message: 'Ensure username and password were provided'});
    }
    else
    {
      var loginUser = (req.body.username).toLowerCase(); // Ensure username is checked in lowercase against database
      User.findOne({ username: loginUser }).select('email username password').exec(function(err, user) {
      if (err) {
         
        res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
      }
      else
      {
        if (!user) {
            res.json({ success: false, message: 'Username not found' }); // Username not found in database
        } 
        else if (user){
            if (!req.body.password) {
                res.json({ success: false, message: 'No password provided' }); // Password was not provided
            } 
            else
            {
                if (user.password!==req.body.password) {
                    res.json({ success: false, message: 'Could not authenticate password' }); // Password does not match password in database
                } else {
                  var token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h' }); // Logged in: Give user token
                  res.json({ success: true, message: 'User authenticated!',token:token}); // Return token in JSON object to controller
                }
            }
        }
      }

    })
    }

});

    // Middleware for Routes that checks for token - Place all routes after this route that require the user to already be logged in
    router.use(function(req, res, next) {
        var token = req.body.token || req.body.query || req.headers['x-access-token']; // Check for token in body, URL, or headers

        // Check if token is valid and not expired  
        if (token) {
            // Function to verify token
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'Token invalid' }); // Token has expired or is invalid
                } else {
                    req.decoded = decoded; // Assign to req. variable to be able to use it in next() route ('/me' route)
                    next(); // Required to leave middleware
                }
            });
        } else {
            res.json({ success: false, message: 'No token provided' }); // Return error if no token was provided in the request
        }
    });

    // Route to get the currently logged in user    
    router.post('/me', function(req, res) {
        res.send(req.decoded); // Return the token acquired from middleware
    });


    router.post('/sendMsg', function(req,res){
        var email = {
            from:  'fullstackprojectpdx@gmail.com',
            to: req.body.email, 
            subject: 'Message Received La Taco',
            text: 'Hello ' +  req.body.name + ', thank you for contacting us at La Taco.',
            html: '<h1></br>Hello<strong></h1> ' +  req.body.name + '</strong>,<br><br>We will get back to you with two business days.<br><br> Have a nice day.'
        };
        client.sendMail(email, function(err, info) {
            if (err) {
                console.log("err--> ",err); 
            } else {
                console.log(info); 
                console.log( req.body.email); 
            }
        });
        res.json({ success: true});
    });

    router.post('/hireMsg', function(req,res){
        var email = {
            from:  'fullstackprojectpdx@gmail.com',
            to: req.body.email, 
            subject: 'Application Received La Taco',
            text: 'Hello ' +  req.body.name + ', thank you for applying us at La Taco.',
            html: '<h1>Hello<strong></h1></br> ' +  req.body.name + '</strong>,<br><br>We will process all applications and call you for interviews shortly. <br><br> Have a nice day.'
        };
        client.sendMail(email, function(err, info) {
            if (err) {
                console.log("err--> ",err); 
            } else {
                console.log(info); 
                console.log( req.body.email); 
            }
        });
        res.json({ success: true});
    });



return router;
};