const express = require('express');
const { createClient } = require('contentful');
const router = express.Router();

// Create Contentful client using environment variables for space ID and access token
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Fetch portfolios from Contentful
router.get('/portfolios', async (req, res) => {
  try {
    // Fetch all portfolio entries from Contentful
    const response = await client.getEntries({ content_type: 'portfolio' });
    
    // Send the fetched items as the response
    res.json(response.items);
  } catch (error) {
    console.error('Error fetching content from Contentful:', error);
    res.status(500).json({ message: 'Error fetching content from Contentful', error });
  }
});

// Optionally, you can add routes for other content types, such as services
router.get('/services', async (req, res) => {
  try {
    // Fetch all service entries from Contentful
    const response = await client.getEntries({ content_type: 'service' });
    
    // Send the fetched items as the response
    res.json(response.items);
  } catch (error) {
    console.error('Error fetching content from Contentful:', error);
    res.status(500).json({ message: 'Error fetching services from Contentful', error });
  }
});

module.exports = router;
