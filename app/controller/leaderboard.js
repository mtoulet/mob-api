const debug = require('debug')('CONTROLLER');

const { User } = require('../model');

const leaderboardController = {

 /**
     * @summary Get list of 15 players with max trophies 
     * @param {*} req 
     * @param {*} res 
     * @returns {array<User>} List of user with max trophies
     */
  async getMoreTrophiesList(req, res) {
    try {
        const maxTrophiesUserList = await User.maxTrophiesLeaderboard();
        res.json(maxTrophiesUserList);  
    } catch (err) {
        console.error(err);
    }
    },


 /**
     * @summary Get list of 15 players with max honor_point
     * @param {*} req 
     * @param {*} res 
     * @returns {array<User>} List of user with max honor_point
     */
  async getMoreHonorList(req, res) {
    try {
        const maxHonorUserList = await User.maxHonorLeaderboard();
        res.json(maxHonorUserList);  
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