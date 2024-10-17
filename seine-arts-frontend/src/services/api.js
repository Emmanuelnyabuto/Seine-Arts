import axios from 'axios';

const API = axios.create({ baseURL: 'https://your-backend-api-url.com/api' });

export const postJob = async (jobDetails) => {
  const { data } = await API.post('/jobs', jobDetails);
  return data;
};

export const processPayment = async (paymentDetails) => {
  const { data } = await API.post('/payments', paymentDetails);
  return data;
};
