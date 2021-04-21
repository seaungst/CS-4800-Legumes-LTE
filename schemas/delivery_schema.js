const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
    Delivery_ID: { type: Number },
    CustomerID: { type: Number },
    Handler_ID: { type: Number},
    DeliveryAddressID: { type: Number },
    Date: { type: Date },
    Total_Cost: { type: Number },
    Delivery_Instructions: { type: String },
    Purchased_Items: { type: [Number] },
    Delivered: {type: Boolean}
});

module.exports = mongoose.model('Delivery', DeliverySchema, 'Delivery');