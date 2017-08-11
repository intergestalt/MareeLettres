import {
  LOAD_CHALLENGES,
  NETWORK_ERROR_LOAD_CHALLENGES,
  CHALLENGES_LOADED,
  LOAD_CHALLENGE,
  NETWORK_ERROR_LOAD_CHALLENGE,
  CHALLENGE_LOADED,
} from '../../actions/services/challenges';

import initialState from '../../config/initialState';
import { getDateData, isFinished } from '../../helper/dateFunctions';

const resetAllChallenges = () => {
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
      return resetAllChallenges();
    }
    case CHALLENGES_LOADED: {
      console.log('CHALLENGES_LOADED 1');
      const now = new Date();
      const challenges = [];
      for (let i = 0; i < action.result.challenges.length; i += 1) {
        const entry = action.result.challenges[i];
        const endDate = new Date(entry.end_date);

        const finish = isFinished(endDate);
        const dateDate = getDateData(endDate);

        const newEntry = {
          ...entry,
          isFinished: finish,
          isLoading: false,
          voteNum: i + 1,
          endStringFr: dateDate.endStringFr,
          endStringEn: dateDate.endStringEn,
          tickerString: dateDate.tickerString,
        };
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
    case LOAD_CHALLENGE: {
      console.log('LOAD_CHALLENGE');
      for (let i = 0; i < state.challenges.length; i += 1) {
        const myChallenge = state.challenges[i];
        if (myChallenge._id === action.challengeId) {
          const newChallenge = {
            ...myChallenge,
            isLoading: true,
            isFinished: true,
          };
          const myChallenges = Array.from(state.challenges);
          myChallenges[i] = newChallenge;
          const newState = {
            ...state,
            challenges: myChallenges,
          };
          return newState;
        }
      }
      // if found nothing: challenge was deleted
      return state;
    }
    case CHALLENGE_LOADED: {
      console.log(`CHALLENGE_LOADED ${action.action.challengeId}`);
      for (let i = 0; i < state.challenges.length; i += 1) {
        const myChallenge = state.challenges[i];
        if (myChallenge._id === action.action.challengeId) {
          const endDate = new Date(myChallenge.end_date);
          const finish = isFinished(endDate);
          const myChallenges = Array.from(state.challenges);
          if (action.result.challenges.length > 0) {
            console.log('FOUND -> CHANGE');
            const newChallenge = {
              ...action.result.challenges[0],
              isFinished: finish,
              voteNum: i + 1,
              isLoading: false,
            };
            myChallenges[i] = newChallenge;
          } else {
            console.log('FOUND BUT NOT EXISTING ANYMORE -> DELETE');
            myChallenges.splice(i, 1);
            for (let j = 0; j < myChallenges.length; j += 1) {
              myChallenges[j].voteNum = j + 1;
            }
          }
          const newState = {
            ...state,
            challenges: myChallenges,
          };

          return newState;
        }
      }
      // if found nothing: challenge was deleted
      return state;
    }
    case NETWORK_ERROR_LOAD_CHALLENGE: {
      console.log('NETWORK_ERROR_LOAD_CHALLENGE');
      return state;
    }
    default:
      return state;
  }
};
