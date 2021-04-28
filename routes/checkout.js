var express = require('express');
const isAuth = require('./auth_middleware').isAuth;

// requiring the schemas needed
var Item = require('../schemas/items_schema');
var Handler = require('../schemas/handler_schema');
var Customer = require('../schemas/customer_schema');
var CustomerAddress = require('../schemas/customer_address_schema');
var PaymentInfo = require('../schemas/payment_info_schema');
var Delivery = require('../schemas/delivery_schema');