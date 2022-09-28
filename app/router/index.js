const express = require('express');
const userController = require('../controller/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { authenticateToken, generateAccessToken } = require('../service/jwt');

// Route to get all user profiles stored in the database
/**
 * GET /api/profiles
 * @summary This return all informations of all users with Json
 * @tags user
 * @security Admin
 * @return {array<User>} 200 - success response - application/json
 * @return {array<User>} 403 - forbidden
 */
router.get('/api/profiles', userController.getAllProfiles);

/**
 * POST /api/login
 * @summary login user and create an access token 
 * @security BasicAuth
 * @tags user
 * @param {string} mail mob@mob.mob
 * @param {string} password azerty1234
 * @return {object} 200 - success: true, accessToken, refreshToken
 * @example response 200 - success: true, response example
 * {
 *      "success": "true",
 *      "accessToken": "opajzepogajezpojapog",
 *      "refreshToken": "idqjsoizekdopqikzdoi"
 * }
 * @return {object} 400 - Bad request response
 * @return {object} 403 - forbidden
 *
 */
router.post('/api/login', userController.login);

/**
 * POST /api/register
 * @summary Creates a user and save it in the database
 * @security BasicAuth
 * @tags user
 * @param {object} request.body.required - user info
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 * @example response - 200 - success response example
 * {
 *      "firstname": "Harleen",
 *      "lastname": "Quinzel",
 *      "nickname": "HarleyQuinn",
 *      "mail": "harleyquinn@gmail.com",
 *      "password": "joker12345"
 * }
 */
router.post('/api/register', userController.register);

// Testing route for authentication
/**
 * GET /api/me
 * @summary Verify the accessToken of the user
 * @security BasicAuth
 * @tags user
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 * @example response - 200 - success response example
 * {
 *      "firstname": "Harleen",
 *      "lastname": "Quinzel",
 *      "nickname": "HarleyQuinn",
 *      "mail": "harleyquinn@gmail.com",
 *      "password": "joker12345"
 * }
 */
router.get('/api/me', authenticateToken, (req, res) => {
    res.send(req.user);
});

// Refresh token route
/**
 * POST /api/refreshToken
 * @summary return new accessToken
 * @tags user
 * @param {object} request.body.required - refreshToken
 * @return {object} 200 - succes response - application/json
 * @example response - 200 - sucess response exemple
 * {
 *      "accessToken":
 * }   
 */
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

/**
 * GET /
 * @summary Home page test
 * @security BasicAuth
 * @tags test
 * @return {string} 200 - success response
 */
router.get('/', (req, res) => {
    res.send("Hello there :)");
});

module.exports = router;