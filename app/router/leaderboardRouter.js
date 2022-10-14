const express = require('express');
const leaderboardController = require('../controller/leaderboard');
const router = express.Router();


// #region Leaderboard /api/leaderboard/most-trophies
/**
 * GET /api/leaderboard/most-trophies
 * @summary This return a list of 15 users with the most trophies
 * @security BasicAuth
 * @tags leaderboard
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
router.get('/api/leaderboard/most-trophies', leaderboardController.getMostTrophiesList);

// #region Leaderboard /api/leaderboard/most-honor
/**
 * GET /api/leaderboard/mosthonor
 * @summary This return a list of 15 users with the most honor_points
 * @security BasicAuth
 * @tags leaderboard
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
router.get('/api/leaderboard/most-honor', leaderboardController.getMostHonorList);

// #region Leaderboard /api/leaderboard/less-honor
/**
 * GET /api/leaderboard/less-honor
 * @summary This return a list of 15 users with the less honor_points
 * @security BasicAuth
 * @tags leaderboard
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
router.get('/api/leaderboard/less-honor', leaderboardController.getLessHonorList);

// #region Leaderboard /api/leaderboard/last-registered
/**
 * GET /api/leaderboard/last-registered
 * @summary This return a list of 15 last registered users
 * @security BasicAuth
 * @tags leaderboard
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
router.get('/api/leaderboard/last-registered', leaderboardController.getlastregisterUserList)

module.exports = router;