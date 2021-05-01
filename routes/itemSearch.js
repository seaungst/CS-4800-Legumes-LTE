// routes responsible for dealing with customer search
var express = require('express');
var router = express.Router();

// requiring the necessary schemas
var Item = require('../schemas/items_schema');

//db.Items.createIndex({ Item_Name: 1, Category: 1, Subcategory: 1, Special: 1 })

//Get the user search
var entry;

router.get('/', returnPage);

function returnPage(req, res){
    res.sendFile("/views/search.html", { root: './'});
}

router.post('/query', getSearchEntry, getSearchResults);

function getSearchEntry(req, res, next){
    entry = req.body.searchInput;
    console.log(entry);
    next();
}

function getSearchResults(req, res){
    Item.find({
        $text: {
            $search: entry
        }
    } , {
        Category: 1,
        Subcategory: 1,
        Special: 1,
        Item_Name: 1
    }, function (err, data) {
        res.send(data);
    })

    /*
    Item.find({
        Item_Name: {
            $regex: new RegExp(entry)
        }
    } , {
        Category: 1,
        Subcategory: 1,
        Special: 1,
        Item_Name: 1
    }, function (err, data) {
        res.send(data);
    }).limit(15);
    */
}

module.exports = router;