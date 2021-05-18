const app = require('../server_test')
const supertest = require('supertest')
const request = supertest(app)
const Customer = require("../schemas/customer_schema");

it("Creates a new user in our system at the /register/sign-up endpoint",
async done => {
    // sends POST request to /register/sign-up endpoint
    const response = await request.post('/register/sign-up')
    .send(
        {
            username: "UnitTest1",
            password: "apassword",
            name: "Unit Test",
            email: "unit@test"
        }
    );

    // check that user exists in the database
    var user = await Customer.findOne({Username: "UnitTest1"});
    expect(user.Username).toBe("UnitTest1");
    // delete user that was just created
    await Customer.deleteOne({Username: "UnitTest1"});
    // expect request body to be "successfully registered your account"
    expect(response.text).toBe("successfully registered your account");
    // check for success
    expect(response.status).toBe(200);
    done();
})

it("Attempts to create user that already exists at /register/sign-up endpoint",
async done => {
    // sends POST request to /register/sign-up endpoint
    const response = await request.post('/register/sign-up')
    .send(
        {
            username: "Test3",
            password: "apassword",
            name: "Unit Test",
            email: "unit@test"
        }
    );

    // expect account already exists response
    expect(response.text).toBe("An account for Test3 already exists!");
    // expect success status
    expect(response.status).toBe(200);
    done();
})