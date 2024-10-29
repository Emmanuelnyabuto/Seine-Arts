const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// GET all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services' });
  }
});

// GET a single service by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service' });
  }
});

// POST a new service
router.post('/', async (req, res) => {
  const { name, description, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required.' });
  }
  try {
    const newService = new Service({ name, description, price });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: 'Error creating service' });
  }
});

module.exports = router;
