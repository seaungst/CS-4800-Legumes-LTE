// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// connecting to the chickpea database
mongoose.connect("mongodb+srv://<username>:<password>@chickpeacluster.ol3yz.mongodb.net/Chickpea?retryWrites=true&w=majority", { useNewUrlParser: true });

/*
 * this section is reserved for the routers
 */
var DumpRouter = require('./routes/dump')
app.use("/dump", DumpRouter);

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// listen for requests :)
  const listener = app.listen(3000, () => {
  console.log("Your app is listening on port " + 3000);
});

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/views/index.html");
  });