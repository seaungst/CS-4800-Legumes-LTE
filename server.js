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
 * this section will be reserved for receiving the schemas from the schema.js files
 */
var Customer = require('./schemas/customer_schema');
var CustomerAddress = require('./schemas/customer_address_schema')
var Delivery = require('./schemas/delivery_schema')
var Favorites = require('./schemas/favorites_schema')
var Handler = require('./schemas/handler_schema')
var Item = require('./schemas/items_schema')
var PaymentInfo = require('./schemas/payment_info_schema')
var Store = require('./schemas/store_schema')

/*
 * this section will be for the routes that perform the queries requested by the frontend, and it will send back the appropriate data
 */

// all customers query
console.log("finding customers");
Customer.find({}, function (err, customers) {
    console.log(customers);
});

// all customer addresses query
console.log("finding customer addresses");
CustomerAddress.find({}, function (err, addresses) {
    console.log(addresses);
});

// all deliveries query
console.log("finding deliveries");
Delivery.find({}, function (err, deliveries) {
    console.log(deliveries);
});

// all favorites query
console.log("finding favorites");
Favorites.find({}, function (err, favorites) {
    console.log(favorites);
});

// all handlers query
console.log("finding handlers");
Handler.find({}, function (err, Handlers) {
    console.log(Handlers);
});

// all items query
console.log("finding items");
Item.find({}, function (err, items) {
    console.log(items);
});

// all payment infos query
console.log("finding payment info");
PaymentInfo.find({}, function (err, PaymentInfos) {
    console.log(PaymentInfos);
});

// all stores query
console.log("finding stores");
Store.find({}, function (err, stores) {
    console.log(stores);
});

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// listen for requests :)
  const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
