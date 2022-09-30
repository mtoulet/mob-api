const debug = require('debug')('CONTROLLER');

const { Tournament } = require('../model');

const tournamentController = {

     // return a list of tournaments from DB 
     async getAllTournaments(req, res) {
        try {
            const tournaments = await User.findAllTournaments();
            return res.json(tournaments);
        } catch (err) {
            console.error(err);
        }
    },
}

module.exports = tournamentController;
