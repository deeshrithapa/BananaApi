const User = require('../Models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const registerUser = async (req, res) => {
  const { username,  password, profileImage,Score} = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({ username,  password, profileImage,Score });
    await user.save();

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
        score: user.Score
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          msg: 'User registered successfully',
          token,
          user,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        score: user.Score,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          msg: 'User logged in successfully',
          token,
          score: user.Score,
          id: user.id,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// In authController.js
const getUserProfile = async (req, res) => {
  try {
    // Assuming you have middleware that sets req.user with the logged-in user's information
    const user = await User.findById(req.user.id).select('-password'); // Exclude password field
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// In UserController.js
const updateUserScore = async (req, res) => {
  const { userId, newScore } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update the user's score
    user.Score += newScore;
    await user.save();

    res.status(200).json({ msg: 'Score updated successfully', score: user.Score });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserScore, // Export the new function
};

