const bcrypt = require('bcrypt');


const {
    User
} = require('../model');

const encrypt = require('../utils/encrypt');


const userController = {

    async signupAction(req, res) {
        // confirm password strength
        if (req.body.password.length < 8) {
            res.json({
                error: 'Votre Mot de passe doit contenir 8 caracteres minimum',
            });
        }



        const hashedPassword = await encrypt(req.body.password);

        const newUser = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            nickname: req.body.nickname,
            mail: req.body.mail,
            password: hashedPassword
        })

        req.session.user = { login: newUser.login };
    },
    async loginAction(req, res) {
        //    we are looking for the user with his email address
        const foundUser = await User.getUserByMail(
            req.body.mail
        );

        if (!foundUser) {
            return res.status(401).json( {
                error:'Mauvais couple email/mot de passe'
            });
        }

        // test password
        const checkPassword = await bcrypt.compare(req.body.password, foundUser.password);

        if (!checkPassword) {
            return res.status(401).json( {
                error: "Mauvais couple email/mot de passe"
            });
        }

        // add user in session
        req.session.user =  {
            id: foundUser.id,
        }
        

    },
    // disconnect user session 
    async disconnect(req, res) {
        req.session.destroy();
    
      }
};

module.exports = userController;