import axios from 'axios';

export const postJob = (jobDetails) => async (dispatch) => {
  try {
    dispatch({ type: 'POST_JOB_REQUEST' });
    const { data } = await axios.post('https://your-backend-api-url.com/api/jobs', jobDetails);
    dispatch({ type: 'POST_JOB_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'POST_JOB_FAIL', payload: error.message });
  }
};
