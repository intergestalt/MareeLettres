import { combineReducers } from 'redux';

import globals from './globals';
import challenges from './services/challenges';

export default combineReducers({
  globals,
  challenges,
});
