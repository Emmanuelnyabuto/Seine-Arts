const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');

// POST: Handle contact form submissions
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    // Create a new contact message in the database
    const newContact = new Contact({
      name,
      email,
      message
    });

    // Save the message to the database
    await newContact.save();

    // Respond with success message
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
});

module.exports = router;
