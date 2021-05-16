var app = require('../server_test');
var request = require('supertest');

//let's set up the data we need to pass to the login method
const userCredentials = {
    username: 'Test3', 
    password: '1234'
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


it("should return cart info", async done => {
    const response = await authenticatedUser.get('/cart');
    // expect the cart to have the dummy items
    expect(response.body.length).toBe(2);
    expect(response.status).toBe(200);
    done();
});