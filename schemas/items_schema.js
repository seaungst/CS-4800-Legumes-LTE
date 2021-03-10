// testing to see if i can pull from the Customer collection

// building the schema
const ItemsSchema = new mongoose.Schema({
    ItemID: { type: Number },
    Item_Name: { type: String },
    Brand_Type: {type: Boolean},
    Price: { type: Number },
    IsPerUnit: { type: Boolean },
    Category: { type: String },
    Subcategory: { type: String },
    Special: { type: String }	

});
// instantiating the model from the schema; instead of storing it in a variable, we will be using the module.exports function in js to make it available to all the other javascript programs (see code structure above)
const Item = mongoose.model('Items', ItemsSchema, 'Items');

// executing the query
console.log("finding items");
Item.find({}, function (err, items) {
    console.log(items);
});