const express = require('express');
// const cors = require('cors');
const app = express();
// app.use(cors({
//     origin: '*'
// }));

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    // response.header('Access-Control-Allow-Credentials', true);
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

/** ********* */
/*  SWAGGER */
/** ******** */

const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
    info: {
        version: "1.0.0",
        title: "API Mob",
        license: {
            name: "MIT"
        },
        description: "This api is directly linked to the mob (multiplayer online bracket) application. It is used to make calls to our to create tournaments and new users",
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
 * @property {string} password - The password
 * @property {integer} trophies - Number of trophies
 * @property {integer} honor_point -  behavior score
 * @property {string} team - The team
 * @property {string} role - The role
 * @property {date} created_at - The timestamp with timezone when user profile was created
 * @property {date} updated_at - The timestamp with timezone when user profile is updated
 * }
*/

/**
 * An AccessToken
 * @typedef {string} AccessToken
 */

/**
 * A RefreshToken
 * @typedef {string} RefreshToken
 */

/** ********* */
/*  EXPRESS */
/** ******** */

// On active le middleware pour parser le payload JSON
app.use(express.json());
// On active le middleware pour parser le payload urlencoded
app.use(express.urlencoded({ extended: true }));


const router = require('./router');
app.use(router);

module.exports = app;