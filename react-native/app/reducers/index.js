import { combineReducers } from 'redux';

import globals from './globals';
import challenges from './challenges';
import challengesTicker from './challengesTicker';
import proposals from './proposals';
import content from './content';
import myLetters from './myLetters';
import letters from './letters';
import user from './user';
import config from './config';

export default combineReducers({
  globals,
  challenges,
  challengesTicker,
  proposals,
  content,
  letters,
  myLetters,
  user,
  config,
});
