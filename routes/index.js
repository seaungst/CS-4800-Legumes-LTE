var express = require('express');
var router = express.Router();

var StoreRouter = require('./stores')
var RegisterRouter = require('./register')
var LoginRouter = require('./login')
var CartRouter = require('./cart')
var UserRouter = require('./user')
var HandlerRouter = require('./handler')
var CheckoutRouter = require('./checkout')

router.use("/stores", StoreRouter)
router.use("/register", RegisterRouter)
router.use("/login", LoginRouter)
router.use("/cart", CartRouter)
router.use("/user", UserRouter)
router.use("/handler", HandlerRouter)
router.use("/checkout", CheckoutRouter)

module.exports = router;