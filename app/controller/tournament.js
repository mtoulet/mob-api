const debug = require('debug')('CONTROLLER');

const { Tournament } = require('../model');

const tournamentController = {

    // add new tournament in DB
    async addTournament(req, res) {
        try{
            const newTournament = await Tournament.addTournament({
                label: req.body.label,
                type: req.body.type,
                date: req.body.date,
                game: req.body.game,
                format: req.body.format,
                max_player_count: req.body.max_player_count,
                description: req.body.description,
                image: req.body.image,
                user_id: req.body.user_id,

            });
            res.json(newTournament);
            
        }catch (err) {
            console.error(err);
        }
    },

    // return a list of tournaments from DB 
    async getAllTournaments(req, res) {
        try {
            const tournaments = await Tournament.findAllTournaments();
            return res.json(tournaments);
        } catch (err) {
            console.error(err);
        }
    },

    // return one tournament from DB 
    async getTournament(req, res) {
        try {
            const foundTournament = await Tournament.getTournamentById(req.params.id);
            if (!foundTournament) {
                return res.status(404).json({
                    error: "Tournoi inexistant"
                });
            }
            return res.json(foundTournament);
        } catch (err) {
            console.error(err);
        }
    },

    async patchTournament(req, res) {
        const id = req.params.id;
        try{
            const editedTournament = await Tournament.updateTournament({
                label: req.body.label,
                type: req.body.type,
                date: req.body.date,
                game: req.body.game,
                format: req.body.format,
                max_player_count: req.body.max_player_count,
                description: req.body.description,
                image: req.body.image,
                id: id
            });
            return res.json(editedTournament);
        } catch(err){
                console.error(err);
        }
    },

    // return info of tournament by id
    async deleteTournament(req, res) {
        try{
            const foundTournament = await Tournament.getTournamentById(req.params.id);
            if (!foundTournament) {
                return res.status(404).json({
                    error: "Tournoi inexistant"
                });
            }
            await Tournament.deleteTournament(foundTournament.id);
            return res.json({ message: 'Le tournoi a bien été supprimé' });

        } catch(err) {
            console.error(err);
        }
    },

    async getUserTournamentList(req, res) {
        try{
            const userTournamentList = await Tournament.getUsers(req.params.id);
            return res.json(userTournamentList);

        } catch (err) {
            console.error(err);
            }

    },

    async postUserToTournament(req, res) {
        const tournamentId = req.params.id; // extract tournament ID from params
        const userId = req.body.user_id; // extract user ID from body

        try{
            // Get all users ID from one tournament via his ID
            const userTournamentList = await Tournament.getUsers(tournamentId); 
            // Check if the userID is in the list of all users ID in the tournament ID
            const existingUserInTournament = userTournamentList.find(({user_id}) => user_id === userId); 

            // If the user is already registered on the tournament we send an error
            if(existingUserInTournament) {
                return res.status(400).json({error: `L'utilisateur d'id ${userId} est déjà inscrit au tournoi d'id ${tournamentId}`});
            }
            // datas to be sent to the database
            const data = {
                tournament_id: tournamentId,
                user_id: userId
            }
            // the user is being added to the tournament
            const addedUser = await Tournament.addUserToTournament(data);
            return res.json(addedUser);

        } catch (err) {
            console.error(err);
        }
    },

    async deleteUserFromTournament(req, res){
        const tournamentId = parseInt(req.params.tournament_id); // extract tournament ID from params
        const userId = parseInt(req.params.user_id); // extract user ID from body
        try {
            // Get all users ID from one tournament via his ID
            const userTournamentList = await Tournament.getUsers(tournamentId); 
            debug(userTournamentList);
            // Check if the userID is in the list of all users ID in the tournament ID
            const existingUserInTournament = userTournamentList.find(({user_id}) => user_id === userId);
            debug(existingUserInTournament);

            // If the user is not already registered on the tournament we send an error
            if(!existingUserInTournament) {
                return res.status(400).json({error: `L'utilisateur d'id ${userId} n'est pas inscrit au tournoi d'id ${tournamentId}`});
            }
            
            // the user is being added to the tournament
            await Tournament.deleteUser(tournamentId, userId);
        
            return res.json({message: 'L\'utilisateur a bien été supprimé du tournoi'});
        } catch (err) {
            console.error(err);
        }
    },
}

module.exports = tournamentController;
