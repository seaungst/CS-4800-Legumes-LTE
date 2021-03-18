// routes responsible for reading store and item data, and sending back relevant data
var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();
const app = express();

app.set('view engine', 'ejs');
router.use(bodyParser.urlencoded({ extended: true }));

// requiring the necessary schemas
var Store = require('../schemas/store_schema');
var Item = require('../schemas/items_schema');

/* defining the routes here */

// query to retrieve all stores
router.get('/', getStores, renderStores);

function getStores(req, res, next){
    Store.find({}, function (err, stores) {
        res.locals.store = stores;
        next();
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
router.post('/detail', getStoreItems, renderStoreView);

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

function renderStoreView(req, res){
    res.render("storeview_render_test.ejs");
}

module.exports = router;