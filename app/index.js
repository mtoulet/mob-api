
const express = require('express');



const router = require('./router');


const app = express();

const session = require('express-session');

const sessionMiddleware = session({
    secret: "MOB idick",
    resave: true,
    saveUninitialized: true
});
app.use(sessionMiddleware);

app.use(express.static('public'));


// On active le middleware pour parser le payload JSON
app.use(express.json());
// On active le middleware pour parser le payload urlencoded
app.use(express.urlencoded({ extended: true }));



app.use(router);



module.exports = server;