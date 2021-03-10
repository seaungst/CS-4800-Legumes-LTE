
const StoreSchema = new mongoose.Schema({
    StoreID: { type: Number },
    Store_Name: { type: String },
    Store_Info: {type: Sring},
    Address_Street: { type: String},
    Address_City: { type: String },
    Address_State: { type: String },
    Address_Zipcode: { type: String }
});
// instantiating the model from the schema; instead of storing it in a variable, we will be using the module.exports function in js to make it available to all the other javascript programs (see code structure above)
const Store = mongoose.model('Stores', StoreSchema, 'Stores');

// executing the query
console.log("finding items");
Store.find({}, function (err, items) {
    console.log(stores);
});