//Starting point of Node Express server.

require("dotenv").config();
//Dependencies
const express    = require("express");
const bodyParser = require("body-parser");
var axios        = require('axios');


var passport     = require('passport');
var flash        = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session'); // cookie session


const app  = express();
const PORT = process.env.PORT || 8000;

//Starting point of Node Express server.
//Dependencies

//
var db = require("./models");

require('./config/passport')(passport); // pass passport for configuration

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(session({
    key: 'user_sid',
    secret: 'goN6DJJC6E287cC77kkdYuNuAyWnz7Q3iZj8',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000,
        httpOnly: false
    }
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
// app.use(methodO("_method"));

require("./routes")(app, passport, axios);

db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log("Listening on localhost:" + PORT);
    })
})





app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });