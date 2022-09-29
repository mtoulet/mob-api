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
 * @example response - 200 - response example
 * {
 *      "id": 14,
 *      "firstname": "Hugo",
 *      "lastname": "Victor",
 *      "nickname": "Vic",
 *      "mail": "vichug@gmail.com",
 *      "password": "$2b$10$McwT7bdF1s3iEUYamndDXOKNduchPiMuhTzPPyAGqQz9vCORtdGDi",
 *      "trophies": null,
 *      "honor_point": 0,
 *      "team": null,
 *      "role": null,
 *      "created_at": "2022-09-28T13:59:10.857Z",
 *      "updated_at": "2022-09-28T13:59:10.857Z"
 * }
 * @return {array<User>} 403 - forbidden
 * @example response - 403 - error example
 * {
 *     "message": "You don't have permission to access this resource"
 * }
 */
router.get('/api/profiles', userController.getAllProfiles);

/**
 * POST /api/login
 * @summary login user and create an access token 
 * @security BasicAuth
 * @tags user
 * @param {Guest} request.body.required - user info
 * @return {User} 200 - User - application/json
 * @return {object} 200 - accessToken, refreshToken - application/json
 * @return {object} 401 - Unauthorized response
 * @example response - 200 - success: true, response example
 * {
 *      "success": "true",
 *      "accessToken": "opajzepogajezpojapog",
 *      "refreshToken": "idqjsoizekdopqikzdoi",
 *      "foundUser": {
 *          "id": 14,
 *          "firstname": "Hugo",
 *          "lastname": "Victor",
 *          "nickname": "Vic",
 *          "mail": "vichug@gmail.com",
 *          "password": "$2b$10$McwT7bdF1s3iEUYamndDXOKNduchPiMuhTzPPyAGqQz9vCORtdGDi",
 *          "trophies": null,
 *          "honor_point": 0,
 *          "team": null,
 *          "role": null,
 *          "created_at": "2022-09-28T13:59:10.857Z",
 *          "updated_at": "2022-09-28T13:59:10.857Z"
 *      }
 * }
 * @example response - 401 - error example
 * {
 *      "error": "Mauvais couple email/mot de passe"
 * }
 */
router.post('/api/login', userController.login);

/**
 * POST /api/register
 * @summary Creates a user and save it in the database
 * @security BasicAuth
 * @tags user
 * @param {newUser} request.body.required - user info
 * @return {newUser} 200 - success response - application/json
 * @return {object} 401 - Unauthorized response
 * @example response - 200 - response example
 * {
 *      "firstname": "Harleen",
 *      "lastname": "Quinzel",
 *      "nickname": "HarleyQuinn",
 *      "mail": "harleyquinn@gmail.com",
 *      "password": "joker12345"
 * }
 * @example response - 401 - error example
 * {
 *      "error": "Votre Mot de passe doit contenir 8 caractères minimum"
 * }
 */
router.post('/api/register', userController.register);

// Testing route for authentication
/**
 * GET /api/me
 * @summary Verify the accessToken of the user
 * @security BearerAuth
 * @tags user
 * @return {object} 200 - success response - application/json
 * @return {object} 401 - Unauthorized response
 * @example response - 200 - response example
 * {
 *      "firstname": "Harleen",
 *      "lastname": "Quinzel",
 *      "nickname": "HarleyQuinn",
 *      "mail": "harleyquinn@gmail.com",
 *      "password": "joker12345"
 * }
 * @example response - 401 - error example
 * Unauthorized
 */
router.get('/api/me', authenticateToken, (req, res) => {
    res.send(req.user);
});

// Refresh token route
/**
 * POST /api/refreshToken
 * @summary return new accessToken
 * @tags user
 * @security BearerAuth
 * @return {object} 200 - succes response - application/json
 * @example response - 200 - sucess response exemple
 * {
 *      "accessToken":"iqhzjudmoihSRGjstrfhfthfhftftQZdQihjsefzefzefzpoaiQRSGuhrbngpoaleQZDnrvhgzfopentgpaynbSRGpeyhpvçaehngvpaebn"
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