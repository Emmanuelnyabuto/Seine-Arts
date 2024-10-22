const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const contentfulRoutes = require('./routes/contentfulRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable CORS for frontend requests
app.use(cors({
  origin: 'https://seine-arts.vercel.app/',  // Replace with your frontend URL (e.g., Vercel URL)
  methods: ['GET', 'POST'],
  credentials: true,
}));

// Use JSON for API responses
app.use(express.json());

// Set up routes for Contentful API
app.use('/api', contentfulRoutes);

// Start server on port from environment variables or default port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
