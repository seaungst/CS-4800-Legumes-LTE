const mongoose = require("mongoose");

// building the schema
const CustomerAddressSchema = new mongoose.Schema({
    Address_ID: { type: Number },
    CustomerID: { type: Number },
    Street: { type: String },
    City: { type: String },
    State: { type: String },
    Zip_Code: { type: Number },
    Is_Shipping: { type: Boolean },
    Is_Billing: { type: Boolean }
});
/* instantiating the model from the schema; instead of storing it in a variable,
 * we will be using the module.exports function in js to make it available to all
 * the other javascript programs (see code structure above)
 */
module.exports = mongoose.model('CustomerAddress', CustomerAddressSchema, 'CustomerAddress');