// routes responsible for dealing with customer login
var express = require('express');

// requiring passport utils
const passport = require('passport');

var router = express.Router();

/* defining the routes here */
//login attempt route
router.post('/attempt', passport.authenticate('local', {failureRedirect: '/login/login-failure', successRedirect: '/login/login-success'}));

router.get('/login-success', (req, res, next) => {
    req.session.cart = [{Item_ID: 4, Quantity: 2}, {Item_ID: 25, Quantity: 1}];
    res.send(true)
    next();
})

router.get('/login-failure', (req, res, next) => {
    res.send(false);
})

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});
module.exports = router;