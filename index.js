const express = require('express');
const parser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const path = require('path');
const flash = require('express-flash');
const passport = require('passport');

// use .env file for configuration constants
require('dotenv').config();

// create connection to database
require('./handlers/dataConnector.js').connect();

// create an express app
const app = express();

// setup express middleware
app.use(compression());
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

// Express session
app.use(cookieParser('oreos'));
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
  })
);

app.get("/", (req, resp) => {
    resp.json({message: "Backend for Contrac"});
});

require("./routes/authRoutes")(app);

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error : err });
});

// Use express to listen to port
let port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("Server now running at port= " + port);
});