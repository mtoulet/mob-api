const express = require('express');
const userController = require('../controller/user');
const router = express.Router();

// Route pour récupérer la liste de tous les profils utilisateurs
router.get('/api/profiles', userController.getAllProfiles);

module.exports = router;