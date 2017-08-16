import { SET_CHALLENGES_DATE_DATA } from '../actions/challengesTicker';

import initialState from '../config/initialState';
import { getChallengesTickerData } from '../helper/dateFunctions';
import store from '../config/store';

export default (state = initialState.challengesTicker, action) => {
  switch (action.type) {
    case SET_CHALLENGES_DATE_DATA: {
      // console.log('SET_CHALLENGES_DATE_DATA');
      let challengesState = null;

      if (action.result) {
        challengesState = action.result;
      } else {
        challengesState = store.getState().challenges;
      }
      const challengesTicker = getChallengesTickerData(challengesState);
      return challengesTicker;
    }

    default:
      return state;
  }
};
