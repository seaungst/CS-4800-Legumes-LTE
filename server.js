// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const mongoose = require("mongoose");
var routes = require('./routes');
const app = express();

// set app to use ejs (will remove after react integration is complete)
app.set('view engine', 'ejs');

// used in place of body parser to parse requests made by the client
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// requiring all the routes in "/routes"
app.use(routes);

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// gives access to the variables in .env
require('dotenv').config()

// connecting to the chickpea database
mongoose.connect("mongodb+srv://" + process.env.db_user + ":" + process.env.db_pw + "@chickpeacluster.ol3yz.mongodb.net/Chickpea?retryWrites=true&w=majority", { useNewUrlParser: true });

// sending the landing page to the client
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});