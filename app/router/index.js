const express = require('express');
const userController = require('../controller/user');
const tournamentController = require('../controller/tournament');
const encounterController = require('../controller/encounter');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { authenticateToken, generateAccessToken } = require('../service/jwt');
const validationModule = require('../service/validation');
const { UserSchema, PasswordSchema } = require('../service/schema');
const { Encounter } = require('../model');


// #region home page
/**
 * GET /
 * @summary Home page test
 * @security BasicAuth
 * @tags test
 * @return {string} 200 - success response
 */
// #endregion
router.get('/', (req, res) => {
    res.send("Hello there :)");
});

//! --------------------------------------------------------------- USER --------------------------------------------------


// #region /api/login
/**
 * POST /api/login
 * @summary login user and create an access token 
 * @security BasicAuth
 * @tags user
 * @param {Guest} request.body.required - user info
 * @return {User} 200 - User - application/json
 * @return {object} 401 - Unauthorized response
 * @example response - 200 - success: true, response
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
 * @return {object} 403 - forbidden
 * @example response - 200 - response
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
 *          "password": "$2b$10$SpWduNY5tEHr/6HxqEKp9OT9ILtXPS8CRdL1gJA6dmUfHKN7A6dMy",
 *          "trophies": null,
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
 *          "password": "$2b$10$SpWduNY5tEHr/6HxqEKp9OT9ILtXPS8CRdL1gJA6dmUfHKN7A6dMy",
 *          "trophies": null,
 *          "honor_point": 0,
 *          "team": null,
 *          "role": null,
 *          "avatar": "image.com",
 *          "created_at": "2022-09-28T12:04:51.952Z",
 *          "updated_at": "2022-09-28T12:04:51.952Z"
 *      }
 * ]
 * @example response - 403 - forbidden error
 * {
 *     "error": "You don't have permission to access this resource"
 * }
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
 * @return {string} 401 - Unauthorized
 * @return {object} 404 - not found error
 * @example response - 200 - response
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
 *      "avatar": "image.com",
 *      "created_at": "2022-09-28T13:59:10.857Z",
 *      "updated_at": "2022-09-28T13:59:10.857Z"
 * }
 * @example response - 401 - Unauthorized error
 * Unauthorized
 * @example response - 404 - not found error
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
 * @return {User} 200 - success response - application/json
 * @return {string} 401 - Unauthorized response
 * @example response - 200 - response
 * {
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
 *          "avatar": "image.com",
 *          "created_at": "2022-09-28T13:59:10.857Z",
 *          "updated_at": "2022-09-28T13:59:10.857Z"
 * }
 * @example response - 401 - error
 * Unauthorized
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
 * @return {string} 401 - unauthorized
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
 * @example response - 401 - unauthorized
 * Unauthorized
 */
// #endregion
router.patch('/api/profiles/:id/pwd', authenticateToken, validationModule.validateBody(PasswordSchema), userController.patchPwd);

// #region /api/profiles/:id/
/**
 * DELETE /api/profiles/{id}/
 * @summary delete user profile via his id
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
 *      "error": "Mauvais couple email/mot de passe"
 * }
 */
// #endregion
router.delete('/api/profiles/:id', authenticateToken, userController.deleteProfile);

// #region /api/profiles/:id/add-honor
/**
 * POST /api/profiles/{id}/add-honor
 * @summary A user can upvote another user to give him +1 honor point
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
 * @summary A user can downvote another user to reduce his honor points by 1
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
 * @summary A winner of a tournament win a trophy (in bdd)
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
router.post('/api/profiles/:id/add-trophies', authenticateToken, userController.addTrophiesToTuser)


//! --------------------------------------------------------------- TOURNAMENT --------------------------------------------------


// #region new tournament
/**
 * POST /api/tournaments
 * @summary Creates a tournament and save it in the database
 * @security BearerAuth
 * @tags tournament
 * @param {TournamentSent} request.body.required - tournament informations
 * @return {TournamentReturned} 200 - success response - application/json
 * @return {string} 401 - unauthorized
 * @example response - 200 - response
 * {
 *      "id": 1,
 *      "label": "the Big One",
 *      "type": "privé",
 *      "date": "2022-09-28T12:04:51.931Z",
 *      "game": "street fighter 2",
 *      "format": "single elimination",
 *      "max_player_count": 128,
 *      "description": "lorem ipsum",
 *      "image": "image.com",
 *      "user_id": 153    
 * }
 * @example response - 401 - error
 * Unauthorized
 */
