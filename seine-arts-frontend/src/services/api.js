import axios from 'axios';

// Use the environment variable for the API URL
const API_BASE_URL = process.env.REACT_APP_API_URL; // No need for fallback

// Example function to get portfolios
export const getPortfolios = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/portfolios`);
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    throw error;
  }
};
