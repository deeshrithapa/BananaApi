// controllers/profileController.js
const User = require('../Models/UserModel'); // Adjust the path if necessary

// Controller to get the user's profile
exports.getProfile = async (req, res) => {
  try {
    // Fetch the user by their ID from the JWT token, excluding the password
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};