const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [{
    type: String, // Store image URLs
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the professional user
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;
