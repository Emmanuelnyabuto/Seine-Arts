const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { adminAuthMiddleware } = require('../middleware/authMiddleware');

// Admin-only route to get all users
router.get('/users', adminAuthMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords from results
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
