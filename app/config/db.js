require('dotenv').config();
const { Client } = require("pg");

// Connection à la bdd distante (heroku)
const client = new Client({
    connectionString:process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

//  Connection à la bdd locale (PgAdmin) 
//  const client = new Client(process.env.PG_URL);

client.connect(err => {
    if (err) {
        console.error('connection error', err.stack);
    } else {
        console.log('connected');
    }
});

module.exports = client;