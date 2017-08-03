import {
  LOAD_CHALLENGES,
  NETWORK_ERROR,
  CHALLENGES_LOADED,
} from '../../actions/services/challenges';

import initialState from '../../config/initialState';

const resetChallenges = () => {
  const res = {
    isLoading: true,
    isError: false,
    time: null,
    challenges: [],
  };
  return res;
};

export default (state = initialState.challenges, action) => {
  console.log('REDUCER CHALLANGES');

  switch (action.type) {
    case LOAD_CHALLENGES: {
      console.log('RESET Challenges');
      return resetChallenges();
    }
    case CHALLENGES_LOADED: {
      console.log('CHALLENGES_LOADED 1');
      const now = new Date();

      return {
        isLoading: false,
        isError: false,
        time: now.getTime(),
        ...action.result,
      };
    }
    case NETWORK_ERROR: {
      console.log('NETWORK ERROR 1');
      const now = new Date();
      return {
        isLoading: false,
        isError: true,
        time: now.getTime(),
        challenges: [],
        error: action.error,
      };
    }
    default:
      return state;
  }
};
