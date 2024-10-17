import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';  // Correct import for redux-thunk
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';  // Your combined reducers

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
