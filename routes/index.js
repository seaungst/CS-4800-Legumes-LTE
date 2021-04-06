var express = require('express');
var router = express.Router();

var StoreRouter = require('./stores')
var RegisterRouter = require('./register')
var LoginRouter = require('./login')

router.use("/stores", StoreRouter)
router.use("/register", RegisterRouter)
router.use("/login", LoginRouter)

module.exports = router;