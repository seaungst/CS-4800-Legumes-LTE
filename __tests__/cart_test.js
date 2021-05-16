var app = require('../server_test');
var request = require('supertest');

//let's set up the data we need to pass to the login method
const userCredentials = {
    username: 'Test3', 
    password: '1234'
  }

//now let's login the user before we run any tests
var authenticatedUser = request.agent(app);
var unauthUser = request.agent(app);

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
    done();
})

// getting cart info
it("should return cart info", async done => {
    const response = await authenticatedUser.get('/cart');
    // expect the cart to have the dummy items
    expect(response.body.length).toBe(2);
    expect(response.status).toBe(200);
    done();
});

it("should return 401 status", async done => {
    const response = await unauthUser.get('/cart');
    expect(response.status).toBe(401);
    done();
});

// add to cart test
it("should add new item to cart", async done => {
    const response = await authenticatedUser.post('/cart/add')
        .send({
            Item_ID: 1,
            Quantity: 1
        });
    
    expect(response.status).toBe(200);
    // check that endpoint returns item that was added
    expect(response.body.Item_ID).toBe(1);
    done();
})

// add to quantity of existing cart item
it("should add to the quantity of an existing cart item", async done => {
    const response = await authenticatedUser.post('/cart/add')
        .send({
            Item_ID: 1,
            Quantity: 2
        });
    
    expect(response.status).toBe(200);
    // check that endpoint returns item that was added
    expect(response.body.Item_ID).toBe(1);
    // check that the correct quantity was added
    expect(response.body.Quantity).toBe(2);
    done();
})

// remove from cart test
it("should remove existing item from cart", async done => {
    const response = await authenticatedUser.post('/cart/remove')
        .send({
            Item_ID: 1
        });
    expect(response.status).toBe(200);
    // check for success message
    expect(response.text).toBe("removed item");
    done();
})