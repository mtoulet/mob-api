const express = require('express');
const tournamentController = require('../controller/tournament');
const router = express.Router();
const { authenticateToken } = require('../service/jwt');


// #region new tournament
/**
 * POST /api/tournaments
 * @summary Creates a tournament and save it in the database
 * @security BearerAuth
 * @tags tournament
 * @param {TournamentSent} request.body.required - tournament informations
 * @return {TournamentReturned} 200 - success response - application/json
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
 */
// #endregion
router.get('/api/tournaments', tournamentController.getAllTournaments);

// #region get tournament
/**
 * GET /api/tournaments/{id}
 * @summary This return all informations of a tournament via its id
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
 * @return {object} 403 - forbidden
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
 * @example response - 403 - forbidden
 * {
 *      "error": "Vous n'avez pas les droits nécessaires pour effectuer cette action"
 * }
 */

// #endregion
router.patch('/api/tournaments/:id', authenticateToken, tournamentController.patchTournament);

// #region delete /api/tournaments/:id/
/**
 * DELETE /api/tournaments/{id}/
 * @summary It delete a tournament via its id
 * @security BearerAuth
 * @tags tournament
 * @param {integer} id.path.required - tournament id info
 * @return {TournamentReturned} 200 - success response - application/json
 * @return {object} 403 - forbidden
 * @return {object} 404 - not found
 * @example response - 200 - response
 * {
 *      "message": "Le tournoi a bien été supprimé"
 * }
 * @example response - 403 - forbidden
 * {
 *      "error": "Vous n'avez pas les droits nécessaires pour effectuer cette action"
 * }
 * @example response - 404 - not found
 * {
 *      "error": "Tournoi inexistant"
 * }
 */
// #endregion
router.delete('/api/tournaments/:id', authenticateToken, tournamentController.deleteTournament);

// #region get /api/tournaments/:id/profiles/ 
/**
 * GET /api/tournaments/{id}/profiles/
 * @summary return a list of all users in a tournament
 * @security BearerAuth
 * @tags tournament
 * @param {integer} id.path.required - tournament id info
 * @return {array<UserTournament>} 200 - success response - application/json
 * @return {object} 204 - no content
 * @return {object} 404 - not found
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
 * @example response - 204 - no content
 * {
 *      "error": "Aucun utilisateur n'est encore inscrit à ce tournoi"
 * }
 * @example response - 404 - not found
 * {
 *      "error": "Tournoi inexistant"
 * }
 */

// #endregion
router.get('/api/tournaments/:id/profiles/', authenticateToken, tournamentController.getUserTournamentList);

// #region post /api/tournaments/:id/profiles/
/**
 * POST /api/tournaments/{id}/profiles/
 * @summary subscribe a user to a tournament
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
 * @summary It unsubscribe a user from a tournament
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
 * @summary return a list of tournament by user_id
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
 *          "user_id": 23
 *      },
 *      {
 *          "label": "White Rabbit",
 *          "id": 2,
 *          "user_id": 23
 *      },
 *      {
 *          "label": "Rags to Riches",
 *          "id": 3,
 *          "user_id": 23
 *      },
 *      {
 *          "label": "10 tournament",
 *          "id": 6,
 *          "user_id": 23
 *      }
 * ]
 * @example response - 404 - not found
 * {
 *      "error": "Tournoi inexistant"
 * }
 */
// #endregion
router.get('/api/tournaments/profiles/:id/', authenticateToken, tournamentController.getTournamentListByUserId);

// #region get /api/tournaments/:id/encounters/profiles/
/** 
 * GET /api/tournaments/{id}/encounters/profiles/
 * @summary return a list of user in encounters in tournament by tournament id
 * @security BasicAuth
 * @tags tournament
 * @param {integer} id.path.required - tournament id info
 * @return {array<TournamentWithEncounterWithUser>} 200 - success response - application/json
 * @return {object} 404 - not found
 * @example response - 200 - response
 * [
 *      {
 *          "user_id": 10,
 *          "encounter_id": 1,
 *          "tournament_id": 2
 *      },
 *      {
 *          "user_id": 5,
 *          "encounter_id": 2,
 *          "tournament_id": 2
 *      },
 *      {
 *          "user_id": 1,
 *          "encounter_id": 3,
 *          "tournament_id": 2
 *      },
 *      {
 *          "user_id": 2,
 *          "encounter_id": 6,
 *          "tournament_id": 2
 *      }
 * ]
 * @example response - 404 - not found
 * {
 *      "error": "aucun tournoi n'a été trouvé"
 * }
 */
// #endregion
router.get('/api/tournaments/:id/encounters/profiles', tournamentController.getListOfUserInEncounterByTournamentId);

module.exports = router;