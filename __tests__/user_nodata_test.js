var app = require('../server_test');
var request = require('supertest');

//let's set up the data we need to pass to the login method
const userCredentials = {
    username: 'Test4', 
    password: '5678'
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
    done();
})

// test for authenticated user
it('gets the /user endpoint', async done => {
    const response = await authenticatedUser.get('/user');
    expect(response.status).toBe(200);
    // check that it sends the correct data over
    expect(response.body.Username).toBe("Test4");
    expect(response.body.loggedIn).toBe(true);
    done();
})

// account details tests
//test for user we don't have information for
it('gets the /user/account-details endpoint for a user with no data', async done => {
    const response = await authenticatedUser.get('/user/account-details');

    expect(response.status).toBe(200);
    // check all fields match our logged in user
    expect(response.body.customer_info.Username).toBe("Test4");
    expect(response.body.addresses.length).toBe(0);
    expect(response.body.payments.length).toBe(0);
    expect(response.body.favorites).toBe(undefined);
    expect(response.body.deliveries.length).toBe(0);
    done();
})