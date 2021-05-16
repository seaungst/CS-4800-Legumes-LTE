const app = require('../server_test')
const supertest = require('supertest')
const request = supertest(app)

// successful search
it('posts to the /search/query endpoint with a query that returns matching items',
async done => {
    const response = await request.post('/search/query')
    .send({
        searchInput: 'Vegan'
    });

    // check for success message
    expect(response.body.confirmation).toBe("success");
    // check that the search returned the correct number of items
    expect(response.body.data.length).toBe(11);
    // check that all items are marked with Vegan
    var allVegan = true;
    for(var item of response.body.data) {
        if(item.Special != "Vegan")
            allVegan = false;
    }
    expect(allVegan).toBe(true);
    expect(response.status).toBe(200);

    done();
})

// unsuccessful search
it('posts to the /search/query endpoint with a query that returns nothing',
async done => {
    const response = await request.post('/search/query')
    .send({
        searchInput: 'Tteokbokki'
    });

    // check for success message
    expect(response.body.confirmation).toBe("success");
    // but check that the data has nothing
    expect(response.body.data.length).toBe(0);
    expect(response.status).toBe(200);

    done();
})
