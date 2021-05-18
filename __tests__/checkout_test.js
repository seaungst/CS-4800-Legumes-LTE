var app = require('../server_test');
var request = require('supertest');
var Delivery = require('../schemas/delivery_schema');
var Item = require('../schemas/items_schema');  // IDs in dummy cart: 4, 25

var ID4_STOCK_BEFORE;
var ID25_STOCK_BEFORE

//let's set up the data we need to pass to the login method
const userCredentials = {
    username: 'Test3', 
    password: '1234'
  }

const checkoutData = {
    Shipping_Street: "123 Hello Way",
    Shipping_City: "Sweet Pea City",
    Shipping_State: "New Spork",
    Shipping_ZIP: "11189",
    Billing_Street: "123 Hello Way",
    Billing_City: "Sweet Pea City",
    Billing_State: "New Spork",
    Billing_ZIP: "11189",
    Handler_ID: 1,
    Delivery_Instructions: "unit test"
}

//now let's login the user before we run any tests
var authenticatedUser = request.agent(app);

beforeAll(async function(done){
    await authenticatedUser
        .post('/login/attempt')
        .send(userCredentials)
        .end(async function(err, response){
        expect(response.status).toBe(302);
        await authenticatedUser.get('/login/login-success');  // fire off redirect logic
        done();
        });
});

afterAll(async function(done){
    await authenticatedUser.get('/login/logout');
    // delete delivery document that was just created
    await Delivery.deleteOne({Delivery_Instructions: "unit test"});
    done();
})

// test the only route
it("should create a delivery document and update item stocks", async done => {
    Item.findOne({Item_ID: 4}).select('Stock -_id')
    .exec(async function(err, item){
        ID4_STOCK_BEFORE = item.Stock;
        const response = await authenticatedUser.post("/checkout")
          .send(checkoutData);

        // check for success
        expect(response.status).toBe(200);
        // check that item stock updates properly
        Item.findOne({Item_ID: 4}).select('Stock -_id')
        .exec(function(err, item){
            expect(item.Stock).toBe(ID4_STOCK_BEFORE - 2);
        });
        // check that the delivery was inserted
        Delivery.findOne({Delivery_Instructions: "unit test"})
            .exec(function(err, delivery){
                expect(delivery.CustomerID).toBe(3);
                expect(delivery.ShippingAddressID).toBe(1);
                expect(delivery.BillingAddressID).toBe(1);
            })
        done();
    });
})