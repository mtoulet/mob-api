const client = require("../config/db");
const debug = require('debug')('MODEL ENCOUNTER');

class Encounter {

    constructor(obj) {
        this.id = obj.id;
        this.winner = obj.winner;
        this.loser = obj.loser;
        this.date = obj.date;
        this.winner_score = obj.winner_score;
        this.loser_score = obj.loser_score;
        this.tournament_id = obj.tournament_id;
    }


     /**
     * Add a new encounter in the database
     * @param {Object} encounterTemp
     * @returns {Json} encounter
     */
    static async addEncounter(encounterTemp) {
        const result = await client.query(`SELECT * FROM create_encounter ($1)`, [encounterTemp]);
        const encounter = new Encounter(result.rows[0]);
        return encounter;
    }

    /**
     * retrieves an encounter via his id
     * @param {integer} id
     * @returns {Encounter} an encounter
     */
    static async getEncounterById(id) {
        const result = await client.query('SELECT * FROM public.encounter WHERE id = $1;', [id]);
        if (result?.rows.length > 0) {
            return new Encounter(result.rows[0]);
        } else {
            // error while recovering
            return;
        }
    }

      /**
     * update an encounter in the database
     * @param {Object} encounterTemp
     * @returns {Json} encounter
     */
    static async updateEncounter(infoEncounter) {
        const result = await client.query(`SELECT * FROM update_encounter ($1)`, [infoEncounter]);
        return result.rows[0];
    }

    /**
     * retrieves all users from an encounter via his id
     * @param {integer} encounterId
     * @returns {Array} users id
     */
    static async getUsers(encounterId){
        const result = await client.query('SELECT "user_id" FROM user_has_encounter WHERE encounter_id=($1);', [encounterId]);
        return result.rows;
    }

    /**
     * add user to an encounter via his id
     * @param {integer} encounterId
     * @returns {Array} users id
     */
    static async addUserToEncounter(userEncounterId){
        const result = await client.query('SELECT * FROM add_user_to_encounter ($1)', [userEncounterId]);
        return result.rows[0];
    }
    
    /**
     * get list of encounter by tournament Id
     * @param {integer} tournamentId
     * @returns {Array} encounters
     */
    static async getEncountersListByTournamentId(id){
        const result = await client.query('SELECT * FROM encounter WHERE encounter.tournament_id=$1', [id]);
        return result.rows;
    }



}

module.exports = Encounter;
