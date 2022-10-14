const express = require('express');
const userController = require('../controller/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { authenticateToken, generateAccessToken } = require('../service/jwt');
const validationModule = require('../service/validation');
const { UserSchema, PasswordSchema } = require('../service/schema');

// #region /api/login
/**
 * POST /api/login
 * @summary login user and create an access token 
 * @security BasicAuth
 * @tags user
 * @param {Guest} request.body.required - user info
 * @return {User} 200 - User - application/json
 * @return {object} 401 - Unauthorized response
 * @example response - 200 - response
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
 *          "trophies": 0,
 *          "honor_point": 0,
 *          "team": null,
 *          "role": null,
 *          "avatar": "image.com",
 *          "created_at": "2022-09-28T13:59:10.857Z",
 *          "updated_at": "2022-09-28T13:59:10.857Z"
 *      }
 * }
 * @example response - 401 - error
 * {
 *      "error": "Mauvais couple email/mot de passe"
 * }
 */
// #endregion
router.post('/api/login', userController.login);

// #region /api/register
/**
 * POST /api/register
 * @summary Creates a user and save it in the database
 * @security BasicAuth
 * @tags user
 * @param {newUser} request.body.required - user info
 * @return {newUser} 200 - success response - application/json
 * @return {object} 500 - Internal error
 * @example response - 200 - response
 * {
 *      "firstname": "Harleen",
 *      "lastname": "Quinzel",
 *      "nickname": "HarleyQuinn",
 *      "mail": "harleyquinn@gmail.com"
 * }
 * @example response - 500 - internal error
 * {
 *      "error": "Internal error, wrong body schema"
 * }
 */
// #endregion
router.post('/api/register', validationModule.validateBody(UserSchema), userController.register);

// #region /api/profiles
// Route to get all user profiles stored in the database
/**
 * GET /api/profiles
 * @summary This return all informations of all users
 * @security BasicAuth
 * @tags user
 * @return {array<User>} 200 - success response - application/json
 * @example response - 200 - response
 * [
 *      {
 *          "id": 1,
 *          "lastname": "Simonis",
 *          "firstname": "Olin",
 *          "nickname": "Breana81",
 *          "mail": "Damaris_Kihn@gmail.com",
 *          "trophies": 0,
 *          "honor_point": 0,
 *          "team": null,
 *          "role": null,
 *          "avatar": "image.com",
 *          "created_at": "2022-09-28T12:04:51.908Z",
 *          "updated_at": "2022-09-28T12:04:51.908Z"
 *      },
 *      {
 *          "id": 2,
 *          "lastname": "Wolf",
 *          "firstname": "Tom",
 *          "nickname": "Cristopher71",
 *          "mail": "Fidel47@yahoo.com",
 *          "trophies": 0,
 *          "honor_point": 0,
 *          "team": null,
 *          "role": null,
 *          "avatar": "image.com",
 *          "created_at": "2022-09-28T12:04:51.931Z",
 *          "updated_at": "2022-09-28T12:04:51.931Z"
 *      },
 *      {
 *          "id": 3,
 *          "lastname": "Walter",
 *          "firstname": "Zelda",
 *          "nickname": "Garrett.Hagenes",
 *          "mail": "Stephon_Zemlak@hotmail.com",
 *          "trophies": 0,
 *          "honor_point": 0,
 *          "team": null,
 *          "role": null,
 *          "avatar": "image.com",
 *          "created_at": "2022-09-28T12:04:51.952Z",
 *          "updated_at": "2022-09-28T12:04:51.952Z"
 *      }
 * ]
 */
// #endregion
router.get('/api/profiles', userController.getAllProfiles);

// #region /api/profiles/:id
/**
 * GET /api/profiles/{id}
 * @summary return a user profile via his id
 * @security BearerAuth
 * @tags user
 * @param {integer} id.path.required - user id info
 * @return {User} 200 - User - application/json
 * @return {object} 404 - not found
 * @example response - 200 - response
 * {
 *      "id": 14,
 *      "firstname": "Hugo",
 *      "lastname": "Victor",
 *      "nickname": "Vic",
 *      "mail": "vichug@gmail.com",
 *      "trophies": 0,
 *      "honor_point": 0,
 *      "team": null,
 *      "role": null,
 *      "avatar": "image.com",
 *      "created_at": "2022-09-28T13:59:10.857Z",
 *      "updated_at": "2022-09-28T13:59:10.857Z"
 * }
 * @example response - 404 - not found
 * {
 *      "error": "Utilisateur inexistant"
 * }
 */
// #endregion
router.get('/api/profiles/:id', authenticateToken, userController.getProfile);

// #region /api/profiles/
/**
 * PATCH /api/profiles/{id}/
 * @summary edit user profile via his id
 * @security BearerAuth
 * @tags user
 * @param {integer} id.path.required - user id info
 * @param {EditedUser} request.body.required - user info to edit
 * @return {User} 200 - success response - application/json
 * @example response - 200 - response
 * {
 *          "id": 1,
 *          "lastname": "Simonis",
 *          "firstname": "Olin",
 *          "nickname": "Breana81",
 *          "mail": "Damaris_Kihn@gmail.com",
 *          "trophies": 0,
 *          "honor_point": 0,
 *          "team": null,
 *          "role": null,
 *          "avatar": "image.com",
 *          "created_at": "2022-09-28T13:59:10.857Z",
 *          "updated_at": "2022-09-28T13:59:10.857Z"
 * }
 */
// #endregion
router.patch('/api/profiles/:id', authenticateToken, userController.patchProfile);

// #region /api/profiles/:id/pwd
/**
 * PATCH /api/profiles/{id}/pwd
 * @summary edit the password of the connected user
 * @security BearerAuth
 * @tags user
 * @param {integer} id.path.required - user id info
 * @param {NewPassword} request.body.required - old and new password info
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - bad request
 * @example response - 200 - success response
 * {
 *      "message": "Votre mot de passe a bien été modifié"
 * }
 * @example response - 400 - bad request same password
 * {
 *      "error": "Votre nouveau mot de passe est identique au précédent"
 * }
 * @example response - 400 - bad request invalid password
 * {
 *      "error": "Mot de passe invalide"
 * }
 */
// #endregion
router.patch('/api/profiles/:id/pwd', authenticateToken, validationModule.validateBody(PasswordSchema), userController.patchPwd);

// #region /api/profiles/:id/
/**
 * DELETE /api/profiles/{id}/
 * @summary allow to delete a user profile via his id
 * @security BearerAuth
 * @tags user
 * @param {integer} id.path.required - user id info
 * @param {Password} request.body.required - password info
 * @return {object} 200 - success response - application/json
 * @return {object} 404 - not found error
 * @return {object} 401 - unauthorized
 * @example response - 200 - success response
 * {
 *      "message": "Votre compte a bien été supprimé"
 * }
 * @example response - 404 - not found error
 * {
 *      "error": "Utilisateur inexistant"
 * }
 * @example response - 401 - unauthorized error
 * {
 *      "error": "Mauvais mot de passe"
 * }
 */
// #endregion
router.delete('/api/profiles/:id', authenticateToken, userController.deleteProfile);

// #region /api/profiles/:id/add-honor
/**
 * POST /api/profiles/{id}/add-honor
 * @summary Allow a user to upvote another user to give him +1 honor point
 * @security BearerAuth
 * @tags user
 * @param {integer} id.path.required - user id info
 * @return {object} 200 - success response - application/json
 * @return {object} 404 - not found
 * @example response - 200 - success response
 * {
 *      "message": "Vous avez honoré cet utilisateur"
 * }
 * @example response - 404 - not found error
 * {
 *      "error": "Utilisateur inexistant"
 * }
 */
// #endregion
router.post('/api/profiles/:id/add-honor', authenticateToken, userController.addHonorPointToUser);

// #region /api/profiles/:id/remove-honor
/**
 * POST /api/profiles/{id}/remove-honor
 * @summary Allow a user to downvote another user to reduce his honor points by 1
 * @security BearerAuth
 * @tags user
 * @param {integer} id.path.required - user id info
 * @return {object} 200 - success response - application/json
 * @return {object} 404 - not found
 * @example response - 200 - success response
 * {
 *      "message": "Vous avez deshonoré cet utilisateur"
 * }
 * @example response - 404 - not found error
 * {
 *      "error": "Utilisateur inexistant"
 * }
 */
// #endregion
router.post('/api/profiles/:id/remove-honor', authenticateToken, userController.removeHonorPointToUser);

// #region /api/profiles/:id/add-trophies
/**
 * POST /api/profiles/{id}/add-trophies
 * @summary Give the winner of a tournament a trophy (in bdd)
 * @security BearerAuth
 * @tags user
 * @param {integer} id.path.required - user id info
 * @return {object} 200 - success response - application/json
 * @return {object} 404 - not found
 * @example response - 200 - success response
 * {
 *      "message": "L'utilisateur d'id 5 a gagné un trophée"
 * }
 * @example response - 404 - not found error
 * {
 *      "error": "Utilisateur inexistant"
 * }
 */
// #endregion
router.post('/api/profiles/:id/add-trophies', authenticateToken, userController.addTrophiesToTuser);

// #region /api/profiles/:id/tournaments
/**
 * GET /api/profiles/{id}/tournaments
 * @summary A list of tournaments where the user is either a moderator or a player
 * @security BearerAuth
 * @tags user
 * @param {integer} id.path.required - user id info
 * @return {Array<TournamentReturned>} 200 - success response - application/json
 * @return {object} 404 - not found
 * @example response - 200 - success response
 * [
 *      {
 *          "id": 1,
 *          "label": "the Big One",
 *          "type": "privé",
 *          "date": "2022-09-28T12:04:51.931Z",
 *          "game": "street fighter 2",
 *          "format": "single elimination",
 *          "max_player_count": 128,
 *          "description": "lorem ipsum",
 *          "image": "image.com",
 *          "user_id": 153
 *          
 *      },
 *      {
 *          "id": 2,
 *          "label": "final count down",
 *          "type": "public",
 *          "date": "2022-08-28T12:04:51.931Z",
 *          "game": "multiversus",
 *          "format": "single elimination",
 *          "max_player_count": 128,
 *          "description": "lorem ipsum",
 *          "image": "image.com",
 *          "user_id": 321
 *      },
 *      {
 *          "id": 3,
 *          "label": "machine war barrel tournament",
 *          "type": "privé",
 *          "date": "2032-09-28T12:06:51.931Z",
 *          "game": "League of legend",
 *          "format": "single elimination",
 *          "max_player_count": 128,
 *          "description": "lorem ipsum",
 *          "image": "image.com",
 *          "user_id": 113
 *      }
 * ]
 * @example response - 404 - not found error
 * {
 *      "error": "Utilisateur inexistant"
 * }
 */
// #endregion
router.get('/api/profiles/:id/tournaments', userController.getTournamentListByUserId);

//! -------------------- JWT -----------------------

// #region /api/me
 /**
  * GET /api/me
  * @summary Verify the accessToken of the user
  * @security BearerAuth
  * @tags user
  * @return {object} 200 - success response - application/json
  * @example response - 200 - response
  * {
  *      "firstname": "Harleen",
  *      "lastname": "Quinzel",
  *      "nickname": "HarleyQuinn",
  *      "mail": "harleyquinn@gmail.com"
  * }
  */
 // #endregion
 router.get('/api/me', authenticateToken, (req, res) => {
    res.send(req.user);
});

// #region /api/refreshToken
// Refresh token route
/**
 * POST /api/refreshToken
 * @summary return a new accessToken
 * @tags user
 * @security BearerAuth
 * @return {object} 200 - succes response - application/json
 * @example response - 200 - sucess response exemple
 * {
 *      "accessToken":"iqhzjudmoihSRGjstrfhfthfhftftQZdQihjsefzefzefzpoaiQRSGuhrbngpoaleQZDnrvhgzfopentgpaynbSRGpeyhpvçaehngvpaebn"
 * }   
 */
// #endregion
 router.post('/api/refreshToken', (req, res) => {
    const authHeader = req.headers['authorization'];
    // JWT goes through the authorization header with value "Bearer ozirozirozirozirzoir", then we split with a space to get the token. It is a conventionnal naming
    const token = authHeader && authHeader.split(' ')[1];
    
    if(!token) {
        return res.sendStatus(401); // If the token isn't found, it returns an error
    }
    
    // If it's found we verify it by passing the token, the secret key and a function called to send either an error or the collected data
    jwt.verify(token, `${process.env.REFRESH_TOKEN_SECRET}`, (err, user) => {
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

module.exports = router;