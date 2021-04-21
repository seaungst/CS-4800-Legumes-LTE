// routes responsible for reading handler data and sending back appropriate information
var express = require('express');

var router = express.Router();

// requiring the handler schemas
var Handler = require('../schemas/handler_schema');

// define API routes here...

// query to retrieve all handlers
router.get('/', /*isAuth,*/ getHandlers /*, renderStores*/);

function getHandlers(req, res, next){
    Handler.find({}, function (err, handler) {
        res.send(handler);
        //res.locals.handler = handler;
        //next();
    });
};

/*function render(req, res){
    res.render("stores.ejs");
};*/


module.exports = router;