import { createClient } from 'contentful';

// Initialize Contentful client
const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,  // Use environment variables for security
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

export const fetchPortfolioItems = async () => {
  try {
    const response = await client.getEntries({ content_type: 'portfolio' });
    return response.items;
  } catch (error) {
    console.error('Error fetching portfolio items from Contentful:', error);
    return [];
  }
};

export const fetchServices = async () => {
  try {
    const response = await client.getEntries({ content_type: 'service' });
    return response.items;
  } catch (error) {
    console.error('Error fetching services from Contentful:', error);
    return [];
  }
};
