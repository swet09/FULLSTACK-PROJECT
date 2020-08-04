var express = require('express'); 
var app = express(); 
var port = process.env.PORT || 8080; 
var morgan = require('morgan'); 
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser'); 
var router = express.Router(); 
var appRoutes = require('./app/routes/api')(router);
var path = require('path');
const exphbs = require('express-handlebars');

const checkoutRoute = require(path.join(__dirname + '/public/controllers/checkout'));
const pickPay = require(path.join(__dirname + '/public/controllers/pickPay'));
const deliveryPay = require(path.join(__dirname + '/public/controllers/deliveryPay'));
const checkoutStatus = require(path.join(__dirname + '/public/controllers/checkStatus'));
const register = require(path.join(__dirname + '/public/controllers/userController'));
const hireRoute = require(path.join(__dirname +'/public/controllers/hireMeStatus'))
const userlogin = require(path.join(__dirname + '/public/controllers/loginController'));

const menu = require(path.join(__dirname + '/public/controllers/menu'));
const order = require(path.join(__dirname + '/public/controllers/order'));
const hireMe = require(path.join(__dirname + '/public/controllers/hireMe'));
const about = require(path.join(__dirname + '/public/controllers/about'));
const contact = require(path.join(__dirname + '/public/controllers/contact'));
const login = require(path.join(__dirname + '/public/controllers/login'));
const registerForm = require(path.join(__dirname + '/public/controllers/registerForm'));

app.use(morgan('dev')); // Morgan Middleware
app.use(bodyParser.json()); // Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public')); // Allow front end to access public folder
app.use('/api', appRoutes); // Assign name to end points (e.g., '/api/management/', '/api/users' ,etc. )

app.use('/checkout', checkoutRoute);
app.use('/checkout/pickup/payment_method', pickPay);
app.use('/checkout/delivery/payment_method', deliveryPay);
app.use('/checkout/status', checkoutStatus);
app.use('/userRegister', register)
app.use('/hireMeStatus', hireRoute);
app.use('/userLogin', userlogin);

app.use('/menu', menu);
app.use('/order', order);
app.use('/hireMe', hireMe);
app.use('/about', about);
app.use('/contact', contact);
app.use('/login', login);
app.use('/register', registerForm);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


// getting-started.js

mongoose.connect('mongodb://localhost:27017/foodCart', {useNewUrlParser: true},function(err){
  if(err)
  {
    console.log('Not connected to the database '+ err);
  }
  else
  {
    console.log('Successfully connected to MongoDB');
  }
});

app.get('/', function(req,res){
res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


app.listen(port, function(){
  console.log('Running the server on port '+ port);
});
