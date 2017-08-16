import {
  LOAD_CHALLENGES,
  NETWORK_ERROR_LOAD_CHALLENGES,
  CHALLENGES_LOADED,
  LOAD_CHALLENGE,
  NETWORK_ERROR_LOAD_CHALLENGE,
  CHALLENGE_LOADED,
  SET_CHALLENGES_ID,
  SET_CHALLENGES_INDEX,
} from '../actions/challenges';
import { USE_CUSTOM_END_DATE, CUSTOM_END_DATE_ID, CUSTOM_END_DATE } from '../consts/';

import initialState from '../config/initialState';

export default (state = initialState.challenges, action) => {
  switch (action.type) {
    case LOAD_CHALLENGES: {
      console.log('LOAD_CHALLENGES');
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case CHALLENGES_LOADED: {
      console.log('CHALLENGES_LOADED');
      const now = new Date();
      const challenges = [];
      for (let i = 0; i < action.result.challenges.length; i += 1) {
        const entry = action.result.challenges[i];

        if (USE_CUSTOM_END_DATE) {
          if (entry._id === CUSTOM_END_DATE_ID) {
            const customDate = CUSTOM_END_DATE;
            entry.end_date = new Date(customDate);
          }
        }

        const newEntry = {
          ...entry,
          isLoading: false,
          voteNum: i + 1,
        };
        challenges.push(newEntry);
      }

      return {
        ...state,
        isLoading: false,
        isError: false,
        time: now.getTime(),
        challenges,
      };
    }
    case NETWORK_ERROR_LOAD_CHALLENGES: {
      console.log('NETWORK ERROR 1');
      return {
        isLoading: false,
        isError: true,
        time: state.time,
        challenges: [],
        error: action.error,
      };
    }
    case LOAD_CHALLENGE: {
      console.log(`LOAD_CHALLENGE ${action.challengeId}`);
      for (let i = 0; i < state.challenges.length; i += 1) {
        const myChallenge = state.challenges[i];
        if (myChallenge._id === action.challengeId) {
          const newChallenge = {
            ...myChallenge,
            isLoading: true,
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
      let challengeId = null;
      let challengeIndex = -1;
      for (let i = 0; i < state.challenges.length; i += 1) {
        const myChallenge = state.challenges[i];
        if (myChallenge._id === action.action.challengeId) {
          const myChallenges = Array.from(state.challenges);
          if (action.result.challenges.length > 0) {
            console.log('FOUND -> CHANGE');
            challengeIndex = i;
            challengeId = myChallenge._id;
            const newChallenge = {
              ...action.result.challenges[0],
              voteNum: i + 1,
              isLoading: false,
            };
            if (USE_CUSTOM_END_DATE) {
              if (myChallenge._id === CUSTOM_END_DATE_ID) {
                const customDate = CUSTOM_END_DATE;
                newChallenge.end_date = new Date(customDate);
              }
            }
            myChallenges[i] = newChallenge;
          } else {
            console.log('FOUND BUT NOT EXISTING ANYMORE -> DELETE');
            myChallenges.splice(i, 1);
            challengeIndex = -1;
            challengeId = null;
            for (let j = 0; j < myChallenges.length; j += 1) {
              myChallenges[j].voteNum = j + 1;
              if (myChallenges[j]._id === state.selectedChallengeId) {
                challengeId = myChallenges[j]._id;
                challengeIndex = j;
              }
            }
            // Challenge is not existing, but the current challenge. Go to 0
            if (challengeIndex === -1) {
              if (state.challenges) {
                if (state.challenges.length > 0) {
                  challengeId = state.challenges[0]._id;
                  challengeIndex = 0;
                }
              }
            }
          }
          // Changed or deleted
          const newState = {
            ...state,
            challenges: myChallenges,
            selectedChallengeId: challengeId,
            selectedChallengeIndex: challengeIndex,
          };

          return newState;
        }
      }
      // if found nothing: challenge was deleted and is not in list anyway
      return state;
    }
    case NETWORK_ERROR_LOAD_CHALLENGE: {
      console.log('NETWORK_ERROR_LOAD_CHALLENGE');
      return state;
    }
    case SET_CHALLENGES_ID: {
      const newState = {
        ...state,
        selectedChallengeId: action.challengeId,
      };
      return newState;
    }
    case SET_CHALLENGES_INDEX: {
      const newState = {
        ...state,
        selectedChallengeIndex: action.challengeIndex,
      };
      return newState;
    }
    default:
      return state;
  }
};
