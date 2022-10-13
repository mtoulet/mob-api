const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const tournamentRouter = require('./tournamentRouter');
const encounterRouter = require('./encounterRouter');

router.use(userRouter);
router.use(tournamentRouter);
router.use(encounterRouter);

module.exports = router;