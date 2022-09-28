const express = require('express');

const router = require('./router');

const app = express();

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
        description: "API description",
        contact: {
        name: "API Support",
        email: "g.dolle12@gmail.com", 
        email: "mkarmensky@gmail.com"
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

/** ********* */
/*  EXPRESS */
/** ******** */

// On active le middleware pour parser le payload JSON
app.use(express.json());
// On active le middleware pour parser le payload urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(router);

module.exports = app;