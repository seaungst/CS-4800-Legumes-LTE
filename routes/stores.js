const isAuth = require('./auth_middleware').isAuth;
// routes responsible for reading store and item data, and sending back relevant data
var express = require('express');

var router = express.Router();

// requiring the necessary schemas
var Store = require('../schemas/store_schema');
var Item = require('../schemas/items_schema');

/* defining the routes here */

// query to retrieve all stores
router.get('/', /*isAuth,*/ getStores, renderStores);

function getStores(req, res, next){
    Store.find({}, function (err, stores) {
        res.send(stores);
        //res.locals.store = stores;
        //next();
    });
};

function renderStores(req, res){
    res.render("stores.ejs");
};

/* /detail route
 * This route is responsible for grabbing the items associated with the requested store and
 * organizing them based on their primary categories. The result is made available to EJS
 * for rendering.
 * 
 * res.locals.items is a collection of item arrays that are organized by their category
 *      e.g.: res.locals.items["Pantry"] = [item_object_1, item_object_2, ...] 
 *            res.locals.items["Meat & Seafood"] = [item_object_3, item_object_4, ...] 
 */

router.post('/detail', getStoreItems, getStoreDetails, renderStoreView);

function getStoreItems(req, res, next){
    Item.find({Store_ID: req.body.store_id}, function(err, items){
        res.locals.items = {};
        for(var i of items){
            if(!(res.locals.items[i.Category])){
                res.locals.items[i.Category] = [];
            }
            res.locals.items[i.Category].push(i);
        }
        console.log(Object.keys(res.locals.items));
        next();
    });
}


function getStoreDetails(req, res, next){
  Store.find({Store_ID: req.body.store_id}, function(err, store_details){
      res.locals.store = store_details;
      next();
  });
}

function renderStoreView(req, res){
    res.render("junk.ejs");
}

module.exports = router;