// route responsible for the database dump
var express = require('express');

var router = express.Router();
const app = express();

app.set('view engine', 'ejs');

/*
 * this section will be reserved for receiving the schemas from the schema.js files
 */
var Customer = require('../schemas/customer_schema');
var Store = require('../schemas/store_schema');
var CustomerAddress = require('../schemas/customer_address_schema');
var Delivery = require('../schemas/delivery_schema');
var Favorites = require('../schemas/favorites_schema');
var Handler = require('../schemas/handler_schema');
var Item = require('../schemas/items_schema');
var PaymentInfo = require('../schemas/payment_info_schema');

/*
 * queries & rendering
 */
router.get('/', getCustomers, getStores, getCustomerAddresses, getDeliveries,
getFavorites, getHandlers, getItems, getPayInfo, render);

function getCustomers(req, res, next){
    Customer.find({}, function (err, customers) {
        console.log(customers);
        res.locals.cust = customers;
        next();
    });
};

function getStores(req, res, next){
    Store.find({}, function (err, stores) {
        console.log(stores);
        res.locals.store = stores;
        next();
    });
};

function getCustomerAddresses(req, res, next){
    CustomerAddress.find({}, function (err, addresses) {
        console.log(addresses);
        res.locals.addr = addresses;
        next();
    });
};

function getDeliveries(req, res, next){
    Delivery.find({}, function (err, deliveries) {
        console.log(deliveries);
        res.locals.delivery = deliveries;
        next();
    });
};

function getFavorites(req, res, next){
    Favorites.find({}, function (err, favorites) {
        console.log(favorites);
        res.locals.fav = favorites;
        next();
    });
};

function getHandlers(req, res, next){
    Handler.find({}, function (err, handlers) {
        console.log(handlers);
        res.locals.handler = handlers;
        next();
    });
};

function getItems(req, res, next){
    Item.find({}, function (err, items) {
        console.log(items);
        res.locals.item = items;
        next();
    });
};

function getPayInfo(req, res, next){
    PaymentInfo.find({}, function (err, payinfo) {
        console.log(payinfo);
        res.locals.payment = payinfo;
        next();
    });
};

function render(req, res){
    res.render("index.ejs");
};

module.exports = router;