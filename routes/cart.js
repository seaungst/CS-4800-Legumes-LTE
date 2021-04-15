const isAuth = require('./auth_middleware').isAuth;
// routes responsible for dealing with customer login
var express = require('express');

// requiring the necessary schemas
var Store = require('../schemas/store_schema');
var Item = require('../schemas/items_schema');

var router = express.Router();

/* defining the routes here */
// return cart object
router.get('/', isAuth, getCartItems, getStoreNames);

function getCartItems(req, res, next){
    // finding all items in cart
    Item.find({Item_ID: {$in: req.session.cart}}).lean().exec(function(err, items){
        res.locals.items = items;
        next();
    })
}

function getStoreNames(req, res){
    var store_ids = [];
    // finding the unique store ids in the items list
    for(var item of res.locals.items){
        if(!store_ids.includes(item.Store_ID)){
            store_ids.push(item.Store_ID);
        }
    }
    // getting the details for those stores
    Store.find({Store_ID: {$in: store_ids}}, function(err, stores){
        // map store ids to their names
        let store_names = new Map();
        for(var store of stores){
            store_names.set(store.Store_ID, store.Store_Name);
        }
        console.log(store_names);
        // attach names to each item
        for(var item of res.locals.items){
            item.Store_Name = store_names.get(item.Store_ID);
        }
        res.send(res.locals.items);
    });
}

module.exports = router;