// #endregion
router.post('/api/tournaments', authenticateToken, tournamentController.addTournament);

// #region tournaments list
/**
 * GET /api/tournaments
 * @summary This return all informations of all tournaments
 * @security BasicAuth
 * @tags tournament
 * @return {array<TournamentReturned>} 200 - success response - application/json
 * @return {object} 403 - forbidden
 * @example response - 200 - response
 * [
 *  {
 *      "id": 1,
 *      "label": "the Big One",
 *      "type": "privé",
 *      "date": "2022-09-28T12:04:51.931Z",
 *      "game": "street fighter 2",
 *      "format": "single elimination",
 *      "max_player_count": 128,
 *      "description": "lorem ipsum",
 *      "image": "image.com",
 *      "user_id": 153
 *          
 *  },
 *  {
 *      "id": 2,
 *      "label": "final count down",
 *      "type": "public",
 *      "date": "2022-08-28T12:04:51.931Z",
 *      "game": "multiversus",
 *      "format": "single elimination",
 *      "max_player_count": 128,
 *      "description": "lorem ipsum",
 *      "image": "image.com",
 *      "user_id": 321
 *  },
 *  {
 *      "id": 3,
 *      "label": "machine war barrel tournament",
 *      "type": "privé",
 *      "date": "2032-09-28T12:06:51.931Z",
 *      "game": "League of legend",
 *      "format": "single elimination",
 *      "max_player_count": 128,
 *      "description": "lorem ipsum",
 *      "image": "image.com",
 *      "user_id": 113
 *  }
 * ]
 * @example response - 403 - error
 * {
 *     "error": "You don't have permission to access this resource"
 * }
 */
// #endregion
router.get('/api/tournaments', tournamentController.getAllTournaments);

// #region get tournament
/**
 * GET /api/tournaments/{id}
 * @summary This return all informations of the tournament via its id
 * @security BasicAuth
 * @tags tournament
 * @param {integer} id.path.required - tournament id info
 * @return {TournamentReturned} 200 - success response - application/json
 * @return {object} 404 - not found
 * @example response - 200 - response
 * {
 *      "id": 1,
 *      "label": "the Big One",
 *      "type": "privé",
 *      "date": "2022-09-28T12:04:51.931Z",
 *      "game": "street fighter 2",
 *      "format": "single elimination",
 *      "max_player_count": 128,
 *      "description": "lorem ipsum",
 *      "image": "image.com",
 *      "user_id": 153
 * }
 * @example response - 404 - not found
 * {
 *     "error": "Tournoi inexistant"
 * }
 */
// #endregion
router.get('/api/tournaments/:id', tournamentController.getTournament);

// #region /api/tournaments/:id
/**
 * PATCH /api/tournaments/{id}
 * @summary allow to edit a tournament informations
 * @security BearerAuth
 * @tags tournament
 * @param {integer} id.path.required - tournament id info
 * @param {TournamentSent} request.body.required - info to edit
 * @return {TournamentReturned} 200 - success response - application/json
 * @return {string} 401 - Unauthorized response
 * @example response - 200 - response
 * {
 *      "id": 1,
 *      "label": "gros tournoi",
 *      "type": "public",
 *      "date": "2032-09-28T12:06:51.931Z",
 *      "game": "LOL",
 *      "format": "single elimination",
 *      "max_player_count": 128,
 *      "description": "lorem ipsum",
 *      "image": "image.com",
 *      "user_id": 12
 * }
 * @example response - 401 - unauthorized error
 * Unauthorized
 */

// #endregion
router.patch('/api/tournaments/:id', authenticateToken, tournamentController.patchTournament);

