// routes responsible for sending back user information
var express = require('express');
const isAuth = require('./auth_middleware').isAuth;

var router = express.Router();

// gathering schemas needed
var Item = require('../schemas/items_schema');
var Delivery = require('../schemas/delivery_schema');
var Handler = require('../schemas/handler_schema');

// route that returns details about a delivery; expects delivery ID
router.post("/", isAuth, getDelivery, getHandlerName, getPurchasedItems, packageAndReturn);

function getDelivery(req, res, next){
    Delivery.findOne({Delivery_ID: req.body.Delivery_ID}, function(err, result){
        res.locals.Handler_ID = result.Handler_ID;
        res.locals.Purchased_Items = result.Purchased_Items;
        next();
    })
}

function getHandlerName(req, res, next){
    Handler.findOne({Handler_ID: res.locals.Handler_ID}, function(err, handler){
        res.locals.Handler_Name = handler.Name;
        next();
    })
}

function getPurchasedItems(req, res, next){
    const item_ids = [];
    for(var item of res.locals.Purchased_Items){
        item_ids.push(item.Item_ID);
    }
    Item.find({Item_ID: {$in: item_ids}}, function(err, items){
        res.locals.Purchased_Items = items;
        next();
    })
}

function packageAndReturn(req, res){
    var data = {};
    data.Handler_Name = res.locals.Handler_Name;
    data.Purchased_Items = res.locals.Purchased_Items;
    res.send(data);
}

module.exports = router;