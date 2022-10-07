const client = require("../config/db");
const debug = require('debug')('MODEL TOURNAMENT');

class Tournament {

    constructor(obj) {
        this.id = obj.id;
        this.label = obj.label;
        this.type = obj.type;
        this.date = obj.date;
        this.game = obj.game;
        this.format = obj.format;
        this.max_player_count = obj.max_player_count,
        this.description = obj.description;
        this.image = obj.image;
        this.user_id = obj.user_id;
    }

     /**
     * Add a new tournament in the database
     * @param {Object} tournamentTemp
     * @returns {Json} tournament
     */
      static async addTournament(tournamentTemp) {
        const result = await client.query(`SELECT * FROM create_tournament ($1)`, [tournamentTemp]);
        const tournament = new Tournament(result.rows[0]);
        return tournament;
    }

    /**
     * Recovery list of all tournament
     * @returns {Json} tournament
     */
     static async findAllTournaments() {
        const result = await client.query('SELECT * FROM public."tournament";');
        return result.rows;
    }

    /**
     * Recovery of tournament information via his id
     * @param {Integer} id 
     * @returns {Json} tournament
     */
     static async getTournamentById(tournamentId) {
        const result = await client.query('SELECT * FROM public."tournament" WHERE tournament.id=$1', [tournamentId]);
        if (result?.rows.length > 0) {
            return new Tournament(result.rows[0]);
        } else {
            // error while recovering
            return;
        }
    }

    /**
     * Recovery of tournament information via his id
     * @param {Json} tournament
     * @returns {Json} tournament
     */
     static async updateTournament(infoTournament) {
        const result = await client.query('SELECT * FROM update_tournament ($1);', [infoTournament]);
        return result.rows;
    }

    /**
     * Delete tournament with his id
     * @param {Integer} id 
     */
     static async deleteTournament(tournamentId) {
        const result = await client.query('DELETE FROM public."tournament" WHERE id=$1;', [tournamentId]);
        return result;
    }

    static async getUsers(tournamentId){
        const result = await client.query('SELECT "user_id" FROM tournament_has_user WHERE tournament_id=($1);', [tournamentId]);
        return result.rows;
    }

    static async addUserToTournament(userTournamentId) {
        const result = await client.query('SELECT * FROM add_user_to_tournament($1)', [userTournamentId]);
        return result.rows[0];
    }

    static async deleteUser(tournamentId, userId){
        const result = await client.query('DELETE FROM tournament_has_user WHERE tournament_id=$1 AND user_id=$2',[tournamentId, userId]);

        return result.rows;
    }

    static async getUserTournament(userId){
        //selectionner tous les tournois que l'utilisateur a créé et tous les tournois auquel in participe.
        const result = await client.query('SELECT * FROM tournament JOIN tournament_has_user ON tournament.id = tournament_has_user.tournament_id WHERE tournament.user_id=$1;',[userId]);
       
        debug(result.rows)
        return result.rows
    }
}

module.exports = Tournament;