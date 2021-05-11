// routes responsible for sending back user information
var express = require('express');
const isAuth = require('./auth_middleware').isAuth;

// including necessary schemas
var CustomerAddress = require('../schemas/customer_address_schema');
var Favorites = require('../schemas/favorites_schema');
var PaymentInfo = require('../schemas/payment_info_schema');
var Delivery = require('../schemas/delivery_schema');
var Item = require('../schemas/items_schema');

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
router.get("/account-details", isAuth, getAddresses, getPaymentDetails, getFavoriteIDs, getFavorites, getDeliveries, packageData);

function getAddresses(req, res, next){
    res.locals.ID = req.user.CustomerID;
    CustomerAddress.find({CustomerID: res.locals.ID}, function(err, result){
        res.locals.addresses = result;
        next();
    })
}

function getPaymentDetails(req, res, next){
    PaymentInfo.find({CustomerID: res.locals.ID}, function(err, result){
        res.locals.payments = result;
        next();
    })
}

function getFavoriteIDs(req, res, next){
    Favorites.findOne({CustomerID: res.locals.ID}, function(err, result){
      if(err){
        console.log(err);
      }
        if(result){
          res.locals.favorite_ids = result.Favorite_Items; 
        }
        next();
    })
}

function getFavorites(req, res, next) {
    if(res.locals.favorite_ids){
      Item.find({Item_ID: {$in: res.locals.favorite_ids}}, function(err, favorites) {
        res.locals.favorites = favorites;
        next();
      }) 
    }
    else {
        next();
    }
}

function getDeliveries(req, res, next){
    Delivery.find({CustomerID: res.locals.ID}, function(err, result){
        res.locals.deliveries = result;
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