// routes responsible for sending back user information
var express = require('express');
const isAuth = require('./auth_middleware').isAuth;

// including necessary schemas
var CustomerAddress = require('../schemas/customer_address_schema');
var Favorites = require('../schemas/favorites_schema');
var PaymentInfo = require('../schemas/payment_info_schema');
var Delivery = require('../schemas/delivery_schema');

var router = express.Router();

// just get username
router.get("/", function(req, res, err) {
    var data = {};
    if(req.user){
        data.Username = req.user.Username;
        data.loggedIn = true;
    }
    else {
        data.loggedIn = false;
    }
    res.send(data);
})

// get account details
router.get("/account-details", isAuth, getAddresses, getPaymentDetails, getFavorites, getDeliveries, packageData);

function getAddresses(req, res, next){
    res.locals.ID = req.user.CustomerID;
    CustomerAddress.find({CustomerID: res.locals.ID}, function(err, result){
        res.locals.addresses = result;
        console.log(result);
        next();
    })
}

function getPaymentDetails(req, res, next){
    PaymentInfo.find({CustomerID: res.locals.ID}, function(err, result){
        res.locals.payments = result;
        console.log(result);
        next();
    })
}

function getFavorites(req, res, next){
    Favorites.find({CustomerID: res.locals.ID}, function(err, result){
        res.locals.favorites = result;
        console.log(result);
        next();
    })
}

function getDeliveries(req, res, next){
    Delivery.find({CustomerID: res.locals.ID}, function(err, result){
        res.locals.deliveries = result;
        console.log(result);
        next();
    })
}

function packageData(req, res){
    var user_data = {};
    user_data.customer_info = req.user;
    user_data.addresses = res.locals.addresses;
    user_data.payments = res.locals.payments;
    user_data.favorites = res.locals.favorites;
    user_data.deliveries = res.locals.deliveries;
    res.send(user_data);
}

module.exports = router;