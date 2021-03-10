// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// connecting to the chickpea database
mongoose.connect("mongodb+srv://<user>:<password>@chickpeacluster.ol3yz.mongodb.net/Chickpea?retryWrites=true&w=majority", { useNewUrlParser: true });
// testing to see if i can pull from the Handler collection
const CustomerSchema = new mongoose.Schema({
    Username: { type: String },
    Hashed_Password: {type: Number},
    Name: { type: String },
    Email: { type: String }
});

const Customer = mongoose.model('Customer', CustomerSchema, 'Customer');
console.log("finding customers");
Customer.find({}, function (err, customers) {
    console.log(customers);
});

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

/*// https://expressjs.com/en/starter/basic-routing.html
 * 
// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});*/

// listen for requests :)
  const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
