import { combineReducers } from 'redux';

import globals from './globals';
import challenges from './services/challenges';
import proposals from './services/proposals';
import content from './services/content';

export default combineReducers({
  globals,
  challenges,
  proposals,
  content,
});
