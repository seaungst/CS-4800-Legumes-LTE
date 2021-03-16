const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema({
    Store_ID: { type: Number },
    Store_Name: { type: String },
    Store_Info: {type: String },
    Address_Street: { type: String },
    Address_City: { type: String },
    Address_State: { type: String },
    Address_Zipcode: { type: Number },
    Phone_Number: { type: String },
    Rating: { type: Number }
});
// instantiating the model from the schema; instead of storing it in a variable, we will be using the module.exports function in js to make it available to all the other javascript programs (see code structure above)
module.exports = mongoose.model('Store', StoreSchema, 'Store');