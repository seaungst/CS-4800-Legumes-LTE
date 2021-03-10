const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
    DeliveryID: { type: Number },
    CustomerID: { type: Number },
    HandlerID: { type: Number},
    DeliveryAddressID: { type: Number },
    Date: { type: Date },
    Total_Cost: { type: Number },
    Delivery_Instructions: { type: String },
    Purchased_Items: {type: [Number] }
});

module.exports = mongoose.model('Delivery', DeliverySchema, 'Delivery');