const express = require('express');
const { createClient } = require('contentful');
const router = express.Router();

// Log the environment variables for debugging (optional, for debugging purposes)
console.log('Contentful Space ID:', process.env.CONTENTFUL_SPACE_ID);
console.log('Contentful Access Token:', process.env.CONTENTFUL_ACCESS_TOKEN);

// Create the Contentful client using environment variables
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Route to fetch portfolio items from Contentful
router.get('/portfolios', async (req, res) => {
  try {
    const response = await client.getEntries({ content_type: 'portfolio' });
    res.json(response.items); // Return the portfolio items in the response
  } catch (error) {
    console.error('Error fetching portfolios from Contentful:', error);
    res.status(500).json({ message: 'Error fetching portfolios from Contentful', error });
  }
});

// Route to fetch service items from Contentful
router.get('/services', async (req, res) => {
  try {
    const response = await client.getEntries({ content_type: 'service' });
    res.json(response.items); // Return the service items in the response
  } catch (error) {
    console.error('Error fetching services from Contentful:', error);
    res.status(500).json({ message: 'Error fetching services from Contentful', error });
  }
});

// You can add additional routes here if necessary for other content types

module.exports = router;
