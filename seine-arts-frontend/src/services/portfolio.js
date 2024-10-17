import axios from 'axios';

const API = axios.create({ baseURL: 'https://your-backend-api-url.com/api' });

export const getPortfolios = async () => {
  const { data } = await API.get('/portfolios');
  return data;
};
