const mongoose = require('mongoose');

const rankSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuthUser',
        required: true
    },
    username: {
        type: String, // Store username as a string, not an array
        required: true
    },
    profileImage: {
        type: String, // Store the URL of the profile image as a string
    },
    Score: {
        type: Number, // Store score as a number
        required: true
    },
});

module.exports = mongoose.model('Rank', rankSchema);
