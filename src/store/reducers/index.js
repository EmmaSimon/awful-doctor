import { combineReducers } from 'redux';

import app from './app';
import diagnosis from './diagnosis';
import sickness from './sickness';
import symptom from './symptom';

export default combineReducers({
  app, diagnosis, sickness, symptom,
});
