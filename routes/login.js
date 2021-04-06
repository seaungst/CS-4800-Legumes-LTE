// routes responsible for dealing with customer login
var express = require('express');

// requiring passport utils
const passport = require('passport');

var router = express.Router();

// requiring the necessary schemas
var Customer = require('../schemas/customer_schema');

/* defining the routes here */
// serve dummy page for submitting user information
router.get('/', returnPage);

function returnPage(req, res){
    res.sendFile("/views/login.html", { root: './'});
}

//login attempt route
router.post('/attempt', passport.authenticate('local', {failureRedirect: '/login/login-failure', successRedirect: '/login/login-success'}));

router.get('/login-success', (req, res, next) => {
    res.send('Successful login!');
})

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password. ):');
})
module.exports = router;