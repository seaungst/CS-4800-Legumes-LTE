// routes responsible for dealing with customer login
var express = require('express');
var bodyParser = require('body-parser');

// hashing functionality via bcrypt (https://www.npmjs.com/package/bcrypt)
const bcrypt = require('bcrypt');
const saltRounds = 10;

var router = express.Router();
const app = express();

router.use(bodyParser.urlencoded({ extended: true }));

// requiring the necessary schemas
var Customer = require('../schemas/customer_schema');

/* defining the routes here */
// serve dummy page for submitting user information
router.get('/', returnPage);

function returnPage(req, res){
    res.sendFile("/views/login.html", { root: './'});
}

//login attempt route
router.post('/attempt', authenticateCustomer);

function authenticateCustomer(req, res){
    Customer.findOne({ Username: req.body.username }, function(err, result){
        if(err) throw err;
        if(result.length == 0){
            res.send("This username does not exist!")
        }
        bcrypt.compare(req.body.pw, result.Hashed_Password, function(err, isMatch) {
            if(isMatch){
                res.send("Welcome, " + result.Username);
            }
            else{
                res.send("Invalid login details!");
            }
        });
    });
}

module.exports = router;