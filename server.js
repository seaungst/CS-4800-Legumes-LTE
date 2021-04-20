// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const cors = require('cors')
const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
var routes = require('./routes');
const app = express();

// trust first proxy for glitch?
app.set('trust proxy', 1);

// gives access to the variables in .env
require('dotenv').config()

// db string const
const DB_STRING = "mongodb+srv://" + process.env.db_user + ":" + process.env.db_pw + "@chickpeacluster.ol3yz.mongodb.net/Chickpea?retryWrites=true&w=majority";

// allow cross origin referencing
app.use(cors({
  origin: ['http://localhost:3000', 'https://localhost:3000', 'https://chickpea.glitch.me'],
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// set app to use ejs (will remove after react integration is complete)
app.set('view engine', 'ejs');

// setting up the express session
app.use(session({
  secret: "fillthisinlater",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl: DB_STRING}),
  cookie: {
    maxAge: 1000 * 60 * 5, // cookie will live for like 5 minutes for now
    // comment out these three options when solely testing the middleware/backend (i.e. not doing cross-site work)
    /*
    sameSite: 'none',
    secure: true,
    httpOnly: false,*/
  }
}));

// passport authentication configuration
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// used in place of body parser to parse requests made by the client
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// making all the routes in "/routes" available
app.use(routes);

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// connecting to the chickpea database
mongoose.connect(DB_STRING, { useNewUrlParser: true });

// sending the landing page to the client
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3001, () => {
  console.log("Your app is listening on port " + listener.address().port);
});