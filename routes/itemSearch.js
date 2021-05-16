// routes responsible for dealing with customer search
var express = require("express");
var router = express.Router();

// requiring the necessary schemas
var Item = require("../schemas/items_schema");

//db.Items.createIndex({ Item_Name: 1, Category: 1, Subcategory: 1, Special: 1 })

//Get the user search
var entry;

router.post("/query", getSearchEntry, getSearchResultsCategory)

function getSearchEntry(req, res, next) {
  entry = req.body.searchInput;
  console.log(entry);
  next();
}

function getSearchResultsCategory(req, res, next) {
  Item.find(
    { $or: [{Category : entry}, {Item_Name: entry}, {Subcategory: entry}, {Special: entry}] })
    .then(data => {
      res.json({
        confirmation: "success",
        data: data
      });
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        message: err.message
      });
    });
}

module.exports = router;
