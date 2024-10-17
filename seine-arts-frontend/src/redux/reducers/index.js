import { combineReducers } from 'redux';

// Placeholder example reducer (replace with your actual reducers)
const exampleReducer = (state = { exampleData: [] }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  example: exampleReducer,
  // Add more reducers here
});

export default rootReducer;
