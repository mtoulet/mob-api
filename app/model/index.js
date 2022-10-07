const client = require("../config/db");
const User = require("./user");
const Tournament = require("./tournament");
const Encounter = require("./encounter");

module.exports = {
    User,  Tournament, Encounter
};