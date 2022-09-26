require('dotenv').config();

const server = require('./app');
const debug = require('debug')('SERVER');

const PORT = process.env.PORT ?? 3000;

// je lance l'écoute
server.listen(PORT, () => {
    debug(`Listening on ${PORT}`);
});
