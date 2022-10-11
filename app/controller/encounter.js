const debug = require('debug')('CONTROLLER');

const {
    Encounter,
    Tournament
} = require('../model');

const encounterController = {

    /**
     * @summary Create a encounter and save it in database
     * @param {*} req 
     * @param {*} res 
     * @returns {Encounter} the encounter which has just been created
     */
    async addEncounter(req, res) {
        try {
            const newEncounter = await Encounter.addEncounter({
                date: req.body.date,
                tournament_id: req.body.tournament_id,
            });
            res.json(newEncounter);
        } catch (err) {
            console.error(err);
        }
    },

    /**
     * @summary Get one encounter saved in database
     * @param {*} req 
     * @param {*} res 
     * @returns {Encounter} a encounter with all informations about it
     */ 
    async getEncounter(req, res) {
        const id = req.params.id;
        try {
            const foundEncounter = await Encounter.getEncounterById(id);
            if (!foundEncounter) {
                return res.status(404).json({
                    error: "Rencontre inexistante"
                });
            }
            return res.json(foundEncounter);
        } catch (err) {
            console.error(err);
        }
    },

     /**
     * @summary Allow to edit a encounter informations
     * @param {*} req 
     * @param {*} res 
     * @returns {Encounter} Edited encounter
     */
    async patchEncounter(req, res) {
        const id = req.params.id;
        try {
            const editedEncounter = await Encounter.updateEncounter({
                winner: req.body.winner,
                loser: req.body.loser,
                date: req.body.date,
                winner_score: req.body.winner_score,
                loser_score: req.body.loser_score,
                id: id

            });
            return res.json(editedEncounter);

        } catch (err) {
            console.error(err);
        }
    },

    /**
     * @summary Allow to enroll a user in a encounter
     * @param {*} req 
     * @param {*} res 
     * @returns {UserAddedToEnounter} An object with the enounterId and the userId which has been added to the encounter
     */
    async postUserToEncounter(req, res) {
        const encounterId = req.params.id;
        const userId = req.body.user_id;

        try {
            // Get all users ID from one encounter via his ID
            const userEncounterList = await Encounter.getUsers(encounterId);
            // Check if the userID is in the list of all users ID in the encounter ID
            const existingUserInEncounter = userEncounterList.find(({user_id}) => user_id === userId);
            if (existingUserInEncounter) {
                return res.status(400).json({
                    error: `L'utilisateur d'id ${userId} est déjà inscrit à la rencontre d'id ${encounterId}`});
            }

            const data = {
                encounter_id: encounterId,
                user_id: userId
            }
            const addedUser = await Encounter.addUserToEncounter(data);
            return res.json(addedUser);
        } catch (err) {
            console.error(err);
        }
    },

     /**
     * @summary Allow to get a list of encounter by tournament id
     * @param {*} req 
     * @param {*} res 
     * @returns {Encounter} An object with the list of enounter by tournament id 
     */
    async getEncountersListByTournamentId(req, res){
        const tournamentId = req.params.id;
        try {
            const foundTournament = await Tournament.getTournamentById(tournamentId);
            if (!foundTournament) {
                return res.status(404).json({
                    error: "Tournoi inexistant"
                });
            }
            const encountersList = await Encounter.getEncountersListByTournamentId(tournamentId);
            return res.json(encountersList);
        } catch (err) {
            console.error(err);
        }
    }

}

module.exports = encounterController;