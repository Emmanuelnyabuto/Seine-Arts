const Job = require('../models/jobModel');

exports.postJob = async (req, res) => {
  const { title, description, clientId } = req.body;

  try {
    const job = await Job.create({ title, description, client: clientId });
    res.status(201).json({ job });
  } catch (error) {
    res.status(500).json({ message: 'Error posting job' });
  }
};

exports.assignJob = async (req, res) => {
  const { jobId, professionalId } = req.body;

  try {
    const job = await Job.findByIdAndUpdate(jobId, { professional: professionalId });
    res.status(200).json({ message: 'Job assigned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning job' });
  }
};
