// routes responsible for reading store and item data, and sending back relevant data
var express = require('express');

var router = express.Router();

router.get("/", function(req, res, err) {
    var data = {};
    if(req.user){
        data.Username = req.user.Username;
        data.loggedIn = true;
    }
    else {
        data.loggedIn = false;
    }
    res.send(data);
})

module.exports = router;