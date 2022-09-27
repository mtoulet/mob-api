const express = require('express');
const { user } = require('pg/lib/defaults');
const userController = require('../controller/user');
const router = express.Router();
const { authenticateToken } = require('../service/jwt');

// Route pour récupérer la liste de tous les profils utilisateurs
router.get('/api/profiles', userController.getAllProfiles);

router.post('/api/login', userController.login);

router.post('/api/register', userController.register);

router.post('/api/disconnect', userController.disconnect);

// Testing route for authentication
router.get('/api/me', authenticateToken, (req, res) => {
    res.send(req.user);
});

module.exports = router;