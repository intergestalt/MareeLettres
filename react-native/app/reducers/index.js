import { combineReducers } from 'redux';

import globals from './globals';
import challenges from './challenges';
import challengesTicker from './challengesTicker';
import proposals from './proposals';
import content from './content';
import letters from './letters';
import user from './user';

export default combineReducers({
  globals,
  challenges,
  challengesTicker,
  proposals,
  content,
  letters,
  user,
});
