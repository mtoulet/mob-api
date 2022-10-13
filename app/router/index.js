const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const tournamentRouter = require('./tournamentRouter');
const encounterRouter = require('./encounterRouter');
const leaderboardRouter = require('./leaderboardRouter');

router.use(userRouter);
router.use(tournamentRouter);
router.use(encounterRouter);
router.use(leaderboardRouter);

module.exports = router;