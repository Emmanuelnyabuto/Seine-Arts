const initialState = {
  jobs: [],
  loading: false,
  error: null,
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_JOB_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'POST_JOB_SUCCESS':
      return {
        ...state,
        loading: false,
        jobs: [...state.jobs, action.payload],
      };
    case 'POST_JOB_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default jobReducer;
