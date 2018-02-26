import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as Actions from './actions';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
});
export default store;
export { Actions, axiosInstance as axios };
