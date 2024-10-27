const express = require('express');
const Job = require('../models/Job');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Route for Admin to assign a job to a professional
router.post('/assign-job', protect, admin, async (req, res) => {
  const { professionalId, portfolioId, description, clientId } = req.body;

  try {
    const job = await Job.create({
      professional: professionalId,
      portfolio: portfolioId,
      description,
      client: clientId,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Failed to assign job', error });
  }
});

// Route for Professionals to view their assigned jobs
router.get('/professional-jobs', protect, async (req, res) => {
  try {
    const jobs = await Job.find({ professional: req.user._id }).populate('client portfolio');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve jobs', error });
  }
});

module.exports = router;
