// testing to see if i can pull from the Customer collection
// building the schema
const PaymentInfoSchema = new mongoose.Schema({
    CustomerID: { type: Number },
    Zip_Code: { type: String },
    Card_Num: { type: Number },
    CVV: { type: Number },
    Exp_Date: { type: String },
    Card_Name: { type: String },
    Billing_Address_ID: { type: Number }
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
