// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getProfile } = require('../Controller/ProfileController'); // Import the controller
const verifyToken = require('../Middleware/AuthenticationMiddleware'); // Import the middleware for authentication

// Define the route to get the user's profile
router.get('/profile', verifyToken, getProfile);

module.exports = router;
