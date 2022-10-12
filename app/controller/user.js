const bcrypt = require('bcrypt');
const debug = require('debug')('CONTROLLER');

const {
    User
} = require('../model');

const encrypt = require('../service/bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../service/jwt');

const userController = {

    /**
    * @summary login the user with json accessToken and check mail and password
    * @param {*} req 
    * @param {*} res 
    * @return {User} the user which logged in and his accessToken + refreshToken
    */
     async login(req, res) {
        // we are looking for the user with his email address
        const foundUser = await User.getUserByMail(
            req.body.mail
        );

        // if a user is not found, we return an error
        if (!foundUser) {
            return res.status(404).json({
                error: 'Utilisateur inexistant'
            });
        }

        // test password (https://www.npmjs.com/package/bcrypt)
        // we compare the password entered in the req.body to check if it matches the password in the database
        const checkPassword = await bcrypt.compare(req.body.password, foundUser.password);

        if (!checkPassword) {
            return res.status(401).json({
                error: "Mauvais couple email/mot de passe"
            });
        }
        
        // delete the password of the foundUser before returning the foundUser
        delete foundUser.password;

        // Response of the Json Web Token to the client
        const accessToken = generateAccessToken(foundUser);
        const refreshToken = generateRefreshToken(foundUser);
        res.json({success: true, accessToken, refreshToken, foundUser});
    },

    /**
     * @summary add a new user in the database
     * @param {*} req 
     * @param {*} res 
     * @return {User} the user which signed up
     */
     async register(req, res) {
        
        // hash the password (https://www.npmjs.com/package/bcrypt)
        const hashedPassword = await encrypt(req.body.password);
        // register new user
        const newUser = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            nickname: req.body.nickname,
            mail: req.body.mail,
            password: hashedPassword
        });
        // delete the password of the newUser before returning the newUser
        delete newUser.password;
        // return new user 
        res.json(newUser);
    },

    /**
     * @summary return a list of users from database
     * @param {*} req 
     * @param {*} res 
     * @return {Array<User>} an array of users
     */
    async getAllProfiles(req, res) {
        try {
            const profiles = await User.findAllProfiles();
            // delete the password of every profiles before returning them
            for (const profile of profiles) {
                delete profile.password;
            }
            return res.json(profiles);
        } catch (err) {
            console.error(err);
        }
    },

    /**
     * @summary return a user found by his id
     * @param {*} req 
     * @param {*} res 
     * @return {User} a user profile
     */
    async getProfile(req, res) {
        // we are using the parameter ID of the request
        const id = req.params.id;
        try {
            // id is the constant variable which defines the parameter id of the request, used as an argument for the method in User model
            const foundUser = await User.getUserById(id);
            if (!foundUser) {
                return res.status(404).json({
                    error: "Utilisateur inexistant"
                });
            }
            // delete the password of the foundUser before returning the foundUser
            delete foundUser.password;
            return res.json(foundUser);
        } catch (err) {
            console.error(err);
        }
    },

    /**
     * @summary edit a user profile
     * @param {*} req 
     * @param {*} res
     * @return {User} a user profile
     */
    async patchProfile(req, res) {
        const id = req.params.id;
        try {
            const editedProfile = await User.patchUser({
                firstname : req.body.firstname,
                lastname: req.body.lastname,
                nickname: req.body.nickname,
                avatar: req.body.avatar,
                id: id
            });
            return res.json(editedProfile);
        } catch (err) {
            console.error(err);
        }
    },

    /**
     * @summary edit the password of a user
     * @param {*} req 
     * @param {*} res 
     * @returns {object} a message
     */
    async patchPwd(req, res) {
        // get the id in params
        const id = req.params.id;
        try {
            const foundUser = await User.getUserById(id); // Find the user via his id
            const checkedPassword = await bcrypt.compare(req.body.password, foundUser.password); // Check the current password with the one stored in the database
            if (checkedPassword) { // If above is true and the newPassword is different than the previous one
                if (req.body.password !== req.body.newPassword) { // If the old password is different than the new one
                    const hashedPassword = await encrypt(req.body.newPassword); // Hash the new password
                    await User.patchPwd({ // Store it in the database
                        password: hashedPassword,
                        id: id
                    });
                    return res.json({message: "Votre mot de passe a bien été modifié"});
                } else {
                    return res.status(400).json({ error: "Votre nouveau mot de passe est identique au précédent"});
                }
            } else {
                return res.status(400).json({ error: "Mot de passe invalide" });
            }
        } catch(err) {
            console.error(err);
        }
    },

    /**
     * @summary delete a user account
     * @param {*} req 
     * @param {*} res 
     * @return {object} a message
     */
    async deleteProfile(req, res) {
        const id = req.params.id;
        try {
            // find user by id
            const userToDelete = await User.getUserById(id);

            if (!userToDelete) {
                return res.status(404).json({
                    error: "Utilisateur inexistant"
                });
            }
            // test password (https://www.npmjs.com/package/bcrypt)
            const checkPassword = await bcrypt.compare(req.body.password, userToDelete.password);

            // if it is not correct, return an error
            if (!checkPassword) {
                return res.status(401).json({
                    error: "Mauvais mot de passe"
                });
            }

            // Delete the profile via his id (SQL function)
            await User.deleteProfileById(userToDelete.id);

            return res.json({message: "Votre compte a bien été supprimé"});

        } catch (err) {
            console.error(err);
        }
    },

    async addHonorPointToUser(req, res) {
        const id = req.params.id;
        try {
            const foundUser = await User.getUserById(id);
            if (!foundUser) {
                return res.status(404).json({
                    error: "Utilisateur inexistant"
                });
            }
            await User.addOneHonorPoint(foundUser.id);
            return res.json({message: "Vous avez honoré cet utilisateur"});
        } catch (err) {
            console.error(err);
        }
    },

    async removeHonorPointToUser (req, res) {
        const id = req.params.id;
        try {
            const foundUser = await User.getUserById(id);
            if (!foundUser) {
                return res.status(404).json({
                    error: "Utilisateur inexistant"
                });
            }
            await User.removeOneHonorPoint(foundUser.id);
            return res.json({message: "Vous avez deshonoré cet utilisateur"});
        } catch(err) {
            console.error(err);
        }
    },

    async addTrophiesToTuser (req, res) {
        const id = req.params.id;
        try {
            const foundUser = await User.getUserById(id);
            if (!foundUser) {
                return res.status(404).json({
                    error: "Utilisateur inexistant"
                });
            }
            await User.addOneTrophy(foundUser.id);
            return res.json({message: `L'utilisateur d'id ${foundUser.id} a gagné un trophée`});

        } catch (err) {
            console.error(err);
        }
    }
};

module.exports = userController;