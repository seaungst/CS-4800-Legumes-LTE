const app = require('../server_test')
const supertest = require('supertest')
const request = supertest(app)

it('Gets the /stores endpoint', async done => {
    // Sends GET request to /stores endpoint
    const response = await request.get('/stores')

    // check if response has all 10 stores
    expect(response.body.length).toBe(10)
    // check for success
    expect(response.status).toBe(200)
    done()
})