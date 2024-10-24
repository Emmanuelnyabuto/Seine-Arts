// models/contactModel.js

const mongoose = require('mongoose');

// Define the contact schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the contact model
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
