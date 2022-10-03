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
                game: req.body.game,
                format: req.body.format,
                moderator: req.body.moderator,
                user_id: req.body.user_id,

            });
            res.json(newTournament)
            
        }catch (err) {
            console.error(err);
        }
    },


    // return info of tourrnament by id
  async deleteTournament(req, res){
      try{
        const tournament = await Tournament.deleteTournament(req.params.id);
        return res.json({message: 'le tournois à bien été supprimé'})

      }catch(err) {
        console.error(err);
    }
  },

    // return a list of tournaments from DB 
    async getTournament(req, res) {
        try {
            const tournament = await Tournament.getTournamentByID(req.params.id);
            return res.json(tournament);
        } catch (err) {
            console.error(err);
        }
    },

    async patchTournament(req, res) {
       
        try{
            const editedTournament = await Tournament.updateTournament(req.body)
            return res.json(editedTournament)
        }catch(err){
                console.error(err);
        }
    },

    async postUserToTournament(req, res){
        const data = {
            tournament_id: req.params.tournament,
            user_id: req.params.user
        }
        try{
        const addUser = await Tournament.addUserToTournament(data)
        return res.json(addUser)
        } catch (err) {
        console.error(err)
        }
    },
}

module.exports = tournamentController;
