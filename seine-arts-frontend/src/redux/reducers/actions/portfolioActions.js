import axios from 'axios';

export const fetchPortfolios = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_PORTFOLIOS_REQUEST' });
    const { data } = await axios.get('https://your-backend-api-url.com/api/portfolios');
    dispatch({ type: 'FETCH_PORTFOLIOS_SUCCESS', payload: data.portfolios });
  } catch (error) {
    dispatch({ type: 'FETCH_PORTFOLIOS_FAIL', payload: error.message });
  }
};
