// routes responsible for dealing with customer registration
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
    res.sendFile("/views/signup.html", { root: './'});
}

router.post('/sign-up', checkUserExists, hashPassword, registerUser);

function checkUserExists(req, res, next){
    var username = req.body.username;
    Customer.find({ Username: username }, function(err, result){
        if(result.length == 0){
            // can create new user
            next();
        }
        else{
            res.send("An account for " + username + " already exists!");
        }
    });
}

function hashPassword(req, res, next){
    // generate salt and hash
    bcrypt.hash(req.body.pw, saltRounds, function(err, hash){
        res.hashed_string = hash;
        next();
    })
}

function registerUser(req, res){
    Customer.findOne({}).sort({CustomerID : -1}).exec( function(err, customer) {
        // use maxID to make new id
        var new_id = customer.CustomerID + 1;
        var userData = {
            CustomerID: new_id,
            Username: req.body.username,
            Hashed_Password: res.hashed_string,
            Name: req.body.name,
            Email: req.body.email
        }
        var new_customer = new Customer(userData);
        new_customer.save(function(err, customer){
            if (err) return console.error(err);
            console.log(customer.Username + " saved to the collection.\n");
            res.send("successfully registered your account");
        });
    });
}

module.exports = router;