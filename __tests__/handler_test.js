const app = require('../server_test')
const supertest = require('supertest')
const request = supertest(app)

it("Gets the /handler endpoint", async done => {
    // sends GET request to /handler endpoint
    const response = await request.get('/handler');

    // check if response has the 2 handlers
    expect(response.body.length).toBe(2)
    // check for success
    expect(response.status).toBe(200)
    done()
})