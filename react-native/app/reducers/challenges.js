import {
  LOAD_CHALLENGES,
  NETWORK_ERROR_LOAD_CHALLENGES,
  CHALLENGES_LOADED,
  LOAD_CHALLENGE,
  NETWORK_ERROR_LOAD_CHALLENGE,
  CHALLENGE_LOADED,
  SET_CHALLENGE_VIEW,
  SET_CHALLENGE_ID,
  SET_PROPOSAL_VIEW,
  SET_PROPOSAL_LIST_MODE,
} from '../actions/challenges';
import { CHALLENGE_VIEWS } from '../consts';

import { DEV_CONFIG } from '../config/config';

import { addDefaultStructure, getSelectedChallengeIndex } from '../helper/challengesHelper';
import { popChallengeSelector } from '../helper/navigationProxy';
import initialState from '../config/initialState';

export default (state = initialState.challenges, action) => {
  try {
    switch (action.type) {
      case LOAD_CHALLENGES: {
        let oldChallenges = state;
        oldChallenges = addDefaultStructure(oldChallenges);

        if (oldChallenges.challenges.length > 0) {
          oldChallenges.isLoading = !action.quietLoading;
        } else {
          oldChallenges.isLoading = true;
        }
        oldChallenges.isInternalLoading = true;
        oldChallenges.isError = false;
        return oldChallenges;
      }
      case CHALLENGES_LOADED: {
        const now = new Date();
        const challenges = [];
        for (let i = 0; i < action.result.challenges.length; i += 1) {
          const entry = action.result.challenges[i];

          if (DEV_CONFIG.USE_CUSTOM_END_DATE) {
            if (entry._id === DEV_CONFIG.CUSTOM_END_DATE_ID) {
              const customDate = DEV_CONFIG.CUSTOM_END_DATE;
              entry.end_date = new Date(customDate);
            }
          }

          const newEntry = {
            ...entry,
            isLoading: false,
            isInternalLoading: false,
            isError: false,
            voteNum: i + 1,
          };
          challenges.push(newEntry);
        }
        const result = {
          ...state,
          isLoading: false,
          isInternalLoading: false,
          isError: false,
          time: now.getTime(),
          challenges,
        };
        return result;
      }
      case NETWORK_ERROR_LOAD_CHALLENGES: {
        return {
          isLoading: false,
          isInternalLoading: false,
          isError: true,
          time: state.time,
          challenges: [],
          error: action.error,
        };
      }
      case LOAD_CHALLENGE: {
        for (let i = 0; i < state.challenges.length; i += 1) {
          const myChallenge = state.challenges[i];
          if (myChallenge._id === action.challengeId) {
            const newChallenge = {
              ...myChallenge,
              isLoading: true,
              isInternalLoading: true,
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
        let challengeId = null;
        let challengeIndex = -1;
        let challengeView = state.challengeView;
        for (let i = 0; i < state.challenges.length; i += 1) {
          const myChallenge = state.challenges[i];
          if (myChallenge._id === action.action.challengeId) {
            const myChallenges = Array.from(state.challenges);
            if (action.result.challenges.length > 0) {
              challengeIndex = i;
              challengeId = myChallenge._id;
              const newChallenge = {
                ...action.result.challenges[0],
                voteNum: i + 1,
                isLoading: false,
                isInternalLoading: false,
              };
              if (DEV_CONFIG.USE_CUSTOM_END_DATE) {
                if (myChallenge._id === DEV_CONFIG.CUSTOM_END_DATE_ID) {
                  const customDate = DEV_CONFIG.CUSTOM_END_DATE;
                  newChallenge.end_date = new Date(customDate);
                }
              }
              myChallenges[i] = newChallenge;
            } else {
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
              // Challenge is not existing, but the current challenge. Pop
              if (challengeIndex === -1) {
                challengeId = null;
                challengeView = CHALLENGE_VIEWS.LIST;
                popChallengeSelector(action.action.props, false);
              }
            }
            // Changed or deleted
            const newState = {
              ...state,
              challenges: myChallenges,
              selectedChallengeId: challengeId,
              selectedChallengeIndex: challengeIndex,
              challengeView,
            };

            return newState;
          }
        }
        // if found nothing: challenge was deleted and is not in list anyway
        return state;
      }
      case NETWORK_ERROR_LOAD_CHALLENGE: {
        return state;
      }
      case SET_CHALLENGE_VIEW: {
        return {
          ...state,
          challengeView: action.challengeView,
        };
      }
      case SET_CHALLENGE_ID: {
        let challengeId = action.challengeId;
        const challengeIndex = getSelectedChallengeIndex(challengeId);
        if (challengeIndex === -1) {
          challengeId = null;
        }
        const newState = {
          ...state,
          selectedChallengeId: challengeId,
          selectedChallengeIndex: challengeIndex,
        };
        return newState;
      }
      case SET_PROPOSAL_VIEW: {
        return {
          ...state,
          proposalView: action.proposalView,
        };
      }

      case SET_PROPOSAL_LIST_MODE: {
        return {
          ...state,
          proposalListMode: action.proposalListMode,
        };
      }
      default:
        return state;
    }
  } catch (e) {
    console.log('Reducer Challenges');
    console.log(e);
    throw e;
  }
};
