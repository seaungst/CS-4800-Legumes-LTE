// routes responsible for dealing with customer search
var express = require('express');
var router = express.Router();

// requiring the necessary schemas
var Item = require('../schemas/items_schema');

//db.Items.createIndex({ Item_Name: 1, Category: 1, Subcategory: 1, Special: 1 })

//Get the user search
var entry;
router.get("", function(req, res, err) {
    entry = req.body.searchQuery;
})

router.post('/query', getSearchResults);

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