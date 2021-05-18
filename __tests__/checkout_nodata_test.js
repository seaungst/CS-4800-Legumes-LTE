var app = require('../server_test');
var request = require('supertest');
var Delivery = require('../schemas/delivery_schema');
var Address = require('../schemas/customer_address_schema');
const { checkout } = require('../server_test');

//let's set up the data we need to pass to the login method
const userCredentials = {
    username: 'UnitTest', 
    password: 'tetris'
  }

const checkoutData = {
    Shipping_Street: "125 Hello Way",
    Shipping_City: "Sweet Pea City",
    Shipping_State: "New Spork",
    Shipping_ZIP: "11189",
    Billing_Street: "125 Hello Way",
    Billing_City: "Sweet Pea City",
    Billing_State: "New Spork",
    Billing_ZIP: "11189",
    Handler_ID: 1,
    Delivery_Instructions: "tetris"
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
    await Delivery.deleteOne({Delivery_Instructions: "tetris"});
    // delete address documents that were just created
    await Address.deleteMany({CustomerID: 18});
    done();
})

// test the only route
it("should create new address documents for a user with no address info", async done => {
    await authenticatedUser.post("/checkout")
        .send(checkoutData)
        .then(async (response) => {
            Address.find({CustomerID: 18})
            .exec(function(err, addresses){
                console.log("found added addresses");
                // check that the correct number of addresses (billing+shipping) were added
                expect(addresses.length).toBe(2);
                // check for success status
                expect(response.status).toBe(200);
                done();
            });
        })
})