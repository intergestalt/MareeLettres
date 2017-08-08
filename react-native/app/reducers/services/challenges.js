import {
  LOAD_CHALLENGES,
  NETWORK_ERROR_LOAD_CHALLENGES,
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
      const challenges = [];

      for (let i = 0; i < action.result.challenges.length; i += 1) {
        const entry = action.result.challenges[i];
        console.log(entry.end_date);
        const endDate = new Date(entry.end_date);

        console.log(`OUR DATE: ${endDate.getTime()}`);
        const newEntry = { id: entry._id, title: entry.title, end_date: entry.end_date };
        challenges.push(newEntry);
      }
      return {
        isLoading: false,
        isError: false,
        time: now.getTime(),
        challenges,
      };
    }
    case NETWORK_ERROR_LOAD_CHALLENGES: {
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
