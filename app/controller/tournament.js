const debug = require('debug')('CONTROLLER');

const { Tournament } = require('../model');

const tournamentController = {

     // return a list of tournaments from DB 
     async getAllTournaments(req, res) {
        try {
            const tournaments = await Tournament.findAllTournaments();
            return res.json(tournaments);
        } catch (err) {
            console.error(err);
        }
    },

    // add new tournament in DB
    async addTournament(req, res){
        try{
            const newTournament = await Tournament.addTournament({
                label: req.body.label,
                type: req.body.type,
                date: req.body.date,
                format: req.body.format,
                moderator: req.body.moderator,

            });
            res.json(newTournament)
            
        }catch (err) {
            console.error(err);
        }
    },
}

module.exports = tournamentController;
