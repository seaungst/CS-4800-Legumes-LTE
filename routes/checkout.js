var express = require('express');
const isAuth = require('./auth_middleware').isAuth;

// requiring the schemas needed
var Item = require('../schemas/items_schema');
var CustomerAddress = require('../schemas/customer_address_schema');
var Delivery = require('../schemas/delivery_schema');

var router = express.Router();

// route for the entire checkout process
router.post("/", isAuth, getShippingAddress, getBillingAddress, updateStock, calculateCartTotal, createDeliveryDocument);

function getShippingAddress(req, res, next){
    CustomerAddress.findOne({ 
        Street: req.body.Shipping_Street,
        City: req.body.Shipping_City,
        State: req.body.Shipping_State,
        Zip_Code: req.body.Shipping_ZIP,
        Is_Shipping: true
    }, function(err, Shipping_Address){
        if(!Shipping_Address) {
            // register new shipping address
            CustomerAddress.findOne({}).sort({Delivery_ID : -1}).exec( function(err, address) {
                // use maxID to make new id
                var new_id = address.Address_ID + 1;
                var shipping_address_data = {
                    Address_ID: new_id,
                    CustomerID: req.user.CustomerID,
                    Street: req.body.Shipping_Street,
                    City: req.body.Shipping_City,
                    State: req.body.Shipping_State,
                    Zip_Code: req.body.Shipping_ZIP,
                    Is_Shipping: true,
                    Is_Billing: null
                }
                var new_shipping = new CustomerAddress(shipping_address_data);
                new_shipping.save();
                res.locals.ShippingAddressID = new_id;
            });
        }
        else{
            res.locals.ShippingAddressID = Shipping_Address.Address_ID;
        }
        next();
    })
}

function getBillingAddress(req, res, next){
    CustomerAddress.findOne({ 
        Street: req.body.Billing_Street,
        City: req.body.Billing_City,
        State: req.body.Billing_State,
        Zip_Code: req.body.Billing_ZIP,
        Is_Billing: true
    }, function(err, Billing_Address){
        if(!Billing_Address) {
            // register new billing address
            CustomerAddress.findOne({}).sort({Delivery_ID : -1}).exec( function(err, address) {
                // use maxID to make new id
                var new_id = address.Address_ID + 1;
                var billing_address_data = {
                    Address_ID: new_id,
                    CustomerID: req.user.CustomerID,
                    Street: req.body.Billing_Street,
                    City: req.body.Billing_City,
                    State: req.body.Billing_State,
                    Zip_Code: req.body.Billing_ZIP,
                    Is_Shipping: null,
                    Is_Billing: true
                }
                var new_billing = new CustomerAddress(billing_address_data);
                new_billing.save();
                res.locals.BillingAddressID = new_id;
            });
        }
        else{
            res.locals.BillingAddressID = Billing_Address.Address_ID;
        }
        next();
    })
}

async function updateStock(req, res, next){
    console.log(req.session.cart);
    for(var cart_item of req.session.cart){
        var quantity = cart_item.Quantity;
        console.log(quantity);
        var item = await Item.findOne({Item_ID: cart_item.Item_ID}).select('Stock');
        item.Stock = item.Stock - quantity;
        await item.save();
      
    }
    next();
}

function calculateCartTotal(req, res, next){
    res.locals.total = 0;
    // extracting item ids from cart
    var id_list = [];
    for(var cart_item of req.session.cart){
        id_list.push(cart_item.Item_ID);
    }
    // finding all items in cart and getting the total
    Item.find({Item_ID: {$in: id_list}}).lean().exec(function(err, items){
        // calculate total
        for(var item of items){
            for(var cart_item of req.session.cart){
                if(item.Item_ID == cart_item.Item_ID){
                    res.locals.total += (item.Price * cart_item.Quantity);
                }
            }
        }
        next();
    })
}

function createDeliveryDocument(req, res, next){
    Delivery.findOne({}).sort({Delivery_ID : -1}).exec( function(err, delivery) {
        // use maxID to make new id
        var new_id = delivery.Delivery_ID + 1;
        var deliveryData = {
            Delivery_ID: new_id,
            CustomerID: req.user.CustomerID,
            Handler_ID: req.body.Handler_ID,
            ShippingAddressID: res.locals.ShippingAddressID,
            BillingAddressID: res.locals.BillingAddressID,
            Date: new Date(),
            Total_Cost: res.locals.total,
            Delivery_Instructions: req.body.Delivery_Instructions,
            Purchased_Items: req.session.cart,
            Delivered: false
        }
        var new_delivery = new Delivery(deliveryData);
        new_delivery.save();
        console.log("added delivery document")
        res.send(true);
        });
}

module.exports = router;