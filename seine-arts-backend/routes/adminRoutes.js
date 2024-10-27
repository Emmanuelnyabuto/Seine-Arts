const express = require('express');
const User = require('../models/User');
const Portfolio = require('../models/Portfolio');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all users for admin
router.get('/users', protect, admin, async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Update user role
router.put('/users/:id/role', protect, admin, async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (user) {
    user.role = req.body.role || user.role;
    await user.save();
    res.json({ message: 'User role updated successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Upload portfolio item
router.post('/portfolio', protect, admin, async (req, res) => {
  const { title, description, category } = req.body;

  const portfolioItem = new Portfolio({
    title,
    description,
    category,
  });

  await portfolioItem.save();
  res.status(201).json({ message: 'Portfolio item uploaded successfully' });
});

// Get all services
router.get('/services', protect, admin, async (req, res) => {
  const services = await Service.find({});
  res.json(services);
});

module.exports = router;
