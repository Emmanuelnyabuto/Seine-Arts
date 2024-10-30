const express = require('express');
const multer = require('multer');
const { protect, admin } = require('../middleware/authMiddleware');
const Portfolio = require('../models/Portfolio');

const router = express.Router();

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists or configure your storage
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Portfolio Upload Route
router.post(
  '/upload',
  protect,
  admin,
  upload.array('media', 10), // Allow up to 10 files to be uploaded
  async (req, res) => {
    try {
      const { serviceCategory, description } = req.body;
      const media = req.files.map((file) => file.filename); // Store file names, not full paths
      const uploadedBy = req.user._id;

      // Validate required fields
      if (!serviceCategory || !description || media.length === 0) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Create a new portfolio entry
      const portfolio = new Portfolio({
        serviceCategory,
        description,
        media,
        uploadedBy,
      });

      const savedPortfolio = await portfolio.save();
      res.status(201).json(savedPortfolio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error uploading portfolio. Please try again.' });
    }
  }
);

// Route to get all portfolios
router.get('/', async (req, res) => {
  try {
    const portfolios = await Portfolio.find().populate('uploadedBy', 'name'); // Optionally populate the uploader's name
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolios' });
  }
});

module.exports = router;
