const initialState = {
    portfolios: [],
    loading: false,
    error: null,
  };
  
  const portfolioReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PORTFOLIOS_REQUEST':
        return {
          ...state,
          loading: true,
        };
      case 'FETCH_PORTFOLIOS_SUCCESS':
        return {
          ...state,
          loading: false,
          portfolios: action.payload,
        };
      case 'FETCH_PORTFOLIOS_FAIL':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default portfolioReducer;
  