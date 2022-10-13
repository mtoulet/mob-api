const express = require('express');
const encounterController = require('../controller/encounter');
const router = express.Router();
const { authenticateToken } = require('../service/jwt');

// #region new encounter
/**
 * POST /api/encounters
 * @summary Creates an encounter and save it in the database
 * @security BearerAuth
 * @tags encounter
 * @param {EncounterSent} request.body.required - encounter informations
 * @return {EncounterReturned} 200 - success response - application/json
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
 *     "error": "Rencontre inexistante"
 * }
 */
// #endregion
router.get('/api/encounters/:id', encounterController.getEncounter);

//  #region /api/encounters/:id
/**
 * PATCH /api/encounters/{id}
 * @summary allow to edit an encounter informations
 * @security BearerAuth
 * @tags encounter
 * @param {integer} id.path.required - encounter id info
 * @param {EncounterEdited} request.body.required - info to edit
 * @return {EncounterReturned} 200 - success response - application/json
 * @return {object} 404 - not found
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
 * @example response - 404 - not found
 * {
 *      "error": "Rencontre inexistante"
 * }
 */

// #endregion
router.patch('/api/encounters/:id', authenticateToken, encounterController.patchEncounter);

// #region post /api/encounters/:id/profiles/
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

// #region get /api/encounters/tournaments/:id
/**
 * GET /api/encounters/tournaments/{id}
 * @summary This returns an encounters list from a tournament via its id
 * @security BearerAuth
 * @tags encounter
 * @param {integer} id.path.required - tournament id info
 * @return {Array<EncounterReturned>} 200 - success response - application/json
 * @return {object} 404 - not found
 * @example response - 200 - response
 * [
 *      {
 *          "id": 2,
 *          "winner": null,
 *          "loser": null,
 *          "date": "2022-08-28T12:04:51.931Z",
 *          "winner_score": 0,
 *          "loser_score": 0,
 *          "tournament_id": 1
 *      },
 *      {
 *          "id": 3,
 *          "winner": null,
 *          "loser": null,
 *          "date": "2022-08-28T12:04:51.931Z",
 *          "winner_score": 0,
 *          "loser_score": 0,
 *          "tournament_id": 1
 *      },
 *      {
 *          "id": 4,
 *          "winner": null,
 *          "loser": null,
 *          "date": "2022-08-28T12:04:51.931Z",
 *          "winner_score": 0,
 *          "loser_score": 0,
 *          "tournament_id": 1
 *      },
 *      {
 *          "id": 5,
 *          "winner": null,
 *          "loser": null,
 *          "date": "2022-08-28T12:04:51.931Z",
 *          "winner_score": 0,
 *          "loser_score": 0,
 *          "tournament_id": 1
 *      },
 *      {
 *          "id": 6,
 *          "winner": null,
 *          "loser": null,
 *          "date": "2022-08-28T12:04:51.931Z",
 *          "winner_score": 0,
 *          "loser_score": 0,
 *          "tournament_id": 1
 *      }
 * ]
 * @example response - 404 - not found
 * {
 *     "error": "Tournoi inexistant"
 * }
 */
// #endregion
router.get('/api/encounters/tournaments/:id', encounterController.getEncountersListByTournamentId);

module.exports = router;