const Portfolio = require('../models/portfolioModel');

exports.createPortfolio = async (req, res) => {
  const { title, description, images, userId } = req.body;

  try {
    const portfolio = await Portfolio.create({ title, description, images, user: userId });
    res.status(201).json({ portfolio });
  } catch (error) {
    res.status(500).json({ message: 'Error creating portfolio' });
  }
};

exports.getPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find().populate('user');
    res.status(200).json({ portfolios });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolios' });
  }
};
