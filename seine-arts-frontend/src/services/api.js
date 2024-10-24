import axios from 'axios';

// Base URL for the backend API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: API_BASE_URL, // Use the backend URL from environment variables
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to handle the authorization token (if the user is logged in)
const setAuthToken = (token) => {
  if (token) {
    // Apply token to every request if logged in
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Remove the Authorization header if no token is present
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// API call to get the portfolios
export const getPortfolios = async () => {
  try {
    const response = await axiosInstance.get('/api/portfolios');
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    throw error;
  }
};

// API call to log in a user
export const loginUser = async (formData) => {
  try {
    const response = await axiosInstance.post('/api/users/login', formData);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// API call to sign up a user
export const signupUser = async (formData) => {
  try {
    const response = await axiosInstance.post('/api/users/signup', formData);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// API call to fetch the profile of the logged-in user
export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/api/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

// API call to fetch an admin dashboard (if applicable)
export const getAdminDashboard = async () => {
  try {
    const response = await axiosInstance.get('/api/admin/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching admin dashboard:', error);
    throw error;
  }
};

// Export the Axios instance for use in other parts of the app
export default axiosInstance;
