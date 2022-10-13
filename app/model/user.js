const client = require("../config/db");
const debug = require('debug')('USER MODEL');

class User {

    constructor(obj) {
        this.id = obj.id;
        this.firstname = obj.firstname;
        this.lastname = obj.lastname;
        this.nickname = obj.nickname;
        this.mail = obj.mail;
        this.password = obj.password;
        this.trophies = obj.trophies;
        this.honor_point = obj.honor_point;
        this.team = obj.team;
        this.role = obj.role;
        this.avatar = obj.avatar;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
    }

    /**
     * Add a new user in the database
     * @param {Object} userTemp 
     * @returns {User}
     */
    static async create(userTemp) {
        const result = await client.query(`SELECT * FROM create_user ($1)`, [userTemp]);
        const user = new User(result.rows[0]);
        return user;
    }

    static async findAllProfiles() {
        const result = await client.query('SELECT * FROM public."user";');
        return result.rows;
    }

    /**
     * Recovery of user information via his mail
     * @param {String} mail 
     * @returns 
     */
    static async getUserByMail(mail) {
        const result = await client.query('SELECT * FROM public."user" WHERE mail=$1', [mail]);
        if (result?.rows.length > 0) {
            return new User(result.rows[0]);
        } else {
            // error while recovering
            return;
        }
    }

      /**
     * Recovery of user information via his mail
     * @param {Integer} id
     * @returns user
     */
    static async getUserById(id) {
        const result = await client.query('SELECT * FROM public."user" WHERE id=$1', [id]);
        if (result?.rows.length > 0) {
            return new User(result.rows[0]);
        } else {
            // error while recovering
            return;
        }
    }

     /**
     * update profil user
     * @param {Json} patchInfo
     * @returns {Json}
     */
    static async patchUser(patchInfo) {
        const result = await client.query('SELECT * FROM update_user ($1);', [patchInfo]);
        return result.rows[0];
    }

    static async patchPwd(pwd) {
        const result = await client.query('SELECT * FROM update_pwd ($1);', [pwd]);
        return result.rows[0];
    }

    /**
     * delete profile by id
     * @param {Integer} userId
     * @returns {Boolean}
     */
    static async deleteProfileById(userId) {
        const result = await client.query('DELETE FROM public."user" WHERE id = $1;', [userId]);
        return result;
    }

    static async addOneHonorPoint(userId) {
        return await client.query('UPDATE public."user" SET honor_point = honor_point + 1 WHERE id = $1;', [userId]);
    }


    static async removeOneHonorPoint(userId) {
        return await client.query('UPDATE public."user" SET honor_point = honor_point - 1 WHERE id = $1;', [userId]);
    }

    static async addOneTrophy(userId) {
        return await client.query('UPDATE public."user" SET trophies = trophies +1 WHERE id = $1;', [userId]);
    }

    static async getTournamentListByUserId(id) {
        const result= await client.query('SELECT DISTINCT user_has_encounter.user_id, tournament_has_user.tournament_id, tournament.user_id AS moderator_id FROM user_has_encounter JOIN tournament_has_user ON tournament_has_user.user_id = user_has_encounter.user_id JOIN tournament ON tournament_has_user.tournament_id = tournament.id WHERE tournament_has_user.user_id = $1', [id]);
        return result.rows;
    }

    static async mostTrophiesLeaderboard(){
        const result = await client.query('SELECT * FROM public.user ORDER BY public.user.trophies DESC LIMIT 15;')
        return result.rows;
    }

    static async mostHonorLeaderboard(){
        const result = await client.query('SELECT * FROM public.user ORDER BY public.user.honor_point DESC LIMIT 15;')
        return result.rows;
    }

    static async lessHonorLeaderboard(){
        const result = await client.query('SELECT * FROM public.user ORDER BY public.user.honor_point ASC LIMIT 15;')
        return result.rows;
    }

    static async lastsubLeaderboard(){
        const result = await client.query('SELECT * FROM public.user ORDER BY public.user.id DESC Limit 15;')
        return result.rows;
    }


};

module.exports = User;