// #region delete /api/tournaments/:id/
/**
 * DELETE /api/tournaments/{id}/
 * @summary Delete a tournament via its id
 * @security BearerAuth
 * @tags tournament
 * @param {integer} id.path.required - tournament id info
 * @return {TournamentReturned} 200 - success response - application/json
 * @return {string} 401 - unauthorized
 * @example response - 200 - response12
 * {
 *      "message": "Le tournoi a bien été supprimé"
 * }
 * @example response - 401 - unauthorized error
 * Unauthorized
 */
// #endregion
router.delete('/api/tournaments/:id', authenticateToken, tournamentController.deleteTournament);

// #region get /api/tournaments/:id/profiles/ 
/**
 * GET /api/tournaments/{id}/profiles/
 * @summary get a list of all users in tournament
 * @security BearerAuth  :
 * @tags tournament
 * @param {integer} id.path.required - tournament id info
 * @return {array<UserTournament>} 200 - success response - application/json
 * @return {string} 401 - Unauthorized response
 * @example response - 200 - response
 * [
 *      {
 *          "user_id": 1
 *      },
 *      {
 *          "user_id": 2
 *      },
 *      {
 *          "user_id": 3
 *      }
 * ]
 * @example response - 401 - error
 * Unauthorized
 */

// #endregion
router.get('/api/tournaments/:id/profiles/', authenticateToken, tournamentController.getUserTournamentList);

// #region post /api/tournaments/:id/profiles/
/**
 * POST /api/tournaments/{id}/profiles/
 * @summary add a user to a tournament
 * @security BearerAuth
 * @tags tournament
 * @param {integer} id.path.required - tournament id info
 * @param {UserTournament} request.body.required - user id info
 * @return {UserAddedToTournament} 200 - success response - application/json
 * @return {object} 400 - Bad request
 * @example response - 200 - response
 * {
 *      "tournament_id": 1,
 *      "user_id": 5
 * }
 * @example response - 400 - bad request
 * {
 *      "error": "L'utilisateur d'id 5 est déjà inscrit au tournoi d'id 1"
 * }
 */
// #endregion
router.post('/api/tournaments/:id/profiles/', authenticateToken, tournamentController.postUserToTournament);

// #region delete /api/tournaments/:tournament_id/profiles/:user_id/
/** 
 * DELETE /api/tournaments/{tournament_id}/profiles/{user_id}/
 * @summary delete a user from a tournament
 * @security BearerAuth
 * @tags tournament
 * @param {integer} tournament_id.path.required - tournament_id info
 * @param {integer} user_id.path.required - user_id info
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request
 * @example response - 200 - response
 * {
 *      "message": "L'utilisateur a bien été supprimé du tournoi"  
 * }
 * @example response - 400 - bad request
 * {
 *      "error": "L'utilisateur d'id 5 n'est pas inscrit au tournoi d'id 2"
 * }
 */
// #endregion
router.delete('/api/tournaments/:tournament_id/profiles/:user_id/', authenticateToken, tournamentController.deleteUserFromTournament);

// #region get /api/tournaments/profiles/:id/
/** 
 * GET /api/tournaments/profiles/{id}/
 * @summary get list of tournament by user_id
 * @security BearerAuth
 * @tags tournament
 * @param {integer} id.path.required - user_id info
 * @return {array<TournamentByUserId>} 200 - success response - application/json
 * @return {object} 404 - not found
 * @example response - 200 - response
 * [
 *      {
 *          "label": "Get Down Tonight",
 *          "id": 1,
 *          "user_id": 2
 *      },
 *      {
 *          "label": "White Rabbit",
 *          "id": 2,
 *          "user_id": 8
 *      },
 *      {
 *          "label": "Rags to Riches",
 *          "id": 3,
 *          "user_id": 3
 *      },
 *      {
 *          "label": "10 tournament",
 *          "id": 6,
 *          "user_id": 11
 *      }
 * ]
 * @example response - 404 - not found
 * {
 *      "error": "L'utilisateur n'a crée aucun tournoi et n'est inscrit à aucun d'entre eux"
 * }
 */
