const app = require('../server_test')
const supertest = require('supertest-session')
const session = supertest(app)

let authSession = null;

// successful login request (redirects to /login/attempt)
it('should successfully login at /login/attempt',
async done => {
    session.post('/login/attempt')
        .send({
            username: "Test3",
            password: '1234'
        })
        .expect(302)
        .expect('Location', '/login/login-success')
        .then(res => {
            authSession = session;
            done();
        });
})

// access login success endpoint with authenticated session
it('gets the /login/login-success endpoint', async done => {
    const response = await authSession.get('/login/login-success');
    expect(response.body).toBe(true);
    expect(response.status).toBe(200);
    done();
})

// logout
it('gets the /login/logout endpoint to log user out', async done => {
    const response = await authSession.get('/login/logout')
    .expect(302)
    .expect('Location', '/');
    done();
});

// unsuccessful login request (redirects to /login/attempt)
it('should unsuccessfully login at /login/attempt',
async done => {
    session.post('/login/attempt')
        .send({
            username: "Test3",
            password: '1235'
        })
        .expect(302)
        .expect('Location', '/login/login-failure')
        .then(res => {
            authSession = session;
            done();
        });
})

// access login failure endpoint with unauthenticated session
it('gets the /login/login-failure endpoint', async done => {
    const response = await authSession.get('/login/login-failure');

    expect(response.status).toBe(200);
    expect(response.body).toBe(false);
    done();
})