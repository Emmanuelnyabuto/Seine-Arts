const express = require('express');
const { createPortfolio, getPortfolios } = require('../controllers/portfolioController');

const router = express.Router();

// Route to create a new portfolio
router.post('/', createPortfolio);

// Route to get all portfolios
router.get('/', getPortfolios);

module.exports = router;
