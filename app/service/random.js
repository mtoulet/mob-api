const randomService = {
    getRandomElementInList(array) {
        const index = Math.round(Math.random() * (array.length - 1));
        return array[index];
    }
};

module.exports = randomService;