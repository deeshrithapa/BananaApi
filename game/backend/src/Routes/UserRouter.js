const express = require('express');
const { registerUser, loginUser, getUserProfile,updateUserScore } = require('../Controller/UserController');
const authMiddleware = require('../Middleware/AuthenticationMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getUserProfile);
 // In UserRoutes.js
router.post('/update-score', authMiddleware, updateUserScore);
// Protected route

module.exports = router;
