const express = require('express');
const { postJob, assignJob } = require('../controllers/jobController');

const router = express.Router();

// Route to post a new job
router.post('/', postJob);

// Route to assign a job to a professional
router.post('/assign', assignJob);

module.exports = router;
