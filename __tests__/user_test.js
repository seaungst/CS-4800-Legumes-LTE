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

// test for authenticated user
it('gets the /user endpoint', async done => {
    const response = await authenticatedUser.get('/user');
    expect(response.status).toBe(200);
    // check that it sends the correct data over
    expect(response.body.Username).toBe("Test3");
    expect(response.body.loggedIn).toBe(true);
    done();
})

// test for unauthenticated user
it('gets the /user endpoint', async done => {
    const response = await unauthUser.get('/user');
    expect(response.status).toBe(200);
    // check that it sends the correct data over
    expect(response.body.loggedIn).toBe(false);
    done();
})

// account details tests
//test for user we have information for
it('gets the /user/account-details endpoint for a user with data', async done => {
    const response = await authenticatedUser.get('/user/account-details');

    expect(response.status).toBe(200);
    // check all fields match our logged in user
    expect(response.body.customer_info.Username).toBe("Test3");
    expect(response.body.addresses[0].CustomerID).toBe(3);
    expect(response.body.payments[0].CustomerID).toBe(3);
    expect(response.body.favorites.length).toBe(3);
    expect(response.body.deliveries[0].CustomerID).toBe(3);
    done();
})