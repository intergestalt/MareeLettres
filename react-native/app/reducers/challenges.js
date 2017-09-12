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
  SET_CHALLENGES_IS_LOADING_FROM_STORAGE,
  SET_CHALLENGES,
} from '../actions/challenges';
import { DEV_CONFIG } from '../config/config';
import { saveChallengesToStorage } from '../helper/localStorage';
import { CHALLENGE_VIEWS, PROPOSAL_VIEWS, PROPOSAL_LIST_MODES } from '../consts';

import {
  addDefaultStructure,
  getSelectedChallengeIndex,
  getChallengeFromId,
} from '../helper/challengesHelper';
import { popChallengeSelector } from '../helper/navigationProxy';
import initialState from '../config/initialState';
import { listIsEmpty } from '../helper/helper';

export default (state = initialState.challenges, action) => {
  try {
    switch (action.type) {
      case LOAD_CHALLENGES: {
        console.log('LOAD_CHALLENGES');
        let oldChallenges = state;
        oldChallenges = addDefaultStructure(oldChallenges);

        if (!listIsEmpty(oldChallenges.challenges)) {
          oldChallenges.isLoading = !action.quietLoading;
        } else {
          oldChallenges.isLoading = true;
        }
        oldChallenges.isInternalLoading = true;
        return oldChallenges;
      }
      case CHALLENGES_LOADED: {
        console.log('CHALLENGES_LOADED');
        const now = new Date();
        const challenges = [];
        const oldChallenges = state.challenges;
        for (let i = 0; i < action.result.challenges.length; i += 1) {
          const entry = action.result.challenges[i];
          let newProposalView = PROPOSAL_VIEWS.TINDER;
          let newProposaListMode = PROPOSAL_LIST_MODES.MOST;
          const oldChallenge = getChallengeFromId(oldChallenges, entry._id);
          if (oldChallenge) {
            newProposalView = oldChallenge.proposalView;
            newProposaListMode = oldChallenge.proposalListMode;
          }
          if (DEV_CONFIG.USE_CUSTOM_END_DATE) {
            if (entry._id === DEV_CONFIG.CUSTOM_END_DATE_ID) {
              const customDate = DEV_CONFIG.CUSTOM_END_DATE;
              entry.end_date = new Date(customDate);
            }
          }

          const newEntry = {
            ...entry,
            proposalView: newProposalView,
            proposalListMode: newProposaListMode,
            isLoading: false,
            isInternalLoading: false,
            voteNum: i + 1,
          };
          challenges.push(newEntry);
        }
        const result = {
          ...state,
          isLoading: false,
          isInternalLoading: false,
          time: now.getTime(),
          challenges,
        };
        saveChallengesToStorage(result);

        return result;
      }
      case NETWORK_ERROR_LOAD_CHALLENGES: {
        console.log('NETWORK_ERROR_LOAD_CHALLENGES');
        let oldChallenges = state;
        oldChallenges = addDefaultStructure(oldChallenges);
        return {
          ...oldChallenges,
          isLoading: false,
          isInternalLoading: false,
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
          // If Challenge is in already in list (reload)
          if (myChallenge._id === action.action.challengeId) {
            const myChallenges = Array.from(state.challenges);
            if (action.result.challenges.length > 0) {
              const newProposalView = PROPOSAL_VIEWS.TINDER;
              let newProposaListMode = PROPOSAL_LIST_MODES.MOST;

              /* if (myChallenge.proposalView) {
                newProposalView = myChallenge.proposalView;
              } */
              if (myChallenge.proposalListMode) {
                newProposaListMode = myChallenge.proposalListMode;
              }
              challengeIndex = i;
              challengeId = myChallenge._id;
              const newChallenge = {
                ...action.result.challenges[0],
                voteNum: i + 1,
                isLoading: false,
                isInternalLoading: false,
                proposalView: newProposalView,
                proposalListMode: newProposaListMode,
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

            saveChallengesToStorage(newState);
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
        const result = {
          ...state,
          challengeView: action.challengeView,
        };
        saveChallengesToStorage(result);

        return result;
      }
      case SET_CHALLENGE_ID: {
        let challengeView = state.challengeView;
        let challengeId = action.challengeId;
        const challengeIndex = getSelectedChallengeIndex(challengeId);
        if (challengeIndex === -1) {
          challengeId = null;
        }

        if (challengeIndex === -1) {
          challengeView = CHALLENGE_VIEWS.LIST;

          popChallengeSelector(action.props, false);
        }
        const newState = {
          ...state,
          challengeView,
          selectedChallengeId: challengeId,
          selectedChallengeIndex: challengeIndex,
        };
        return newState;
      }
      case SET_PROPOSAL_VIEW: {
        const myChallenges = Array.from(state.challenges);
        for (let i = 0; i < myChallenges.length; i += 1) {
          const myChallenge = myChallenges[i];
          if (myChallenge._id === action.challengeId) {
            myChallenge.proposalView = action.proposalView;
          }
        }

        const result = {
          ...state,
          challenges: myChallenges,
        };
        saveChallengesToStorage(result);
        return result;
      }

      case SET_PROPOSAL_LIST_MODE: {
        const myChallenges = Array.from(state.challenges);
        for (let i = 0; i < myChallenges.length; i += 1) {
          const myChallenge = myChallenges[i];
          if (myChallenge._id === action.challengeId) {
            myChallenge.proposalListMode = action.proposalListMode;
          }
        }

        const result = {
          ...state,
          challenges: myChallenges,
        };
        saveChallengesToStorage(result);
        return result;
      }
      case SET_CHALLENGES: {
        let challenges = action.challenges;
        challenges = addDefaultStructure(challenges);
        let challengeView = state.challengeView;
        if (listIsEmpty(challenges.challenges)) {
          challengeView = CHALLENGE_VIEWS.LIST;
          popChallengeSelector(action.props, false);
        }
        const result = {
          ...challenges,
          challengeView,
        };
        return result;
      }
      // Redux local storage
      case SET_CHALLENGES_IS_LOADING_FROM_STORAGE: {
        return { ...state, challengesIsLoadingFromStorage: action.yes };
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
