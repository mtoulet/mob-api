const client = require("../config/db")

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
     * Verify the password
     * @param {String} passwordTemp 
     * @returns {Boolean}
     */
    checkPassword(passwordTemp) {
        return this.password === passwordTemp;
    }

    static async findAllProfiles() {
        const result = await client.query('SELECT * FROM public."user";');
        return result.rows;
    }

     /**
     * suppressed profile by id
     * @param {Integer} userId
     * @returns {Boolean}
     */
    static async deleteProfileById(userId) {
        const result = await client.query('DELETE FROM public."user" WHERE id=$1;', [userId]);
        return result;
    }

     /**
     * update profil user
     * @param {Json} patchInfo
     * @returns {Json}
     */
    static async patchUser(patchInfo) {
        const result = await client.query('SELECT * FROM update_user ($1))', [patchInfo]);
        return result;
    }

};

module.exports = User;