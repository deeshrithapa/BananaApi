// src/Controllers/rankController.js
const Rank = require('../Models/rankModel'); // Import the Rank model
const User = require('../Models/UserModel'); // Import the User model

// Function to add or update user rank in the leaderboard
exports.addRank = async (req, res) => {
  const { userId, score } = req.body;

  try {
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user already has a rank entry
    let rank = await Rank.findOne({ userId: userId });

    if (rank) {
      // If the user already has a rank, update the score
      rank.Score = score;
      await rank.save();
      return res.status(200).json(rank); // Respond with updated rank
    } else {
      // If no rank exists, create a new one
      const newRank = new Rank({
        userId: userId,
        username: user.username,   // Save the username from the User model
        profileImage: user.profileImage, // Save the profileImage from the User model
        Score: score
      });

      await newRank.save();
      return res.status(201).json(newRank); // Respond with the new rank
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Function to fetch the leaderboard sorted by score in descending order
exports.getLeaderboard = async (req, res) => {
  try {
    // Fetch all rank entries and populate the user data (username and profileImage)
    const leaderboard = await Rank.find()
      .sort({ Score: -1 }) // Sort by score in descending order
      .populate('userId', 'username profileImage') // Populate user data (you can add more fields if needed)
      .exec();

    // Respond with the leaderboard
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
