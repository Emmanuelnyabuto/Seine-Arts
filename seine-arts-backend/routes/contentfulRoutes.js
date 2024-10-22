const express = require('express');
const { createClient } = require('contentful');
const router = express.Router();

// Initialize the Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Fetch portfolios from Contentful
router.get('/portfolios', async (req, res) => {
  try {
    const response = await client.getEntries({ content_type: 'portfolio' });
    res.json(response.items);
  } catch (error) {
    console.error('Error fetching portfolios from Contentful:', error);
    res.status(500).json({ error: 'Failed to fetch portfolios' });
  }
});

// Add more routes for different content types if necessary
module.exports = router;
