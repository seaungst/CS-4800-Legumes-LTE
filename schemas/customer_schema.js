var mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    CustomerID: { type: Number },
    Username: { type: String },
    Hashed_Password: { type: Number },
    Name: { type: String },
    Email: { type: String }
});

// exporting the customer model
module.exports = mongoose.model('Customer', CustomerSchema, 'Customer');