const request = require('supertest');
const app = require('../../index');
const client = require('../../config/db');
const { generateAccessToken } = require('../jwt');

describe('Test the user path', () => {
    beforeAll(() => {
        client.connect();
    });

    afterAll((done) => {
        client.end(done);
    });

    const token = generateAccessToken();

    //! ------------- USER ROUTES ----------------

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

    it('should response the GET method', async () => {
        const res = await request(app).get('/api/profiles');
        expect(res.statusCode).toEqual(200);
        console.log(res.body);
        expect(res.body[0].mail).not.toBe(res.body[1].mail);
    });

    it('should response the GET method', async () => {
        const res = await request(app)
            .get('/api/profiles/4')
            .set('Authorization', 'Bearer ' + token);
        expect(res.statusCode).toEqual(200);
    });

    it('should response the PATCH method', async () => {
        const res = await request(app)
            .patch('/api/profiles/30')
            .set('Authorization', 'Bearer ' + token)
            .send({
                lastname: "Brosse",
                firstname: "Mario",
                nickname: "Moustachu"
            });
        expect(res.statusCode).toEqual(200);
    })

    it('should response the PATCH method', async () => {
        const res = await request(app)
            .patch('/api/profiles/30/pwd')
            .set('Authorization', 'Bearer ' + token)
            .send({
                password: "Mari0&Luig1",
                newPassword: "Luig1&Mari0"
            });
        expect(res.status).toEqual(200);
    });

    it('should response the DELETE method', async () => {
        const res = await request(app)
            .delete('/api/profiles/30')
            .set('Authorization', 'Bearer ' + token)
            .send({
                password: "Luig1&Mari0"
            });
        expect(res.status).toEqual(200);
    });

    it('should response the POST method', async () => {
        const res = await request(app)
            .post('/api/profiles/11/add-honor')
            .set('Authorization', 'Bearer ' + token)
        expect(res.status).toEqual(200);
    });

    it('should response the POST method', async () => {
        const res = await request(app)
            .post('/api/profiles/11/remove-honor')
            .set('Authorization', 'Bearer ' + token)
        expect(res.status).toEqual(200);
    });

    it('should response the POST method', async () => {
            const res = await request(app)
                .post('/api/profiles/14/add-trophies')
                .set('Authorization', 'Bearer ' + token);
            expect(res.status).toEqual(200);
    });
    
    //! ------------- TOURNAMENT ROUTES ----------------
    
    
    it('should response the POST method', async () => {
        const res = await request(app)
        .post('/api/tournaments')
        .set('Authorization', 'Bearer ' + token)
            .send({
                label: 'EVO',
                type: 'public',
                date: '2022-12-30T12:12:12.122Z',
                game: 'Super Smash Bros Ultimate',
                format: 'Elimination simple',
                max_player_count: 128,
                description : 'Tournoi de zinzin',
                image: 'https://i.imgur.com/XWdPSTS.png',
                user_id: 1
            });
        expect(res.status).toEqual(200);
    });

    it('should response the GET method', async () => {
        const res = await request(app)
            .get('/api/tournaments');
        expect(res.body[0].label).not.toBe(res.body[1].label);
        expect(res.status).toEqual(200);
    });

    it('should response the GET method', async () => {
        const res = await request(app)
            .get('/api/tournaments/32');
        expect(res.status).not.toEqual(404);
        expect(res.status).toEqual(200);
    });

    it('should response the PATCH method', async () => {
        const res = await request(app)
            .patch('/api/tournaments/32')
            .set('Authorization', 'Bearer ' + token)
            .send({
                label: 'EVO',
                type: 'public',
                date: '2022-12-30T15:10:12.122Z',
                game: 'Super Smash Bros Ultimate',
                format: 'Elimination simple',
                max_player_count: 128,
                description : 'Tournoi de zinzinnnnnn',
                image: 'https://i.imgur.com/XWdPSTS.png',
                user_id: 1
            });
        expect(res.status).toEqual(200);
    });

    it('should response the DELETE method', async () => {
        const res = await request(app)
            .delete('/api/tournaments/32')
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toEqual(200);
    });

    it('should response the GET method', async () => {
        const res = await request(app)
            .get('/api/tournaments/3/profiles')
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toEqual(200);
    });

    it('should response the POST method', async () => {
        const res = await request(app)
            .post('/api/tournaments/3/profiles')
            .set('Authorization', 'Bearer ' + token)
            .send({
                user_id: 13
            })
        expect(res.status).toEqual(200);
    });

    it('should response the DELETE method', async () => {
        const res = await request(app)
            .delete('/api/tournaments/3/profiles/13')
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toEqual(200);
    });

    it('should response the GET method', async () => {
        const res = await request(app)
            .get('/api/tournaments/profiles/11')
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toEqual(200);
    });

    //! --------------- ENCOUNTER ROUTES ------------------

    it('should response the POST method', async () => {
        const res = await request(app)
            .post('/api/encounters')
            .set('Authorization', 'Bearer ' + token)
            .send({
                date: "2022-12-30T15:30:30.333Z",
                tournament_id: 4
            });
        expect(res.status).toEqual(200);
    });

    it('should response the GET method', async () => {
            const res = await request(app)
                .get('/api/encounters/1')
                .set('Authorization', 'Bearer ' + token);
            expect(res.status).toEqual(200);
    });

    it('should response the PATCH method', async () => {
        const res = await request(app)
            .patch('/api/encounters/1')
            .set('Authorization', 'Bearer ' + token)
            .send({
                winner: "Guillaume DOLLE",
                loser: "Matthieu TOULET",
                date: "2022-12-30T15:33:33.333Z",
                winner_score: 3,
                loser_score: 2
            });
        expect(res.status).toEqual(200);
    });

    it('should response the POST method', async () => {
        const res = await request(app)
            .post('/api/encounters/1/profiles')
            .set('Authorization', 'Bearer ' + token)
            .send({
                user_id: 13
            });
        expect(res.status).toEqual(200);
    });

    it('should response the GET method', async () => {
        const res = await request(app)
            .get('/api/encounters/1')
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toEqual(200);
    });
});