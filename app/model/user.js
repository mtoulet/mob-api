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
     * Ajout d'un nouvel utilisateur en BDD
     * @param {Object} userTemp 
     * @returns {User}
     */
    static async create(userTemp) {
        const result = await client.query(`SELECT * FROM create_user ($1)`, [userTemp]);
        const user = new User(result.rows[0]);
        return user;
    }

    /**
     * Récupération des informations d'un utilisateur via son email
     * @param {String} mail 
     * @returns 
     */
    static async getUserByMail(mail) {
        const result = await client.query('SELECT * FROM public."user" WHERE mail=$1', [mail]);
        if (result?.rows.length > 0) {
            return new User(result.rows[0]);
        } else {
            // erreur lors de la récupération
            return;
        }
    }

    /**
     * Vérification du mot de passe
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

};

module.exports = User;