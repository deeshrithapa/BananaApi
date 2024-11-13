// src/Routes/rankRoutes.js
const express = require('express');
const router = express.Router();
const { addRank, getLeaderboard } = require('../Controller/RankController'); // Import the controller

// Route to add or update a user's rank
router.post('/addRank', addRank);

// Route to get the leaderboard (sorted by score)
router.get('/leaderboard', getLeaderboard);

module.exports = router;
