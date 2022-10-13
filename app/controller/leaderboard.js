const debug = require('debug')('CONTROLLER');

const { User } = require('../model');

const leaderboardController = {

    /**
     * @summary Get list of 15 players with most trophies 
     * @param {*} req 
     * @param {*} res 
     * @returns {array<User>} List of user with most trophies
     */
    async getMostTrophiesList(req, res) {
        try {
            const mostTrophiesUserList = await User.mostTrophiesLeaderboard();
            res.json(mostTrophiesUserList);  
        } catch (err) {
            console.error(err);
        }
    },


    /**
     * @summary Get list of 15 players with most honor_point
     * @param {*} req 
     * @param {*} res 
     * @returns {array<User>} List of user with most honor_point
     */
    async getMostHonorList(req, res) {
        try {
            const mostHonorUserList = await User.mostHonorLeaderboard();
            res.json(mostHonorUserList);  
        } catch (err) {
            console.error(err);
        }
    },

    /**
     * @summary Get list of 15 players with less honor_point
     * @param {*} req 
     * @param {*} res 
     * @returns {array<User>} List of user with less honor_point
     */
    async getLessHonorList(req, res) {
        try {
            const lessHonorUserList = await User.lessHonorLeaderboard();
            res.json(lessHonorUserList);  
        } catch (err) {
            console.error(err);
        }
    },

     /**
     * @summary Get list of 15 last register players 
     * @param {*} req 
     * @param {*} res 
     * @returns {array<User>} List of 15 last register players 
     */
    async getlastregisterUserList(req, res) {
        try {
            const lastregisterUserList = await User.lastsubLeaderboard();
            res.json(lastregisterUserList);  
        } catch (err) {
            console.error(err);
        }   
    },  
}

module.exports = leaderboardController;