const express = require('express');
const Portfolio = require('../models/Portfolio');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all portfolios
router.get('/', async (req, res) => {
  try {
    const portfolios = await Portfolio.find().populate('createdBy', 'name');
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch portfolios' });
  }
});

// Get portfolio by ID
router.get('/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id).populate('createdBy', 'name');
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch portfolio' });
  }
});

// Create a new portfolio (protected)
router.post('/', protect, async (req, res) => {
  const { title, description, images } = req.body;

  try {
    const newPortfolio = new Portfolio({
      title,
      description,
      images,
      createdBy: req.user._id, // Must be logged in
    });

    const savedPortfolio = await newPortfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create portfolio' });
  }
});

// Update a portfolio (protected)
router.put('/:id', protect, async (req, res) => {
  const { title, description, images } = req.body;

  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Ensure user owns the portfolio or is admin
    if (portfolio.createdBy.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    portfolio.title = title || portfolio.title;
    portfolio.description = description || portfolio.description;
    portfolio.images = images || portfolio.images;

    const updatedPortfolio = await portfolio.save();
    res.json(updatedPortfolio);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update portfolio' });
  }
});

// Delete a portfolio (protected, admin-only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    await portfolio.remove();
    res.json({ message: 'Portfolio deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete portfolio' });
  }
});

module.exports = router;
