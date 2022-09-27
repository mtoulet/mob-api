const express = require('express');
const userController = require('../controller');
const router = express.Router();

router.get('/api/profiles', userController.getAllProfiles);

module.exports = router;