// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// connecting to the chickpea database
mongoose.connect("mongodb+srv://Rybean:<password>@chickpeacluster.ol3yz.mongodb.net/Chickpea?retryWrites=true&w=majority", { useNewUrlParser: true });

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

/*
 * this section is reserved for the routers
 */
var DumpRouter = require('./routes/dump')
var StoreRouter = require('./routes/stores')
var RegisterRouter = require('./routes/register')
var LoginRouter = require('./routes/login')
app.use("/dump", DumpRouter);
app.use("/stores", StoreRouter);
app.use("/register", RegisterRouter);
app.use("/login", LoginRouter);

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// listen for requests :)
const listener = app.listen(3000, () => {
  console.log("Your app is listening locally");
});