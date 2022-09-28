const express = require('express');
const userController = require('../controller/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { authenticateToken, generateAccessToken } = require('../service/jwt');

// Route to get all user profiles stored in the database
router.get('/api/profiles', userController.getAllProfiles);

router.post('/api/login', userController.login);

router.post('/api/register', userController.register);

// Testing route for authentication
router.get('/api/me', authenticateToken, (req, res) => {
    res.send(req.user);
});

// Refresh token route
router.post('/api/refreshToken', (req, res) => {
    const authHeader = req.headers['authorization'];
    // JWT goes through the authorization header with value "Bearer ozirozirozirozirzoir", then we split with a space to get the token. It is a conventionnal naming
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.sendStatus(401); // If the token isn't found, it returns an error
    }

    // If it's found we verify it by passing the token, the secret key and a function called to send either an error or the collected data
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(401);
        }
        // check in db that the user still has rights and still exists
        delete user.iat;
        delete user.exp;
        const refreshedToken = generateAccessToken(user);
        res.send({accessToken: refreshedToken});
    });
});

// test home page
router.get('/', (req, res) => {
    res.send("Hello there :)");
});

module.exports = router;