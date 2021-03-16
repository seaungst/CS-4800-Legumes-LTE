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

router.post('/detail', (req, res)=>{
    res.send("we got that, you want details for " + req.body.store_name + " which has a store ID of " + req.body.store_id);
});

module.exports = router;