require('dotenv').config();
// #region express
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

// On active le middleware pour parser le payload JSON
app.use(express.json());
// On active le middleware pour parser le payload urlencoded
app.use(express.urlencoded({ extended: true }));


const router = require('./router');
app.use(router);

// #endregion

// #region swagger

const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
    info: {
        version: "1.0.0",
        title: "API Mob",
        license: {
            name: "MIT"
        },
        description: `This api is directly linked to the mob (multiplayer online bracket) application. It is used to make calls to our database to create tournaments and new users  it's a school project that we realized at 5 in one month. do not hesitate to contact us if you have any ideas for improvement`,
        contact: {
        name: "API Support",
        email: "mob.api.contact@gmail.com"
        }
    },
    security: {
        BasicAuth: {
            type: "http",
            scheme: "basic"
        },
        BearerAuth: {
            type: "http",
            scheme: "bearer"
        }
    },
    swaggerUIPath: "/api-docs", // URL where SwaggerUI will be rendered
    baseDir: __dirname, // Base directory which we use to locate your JSDOC files
    filesPattern: "./**/*.js", // Global pattern to find our jsdoc files (multiple patterns can be added in an array)
    exposeSwaggerUI: true // Expose OpenAPI UI

};

expressJSDocSwagger(app)(options);

/**
 * A newUser
 * @typedef {object} newUser
 * @property {string} firstname.required - The firstname
 * @property {string} lastname.required - The lastname
 * @property {string} nickname.required - The nickname
 * @property {string} mail.required - The email
 * @property {string} password.required - The password
 */

/**
 * A User
 * @typedef {object} User
 * @property {integer} id - the id
 * @property {string} firstname - The firstname
 * @property {string} lastname - The lastname
 * @property {string} nickname - The nickname
 * @property {string} mail - The email
 * @property {integer} trophies - Number of trophies
 * @property {integer} honor_point -  behavior score
 * @property {string} team - The team
 * @property {string} role - The role
 * @property {string} avatar - The profile picture
 * @property {string} created_at - The timestamp with timezone when user profile was created
 * @property {string} updated_at - The timestamp with timezone when user profile is updated
*/

/**
 * An edited user
 * @typedef {object} EditedUser
 * @property {string} firstname - The firstname to edit
 * @property {string} lastname - The lastname to edit
 * @property {string} nickname - The nickname
 * @property {string} avatar - The profile picture
 */

/**
 * A User who wants to login
 * @typedef {object} Guest
 * @property {string} mail - The email
 * @property {string} password - The password
 */

/**
 * A password
 * @typedef {object} Password
 * @property {string} password - The password
 */

/**
 * A new Password
 * @typedef {object} NewPassword
 * @property {string} password - The old password
 * @property {string} newPassword - The new password
 */

/**
 * A tournament sent
 * @typedef {object} TournamentSent
 * @property {string} label - The name of tournament
 * @property {string} type - The type of tournament
 * @property {string} date - The date
 * @property {string} game - The  game
 * @property {string} format - The  format
 * @property {integer} max_player_count - The maximum number of players in the tournament
 * @property {string} description - Informations about this tournament
 * @property {string} image - The picture of the tournament
 * @property {integer} user_id -  The user_id of the user which created the tournament
*/

/**
 * A returned tournament
 * @typedef {object} TournamentReturned
 * @property {integer} id - The id
 * @property {string} label - The name of tournament
 * @property {string} type - The type of tournament
 * @property {string} date - The date
 * @property {string} game - The  game
 * @property {string} format - The  format
 * @property {integer} max_player_count - The maximum number of players in the tournament
 * @property {string} description - Informations about this tournament
 * @property {string} image - The picture of the tournament
 * @property {integer} user_id -  The user_id of the user which created the tournament
*/

/**
 * A tournament_has_user
 * @typedef {object} UserTournament
 * @property {integer} user_id - The id of the user
 */

/**
 * A tournament_id with user_id
 * @typedef {object} UserAddedToTournament
 * @property {integer} tournament_id - The id of the tournament
 * @property {integer} user_id - The id of the user
 */

/**
 * A tournament with his label, id, and moderator (user_id)
 * @typedef {object} TournamentByUserId
 * @property {string} label - The label of the tournament
 * @property {integer} id - The id of the tournament
 * @property {integer} user_id - the id of the user who created the tournament
 */

/**
 * Error 404
 * @typedef {object} Error404
 * @property {string} error - the error
 */

/**
 * An encounter sent
 * @typedef {object} EncounterSent
 * @property {string} date - The date of encounter
 * @property {integer} tournament_id - the id of associated tournament  
 */

/**
 * An encounter returned
 * @typedef {object} EncounterReturned
 * @property {integer} id - The id of the encounter
 * @property {string} winner - The nickname of the winner
 * @property {string} loser - The nickname of the loser
 * @property {string} date - The date of encounter
 * @property {integer} winner_score - The score of the winner
 * @property {integer} loser_score - The score of the loser
 * @property {integer} tournament_id - the id of associated tournament  
 */

/**
 * An encounter edited
 * @typedef {object} EncounterEdited
 * @property {string} winner - The nickname of the winner
 * @property {string} loser - The nickname of the loser
 * @property {string} date - The date of encounter
 * @property {integer} winner_score - The score of the winner
 * @property {integer} loser_score - The score of the loser  
 */

/**
 * A user_id with encounter_id
 * @typedef {object} UserAddedToEncounters
 * @property {integer} user_id - the id of user
 * @property {integer} encounter_id - The id of encounter
 */

/**
 * A encounter_has_user
 * @typedef {object} UserEncounter
 * @property {integer} user_id - The id of the user
 */

/**
 * A List of Tournament_id with encounter_id contain user_id
 * @typedef {object} TournamentWithEncounterWithUser
 * @property {integer} user_id
 * @property {integer} encounter_id
 * @property {integer} tournament_id
 */

// #endregion

module.exports = app;