const app = require('../server_test')
const supertest = require('supertest')
const request = supertest(app)

it('Gets the /stores endpoint', async done => {
    // Sends GET request to /stores endpoint
    const response = await request.get('/stores')

    expect(response.status).toBe(200)
    done()
})