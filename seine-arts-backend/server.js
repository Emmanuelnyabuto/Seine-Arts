require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const contentfulRoutes = require('./routes/contentfulRoutes'); // Import contentful routes

const app = express();

// Middleware to parse incoming requests as JSON
app.use(express.json());

// Routes for fetching content from Contentful
app.use('/api/content', contentfulRoutes);

// Basic root route for health check
app.get('/', (req, res) => {
  res.send('Seine Arts Backend is running');
});

// Define the server port, using environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
