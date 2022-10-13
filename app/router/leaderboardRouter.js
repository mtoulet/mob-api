const express = require('express');
const leaderboardController = require('../controller/leaderboard');
const router = express.Router();


// #region Leaderboard /api/leaderboard/mosttrophies
/**
 * GET /api/leaderboard/mosttrophies
 * @summary This return list of 15 user with more trophies
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
router.get('/api/leaderboard/mosttrophies', leaderboardController.getMostTrophiesList);

// #region Leaderboard /api/leaderboard/mosthonor
/**
 * GET /api/leaderboard/mosthonor
 * @summary This return list of 15 user with more honor_points
 * @security BasicAuth
 * @tags leaderboard
 * @return {array<User>} 200 - success response - application/json
 * @example response - 200 - response
 *[
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
router.get('/api/leaderboard/mosthonor', leaderboardController.getMostHonorList);

// #region Leaderboard /api/leaderboard/lowhonor
/**
 * GET /api/leaderboard/lowhonor
 * @summary This return list of 15 user with less honor_points
 * @security BasicAuth
 * @tags leaderboard
 * @return {array<User>} 200 - success response - application/json
 * @example response - 200 - response
 *[
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
router.get('/api/leaderboard/lowhonor', leaderboardController.getLessHonorList);

// #region Leaderboard /api/leaderboard/lastregister
/**
 * GET /api/leaderboard/lastregister
 * @summary This return list of 15 last register
 * @security BasicAuth
 * @tags leaderboard
 * @return {array<User>} 200 - success response - application/json
 * @example response - 200 - response
 *[
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
router.get('api/leaderboard/lastregister', leaderboardController.getlastregisterUserList)

module.exports = router;