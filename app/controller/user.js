const bcrypt = require('bcrypt');
const debug = require('debug')('CONTROLLER');

const {
    User
} = require('../model');

const encrypt = require('../service/bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../service/jwt');

const userController = {

    async register(req, res) {
        // confirm password strength
        if (req.body.password.length < 8) {
            res.json({
                error: 'Votre Mot de passe doit contenir 8 caracteres minimum',
            });
        }
        // hash the password (https://www.npmjs.com/package/bcrypt)
        const hashedPassword = await encrypt(req.body.password);
        // register new user
        const newUser = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            nickname: req.body.nickname,
            mail: req.body.mail,
            password: hashedPassword
        })

        // return new user 
        res.json(newUser);
    },
    async login(req, res) {
        // we are looking for the user with his email address
        const foundUser = await User.getUserByMail(
            req.body.mail
        );

        if (!foundUser) {
            return res.status(401).json({
                error: 'Mauvais couple email/mot de passe'
            });
        }

        // test password (https://www.npmjs.com/package/bcrypt)
        const checkPassword = await bcrypt.compare(req.body.password, foundUser.password);

        if (!checkPassword) {
            return res.status(401).json({
                error: "Mauvais couple email/mot de passe"
            });
        }

        // Response of the Json Web Token to the client
        const accessToken = generateAccessToken(foundUser);
        const refreshToken = generateRefreshToken(foundUser);
        res.json({success: true, accessToken, refreshToken});


    },
    
    // return a list of users profils from DB 
    async getAllProfiles(req, res) {
        try {
            const profiles = await User.findAllProfiles();
            return res.json(profiles);
        } catch (err) {
            console.error(err);
        }
    }
};

module.exports = userController;