// #endregion
router.get('/api/tournaments/profiles/:id/', authenticateToken, tournamentController.getTournamentListByUserId);

//! --------------------------------------------------------------- ENCOUNTER --------------------------------------------------

// #region new encounter
/**
 * POST /api/encounters
 * @summary Creates an encounter and save it in the database
 * @security BearerAuth
 * @tags encounter
 * @param {EncounterSent} request.body.required - encounter informations
 * @return {EncounterReturned} 200 - success response - application/json
 * @return {string} 401 - unauthorized
 * @example response - 200 - response
 * {
 *        "id": 2,
*         "winner": null,
*         "loser": null,
*         "date": "2022-08-28T12:04:51.931Z",
*         "winner_score": 0,
*         "loser_score": 0,
*         "tournament_id": 1   
 * }
 * @example response - 401 - error
 * Unauthorized
 */
// #endregion
router.post('/api/encounters',authenticateToken, encounterController.addEncounter);

// #region get encounter
/**
 * GET /api/encounters/{id}
 * @summary This return all informations of an encounter via its id
 * @security BearerAuth
 * @tags encounter
 * @param {integer} id.path.required - encounter id info
 * @return {EncounterReturned} 200 - success response - application/json
 * @return {object} 404 - not found
 * @example response - 200 - response
 * {
 *          "id": 2,
 *          "winner": null,
 *          "loser": null,
 *          "date": "2022-08-28T12:04:51.931Z",
 *          "winner_score": 0,
 *          "loser_score": 0,
 *          "tournament_id": 1
 * }
 * @example response - 404 - not found
 * {
 *     "error": "Tournoi inexistant"
 * }
 */
// #endregion
router.get('/api/encounters/:id', authenticateToken,encounterController.getEncounter);

//  #region /api/encounters/:id
/**
 * PATCH /api/encounters/{id}
 * @summary allow to edit an encounter informations
 * @security BearerAuth
 * @tags encounter
 * @param {integer} id.path.required - encounter id info
 * @param {EncounterEdited} request.body.required - info to edit
 * @return {EncounterReturned} 200 - success response - application/json
 * @return {string} 401 - Unauthorized response
 * @example response - 200 - response
 * {
 *           "id": 2,
 *           "winner": "albator",
 *           "loser": "guillaumeDolle",
 *           "date": "2022-08-28T12:04:51.931Z",
 *           "winner_score": 5,
 *           "loser_score": 4,
 *           "tournament_id": 1
 * }
 * @example response - 401 - unauthorized error
 * Unauthorized
 */

// #endregion
router.patch('/api/encounters/:id', authenticateToken, encounterController.patchEncounter);

// #region post /api/encouters/:id/profiles/
/**
 * POST /api/encounters/{id}/profiles/
 * @summary add a user to an encounter
 * @security BearerAuth
 * @tags encounter
 * @param {integer} id.path.required - encounter id info
 * @param {UserEncounter} request.body.required - user id info
 * @return {UserAddedToEncounters} 200 - success response - application/json
 * @return {object} 400 - Bad request
 * @example response - 200 - response
 * {
 *      "encounter_id": 1,
 *      "user_id": 5
 * }
 * @example response - 400 - bad request
 * {
 *      "error": "L'utilisateur d'id 5 est déjà inscrit à la rencontre d'id 2"
 * }
 */
// #endregion
router.post('/api/encounters/:id/profiles', authenticateToken, encounterController.postUserToEncounter);



//! --------------------------------------------------------------- JWT --------------------------------------------------


// #region /api/me
 /**
  * GET /api/me
  * @summary Verify the accessToken of the user
  * @security BearerAuth
  * @tags user
  * @return {object} 200 - success response - application/json
  * @return {string} 401 - Unauthorized response
  * @example response - 200 - response
  * {
  *      "firstname": "Harleen",
  *      "lastname": "Quinzel",
  *      "nickname": "HarleyQuinn",
  *      "mail": "harleyquinn@gmail.com"
  * }
  * @example response - 401 - error
  * Unauthorized
  */
 // #endregion
 router.get('/api/me', authenticateToken, (req, res) => {
    res.send(req.user);
});

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