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

// note to self: test for valid and invalid input
// test for valid input
it('Grabs stores information from the /stores/detail endpoint', async done => {
    const response = await request.post('/stores/detail')
    .send({
        store_id: 1
    })

    // check if server returned the correct store name
    expect(response.body.store.Store_Name).toBe("Lentil Mart");
    // check if items are all from Lentil Mart
    var do_items_match = true; // "do items match the store identified by Store_ID"
    var count = 0;  // counting items
    for(var category in response.body.items){
        for(var item in response.body.items[category]){
            if(item.Store_ID != 1)
                do_items_match = false;
            count += 1;
        }
    }
    expect(do_items_match).toBe(true);
    // check if item count is correct
    expect(count).toBe(20);
    // check for success
    expect(response.status).toBe(200)
    done()
})