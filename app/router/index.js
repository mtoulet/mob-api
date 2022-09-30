const express = require('express');
const userController = require('../controller/user');
const tournamentController = require('../controller/tournament');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { authenticateToken, generateAccessToken } = require('../service/jwt');
// #region /api/profiles
// Route to get all user profiles stored in the database
/**
 * GET /api/profiles
 * @summary This return all informations of all users with Json
 * @tags user
 * @security Admin
 * @return {array<User>} 200 - success response - application/json
 * @example response - 200 - response example
 * [
 *      {
 *          "id": 1,
 *          "lastname": "Simonis",
 *          "firstname": "Olin",
 *          "nickname": "Breana81",
 *          "mail": "Damaris_Kihn@gmail.com",
 *          "password": "$2b$10$SpWduNY5tEHr/6HxqEKp9OT9ILtXPS8CRdL1gJA6dmUfHKN7A6dMy",
 *          "trophies": null,
 *          "honor_point": 0,
 *          "team": null,
 *          "role": null,
 *          "created_at": "2022-09-28T12:04:51.908Z",
 *          "updated_at": "2022-09-28T12:04:51.908Z"
 *      },
 *      {
 *          "id": 2,
 *          "lastname": "Wolf",
 *          "firstname": "Tom",
 *          "nickname": "Cristopher71",
 *          "mail": "Fidel47@yahoo.com",
 *          "password": "$2b$10$SpWduNY5tEHr/6HxqEKp9OT9ILtXPS8CRdL1gJA6dmUfHKN7A6dMy",
 *          "trophies": null,
 *          "honor_point": 0,
 *          "team": null,
 *          "role": null,
 *          "created_at": "2022-09-28T12:04:51.931Z",
 *          "updated_at": "2022-09-28T12:04:51.931Z"
 *      },
 *      {
 *          "id": 3,
 *          "lastname": "Walter",
 *          "firstname": "Zelda",
 *          "nickname": "Garrett.Hagenes",
 *          "mail": "Stephon_Zemlak@hotmail.com",
 *          "password": "$2b$10$SpWduNY5tEHr/6HxqEKp9OT9ILtXPS8CRdL1gJA6dmUfHKN7A6dMy",
 *          "trophies": null,
 *          "honor_point": 0,
 *          "team": null,
 *          "role": null,
 *          "created_at": "2022-09-28T12:04:51.952Z",
 *          "updated_at": "2022-09-28T12:04:51.952Z"
 *      }
 * ]
 * @return {array<User>} 403 - forbidden
 * @example response - 403 - error example
 * {
 *     "message": "You don't have permission to access this resource"
 * }
 */
router.get('/api/profiles', userController.getAllProfiles);
// #endregion

// #region /api/profiles/:mail
/**
 * GET /api/profiles/:mail
 * @summary return a user profile via his mail
 * @security BearerAuth
 * @tags user
 * @param {Guest} request.params.required - mail info
 * @return {User} 200 - User - application/json
 * @example response - 200 - response example
 * {
 *      "id": 14,
 *      "firstname": "Hugo",
 *      "lastname": "Victor",
 *      "nickname": "Vic",
 *      "mail": "vichug@gmail.com",
 *      "trophies": null,
 *      "honor_point": 0,
 *      "team": null,
 *      "role": null,
 *      "created_at": "2022-09-28T13:59:10.857Z",
 *      "updated_at": "2022-09-28T13:59:10.857Z"
 * }
 */
router.get('/api/profiles/:mail', userController.getProfile);
// #endregion

// #region /api/login
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
// #endregion

// #region /api/register
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
 * }
 * @example response - 401 - error example
 * {
 *      "error": "Votre Mot de passe doit contenir 8 caractères minimum"
 * }
 */
router.post('/api/register', userController.register);
// #endregion

// #region /api/me
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
 * }
 * @example response - 401 - error example
 * Unauthorized
 */
router.get('/api/me', authenticateToken, (req, res) => {
    res.send(req.user);
});
// #endregion

// #region /api/refreshToken
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
// #endregion

