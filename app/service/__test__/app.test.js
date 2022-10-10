const request = require('supertest');
const app = require('../../index');
const client = require('../../config/db');

describe('Test the root path', () => {
    beforeAll(() => {
        client.connect();
    });

    afterAll((done) => {
        client.end(done);
    });

    it('should response the GET method', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
    });

    it('should response the POST method', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({
                mail: "carcassedepoulet@gmail.com",
                password: "LeP0ulet!"
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('foundUser');
    });

    it('should response the POST method', async () => {
        const res = await request(app)
            .post('/api/register')
            .send({
                firstname: "Mario",
                lastname: "Brosse",
                nickname: "Moustachu",
                mail: "mickeymousse@gmail.com",
                password: "Mari0&Luig1"
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.mail).toMatch(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
    });

    it('should response the get method', async () => {
        const res = await request(app).get('/api/profiles');
        expect(res.statusCode).toEqual(200);
        console.log(res.body);
        expect(res.body[0].mail).not.toBe(res.body[1].mail);
    });
});