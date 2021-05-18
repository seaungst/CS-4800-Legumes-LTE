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

afterAll(async function(done){
    await authenticatedUser.get('/login/logout');
    done();
})

it('should successfully return delivery details', async done => {
    const response = await authenticatedUser.post('/order-details')
        .send({
            Delivery_ID: 2
        });

    // check data is correct
    expect(response.body.Handler_Name).toBe("Clayton Fiorito");
    expect(response.body.Purchased_Items.length).toBe(2);
    // check for success status
    expect(response.status).toBe(200);
    done();
});