const DeliverySchema = new mongoose.Schema({
    DeliveryID: { type: Number },
    CustomerID: { type: Number },
    HandlerID: { type: Number},
    AddressID: { type: Number },
    DateTime: { type: Date },
    Total: { type: Number },
    DeliveryInstructions: { type: String },
    PurchasedItems: {type: Number }
});

const Delivery = mongoose.model('Delivery', DeliverySchema, 'Delivery');

console.log("finding deliveries");
Delivery.find({}, function (err, deliveries) {
    console.log(deliveries);
});