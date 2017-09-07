import { SET_CHALLENGES_TIME_LEFT } from '../actions/challengesTicker';

import initialState from '../config/initialState';
import { getTickerDataChallenges } from '../helper/dateFunctions';
import store from '../config/store';

export default (state = initialState.challengesTicker, action) => {
  try {
    switch (action.type) {
      case SET_CHALLENGES_TIME_LEFT: {
        let challengesState = null;

        if (action.result) {
          challengesState = action.result;
        } else {
          challengesState = store.getState().challenges;
        }
        const challengesTicker = getTickerDataChallenges(challengesState, state);
        const res = {
          ...state,
          ...challengesTicker,
        };
        return res;
      }

      default:
        return state;
    }
  } catch (e) {
    console.log('Reducer ChallengeTicker');
    console.log(e);
    throw e;
  }
};
