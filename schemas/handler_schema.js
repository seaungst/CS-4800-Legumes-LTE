// testing to see if i can pull from the Customer collection
// building the schema
const HandlerSchema = new mongoose.Schema({
    HandlerID: { type: Number },
    Name: { type: String },
    Street: { type: String },
    City { type: String },
    State: { type: String },
    Zip_Code: { type: Number },
    Num_Reviews: { type: Number },
    Review_Score: { type: Number },
    Num_Deliveries: { type: Number },
    Availability: { type: Boolean },
});
/* instantiating the model from the schema; instead of storing it in a variable,
 * we will be using the module.exports function in js to make it available to all
 * the other javascript programs (see code structure above)
 */
const Handler = mongoose.model('Handler', HandlerSchema, 'Handler');

// executing the query
console.log("finding payment info");
Customer.find({}, function (err, Handlers) {
    console.log(Handlers);
});