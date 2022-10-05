const {
    faker
} = require('@faker-js/faker');
const {
    User, Tournament
} = require('../model');
const client = require('../config/db');
const encrypt = require('../service/bcrypt');
const randomService = require('../service/random');


(async () => {
    try {
        // Declare a variable and set it equal to an array. 
        let users = [];
        // This for loop decides how many datapoints you will create.
        // If you want to change the amount, just change the number in the for loop!
        for (let i = 0; i < 10; i++) {
            // hash the password (https://www.npmjs.com/package/bcrypt)
            let hashedPassword = await encrypt(faker.internet.password());

            // The keys in this user object are set equal to the fake information
            let newUser = {
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                nickname: faker.internet.userName(),
                mail: faker.internet.email(),
                password: hashedPassword,
            }
            // For each fake user you create, you're going to push them into the user array you declare above
            users.push(newUser);
        }

        // For each user in the array, you are going to create a new user instance in the database
        users.forEach(async (user) => {
            await User.create(user);
        });

    } catch (err) {
        console.log(err)
    }
})();

const tournamentType = ["public", "privé"];
const tournamentFormat = ["Elimination simple", "Double élimination"];

setTimeout(async () => {
    try {
        // Declare a variable and set it equal to an array. 
        let tournaments = [];
        // This for loop decides how many datapoints you will create.
        // If you want to change the amount, just change the number in the for loop!
        for (let i = 0; i < 5; i++) {
            

            // The keys in this  object are set equal to the fake information
            let newTournament = {
                label: faker.music.songName(),
                type: randomService.getRandomElementInList(tournamentType),
                date: faker.date.future(),
                game: faker.random.words(2),
                format: randomService.getRandomElementInList(tournamentFormat),
                max_player_count: parseInt(faker.random.numeric(2)),
                description: faker.lorem.paragraph(),
                image: faker.image.sports(),
                user_id: parseInt(faker.random.numeric()),
            }
            // For each fake tournament you create, you're going to push them into the tournament array you declare above
            tournaments.push(newTournament);
        }

        // For each tournament in the array, you are going to create a new tournament instance in the database
        tournaments.forEach(async (tournament) => {
            await Tournament.addTournament(tournament);
        });

    } catch (err) {
        console.log(err)
    }
}, "2000");