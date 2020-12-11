require('dotenv').config();
var express = require('express');
var rp = require('request-promise');
var passport = require('passport')
var bodyParser = require('body-parser');
var validator = require('express-validator');
var db = require('./data/db.js')
var favicon = require('serve-favicon')
var path = require('path')

// Routes
var movies = require('./routes/movie');
var login = require('./routes/login');
var signUp = require('./routes/register');
var home = require('./routes/index');
var api = require('./routes/api');
var users = require('./routes/users');


var LocalStrategy = require('passport-local').Strategy;
var app = express();
require('./auth-init.js');

app.set('view engine', 'ejs');

// Give access to public and views folders to remainder of program
app.use(express.static('public'));

// Servce favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(express.static('views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

app.use(require('express-session')({
    secret: 'keyboard cat', resave :false, saveUninitialized : false
        }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api",api)
app.use("/",home);
app.use("/movies",movies);

// Authentication forwarding
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
    res.redirect('/login')
}

app.use('/users/:user/add/*', ensureAuthenticated);
app.use("/users",users);
app.use(login);
app.use("/signUp",signUp);

module.exports = app;

if(!module.parent){ 

var listener = app.listen(process.env.PORT || 5000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

}
