// models/Portfolio.js

const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema(
  {
    serviceCategory: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    media: {
      type: [String], // Array of file paths or URLs to media files
      default: [],
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
module.exports = Portfolio;
