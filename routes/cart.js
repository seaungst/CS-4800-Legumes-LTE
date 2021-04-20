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
    // extracting item ids from cart
    var id_list = [];
    for(var cart_item of req.session.cart){
        id_list.push(cart_item.Item_ID);
    }
    // finding all items in cart
    Item.find({Item_ID: {$in: id_list}}).lean().exec(function(err, items){
        res.locals.items = items;
        // attach quantities to each item
        for(var item of res.locals.items){
            for(var cart_item of req.session.cart){
                if(item.Item_ID == cart_item.Item_ID){
                    item.Quantity = cart_item.Quantity;
                }
            }
        }
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

router.get("/AddTo", function(req, res, next){
    res.sendFile("/views/addtocart_test.html", { root: './'});
})

router.post("/add", isAuth, addToCart);

function addToCart(req, res, next){
    // grabbing the data from the request body
    var item = {};
    var added = false;
    item.Item_ID = req.body.Item_ID;
    item.Quantity = req.body.Quantity;

    // if item is already in cart, add to the existing quantity
    for(var cart_item of req.session.cart){
        if(item.Item_ID == cart_item.Item_ID){
            cart_item.Quantity += item.Quantity;
            added = true;
        }
    }

    // if item wasn't added (doesn't exist in cart), add it
    if(!added){
        req.session.cart.push(item);
    }
    res.send(item);
}

module.exports = router;