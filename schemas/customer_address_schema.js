// testing to see if i can pull from the Customer collection
// building the schema
const CustomerAddressSchema = new mongoose.Schema({
    AddressID: { type: Number },
    CustomerID: { type: Number },
    Street: { type: String },
    City: { type: String },
    State: { type: String },
    Zip_Code: { type: String },
    Is_Shipping: { type: Boolean },
    Is_Billing: { type: Boolean }
});
/* instantiating the model from the schema; instead of storing it in a variable,
 * we will be using the module.exports function in js to make it available to all
 * the other javascript programs (see code structure above)
 */
const Customer = mongoose.model('PaymentInfo', PaymentInfoSchema, 'PaymentInfo');

// executing the query
console.log("finding payment info");
PaymentInfo.find({}, function (err, PaymentInfos) {
    console.log(PaymentInfos);
});
