const express = require('express');
const multer = require('multer');
const Portfolio = require('../models/Portfolio');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload portfolio route
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  try {
    const portfolio = new Portfolio({
      professional: req.body.professional,
      description: req.body.description,
      image: req.file.path,
    });
    await portfolio.save();
    res.status(201).json({ message: 'Portfolio uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading portfolio' });
  }
});

module.exports = router;
