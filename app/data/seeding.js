const {
    faker
} = require('@faker-js/faker');
const {
    User
} = require('../model');
const client = require('../config/db');
const encrypt = require('../service/bcrypt');


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