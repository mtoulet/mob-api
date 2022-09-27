const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    generateAccessToken(user) {
        return jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET);
    },

    authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        // JWT goes through the authorization header with value "Bearer ozirozirozirozirzoir", then we split with a space to get the token. It is a conventionnal naming
        const token = authHeader && authHeader.split(' ')[1];
        
        if(!token) {
            return res.sendStatus(401); // If the token isn't found, it returns an error
        }

        // If it's found we verify it by passing the token, the secret key and a function called to send either an error or the collected data
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(401);
            }
            // In every authenticate routes we will get the infos of the user in the request
            req.user = user;
            // Passing to the API Routes that needs the authentication
            next();
        });
    }
}