// #region /api/deleteUser
/**
 * DELETE /api/deleteUser
 * @summary return message 
 * @tags user
 * @param {Guest} request.body.required - user info
 * @return {object} 200 - succes response - application/json
 * @example response - 200 - sucess response exemple
 * {
 *      "message":"vote compte à été supprimé avec succes"
 * }   
 */

router.delete('/api/profiles/:mail/delete', userController.deleteProfile);


// #region home page
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
// #endregion


// #region tournaments List
/**
 * GET /api/tournaments
 * @summary This return all informations of all tournament with Json
 * @tags tournament
 * @security BasicAuth
 * @return {array<Tournament>} 200 - success response - application/json
 * @example response - 200 - response example
 * [
 *      {
 *          "id": 1,
 *          "label": "the Big One",
 *          "type": "privé",
 *          "date": "2022-09-28T12:04:51.931Z",
 *          "game": "street fighter 2",
 *          "format": "single elimination",
 *          "moderator": "george abitbol"
 *          "user_id": "153"
 *          
 *      },
 *      {
 *          id": 2,
 *          "label": "final count down",
 *          "type": "public",
 *          "date": "2022-08-28T12:04:51.931Z",
 *          "game": "multiversus",
 *          "format": "single elimination",
 *          "moderator": "europe"
 *          "user_id": "321"
 *      },
 *      {
 *          id": 3,
 *          "label": "machine war barrel tournament",
 *          "type": "privé",
 *          "date": "2032-09-28T12:06:51.931Z",
 *          "game": "League of legend",
 *          "format": "single elimination",
 *          "moderator": "faker"
 *          "user_id": "113
 *      }
 * ]
 * @return {array<Tournament>} 403 - forbidden
 * @example response - 403 - error example
 * {
 *     "message": "You don't have permission to access this resource"
 * }
 */
 router.get('/api/tournaments', tournamentController.getAllTournaments);
 // #endregion

// #region new tournament
 /**
 * POST /api/tournaments
 * @summary Creates a tournament and save it in the database
 * @tags tournament
 * @security BasicAuth
 * @return {Tournament} 200 - success response - application/json
 * @example response - 200 - response example
 * [
 *      {
 *          "id": 1,
 *          "label": "the Big One",
 *          "type": "privé",
 *          "date": "2022-09-28T12:04:51.931Z",
 *          "game": "street fighter 2",
 *          "format": "single elimination",
 *          "moderator": "george abitbol",
 *          "user_id": "153"
 *          
 *      }
 *     
 * ]
 * @return {Tournament} 403 - forbidden
 * @example response - 403 - error example
 * {
 *     "message": "You don't have permission to access this resource"
 * }
 */
  router.post('/api/tournaments', tournamentController.addTournament);
  // #endregion

// #region get tournament
  /**
 * GET /api/tournaments/:id
 * @summary This return all informations of the tournament by id with Json
 * @tags tournament
 * @security BasicAuth
 * @return {Tournament} 200 - success response - application/json
 * @example response - 200 - response example
 * [
 *      {
 *          "id": 1,
 *          "label": "the Big One",
 *          "type": "privé",
 *          "date": "2022-09-28T12:04:51.931Z",
 *          "game": "street fighter 2",
 *          "format": "single elimination",
 *          "moderator": "george abitbol"
 *          "user_id": "153"
 *          
 *      }
 *     
 * ]
 * @return {Tournament} 403 - forbidden
 * @example response - 403 - error example
 * {
 *     "message": "You don't have permission to access this resource"
 * }
 */
   router.get('/api/tournaments/:id', tournamentController.getTournament);
   // #endregion

// #region Delete tournament

    /**
 * DELETE /api/tournaments/:id
 * @summary Delete Tournament with Id
 * @tags tournament
 * @security BasicAuth
 * @return {Tournament} 200 - success response - application/json
 * @example response - 200 - response example
 * [
 *      {
 *          "message":"Le tournois à bien été supprimé"
 *          
 *      }
 *     
 * ]
 * @return {Tournament} 403 - forbidden
 * @example response - 403 - error example
 * {
 *     "message": "You don't have permission to access this resource"
 * }
 */
     router.delete('/api/tournaments/:id', tournamentController.deleteTournament);

  // #endregion


module.exports = router;