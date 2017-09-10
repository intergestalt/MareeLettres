import {
  LOAD_USER,
  USER_LOADED,
  SET_USER,
  LOAD_USER_ERROR,
  USER_SET_ID,
  USER_SET_SECONDARY_LETTERS,
  USER_SET_PRIMARY_LETTER,
  USER_DELETE_LETTERS,
  USER_UPDATE_LETTER_MENU,
  USER_REVIVE_LETTER_MENU,
  USER_WIPE_LETTER_MENU,
  USER_UPDATE_ERROR,
  USER_GET_LETTER,
  USER_BIN_LETTER,
  USER_ADD_FRIEND_LETTER,
  USER_VOTE_INTERNAL,
  USER_SEND_INTERNAL_VOTES,
  USER_INTERNAL_VOTES_SENT,
  USER_SEND_INTERNAL_VOTES_ERROR,
  SET_USER_IS_LOADING_FROM_STORAGE,
  SET_USER_LOADED_FROM_STORAGE,
  USER_SET_MAP_TUTORIAL_STATUS,
  USER_FLAG_LETTER_FOR_OVERWRITE,
  SET_OWN_PROPOSAL,
} from '../actions/user';

import {
  SUCCESS_POST_PROPOSAL,
} from '../actions/proposals'

import { navigateToStatus } from '../helper/navigationProxy';

import { CHANGE_MAP_REGION, CHANGE_MAP_LAYOUT, USER_SET_COORDINATES } from '../actions/map';

import store from '../config/store';
import initialState from '../config/initialState';
import { saveUserToStorage } from '../helper/localStorage';

// const selectMenuItem = (state, index) => {};

export default (state = initialState.user, action) => {
  try {
    switch (action.type) {
      case LOAD_USER: {
        console.log('LOAD USER');
        const result = {
          ...state,
          votes: {},
          isInternalLoading: true,
        };
        return result;
      }

      case USER_LOADED: {
        console.log('USER_LOADED');

        const newVotes = {};
        const proposalIds = Object.keys(action.result.votes);

        for (let i = 0; i < proposalIds.length; i += 1) {
          const proposalId = proposalIds[i];
          newVotes[proposalId] = { bool: action.result.votes[proposalId] };
        }
        const result = {
          ...state,
          isDefaultUser: false,
          votes: newVotes,
          isInternalLoading: false,
        };
        return result;
      }
      case LOAD_USER_ERROR: {
        console.log('LOAD_USER_ERROR');
        return {
          ...state,
          isLoading: false,
          isInternalLoading: false,
        };
      }
      case SET_USER: {
        console.log('REDUCER: SET_USER');
        const user = action.user;
        user.isDefaultUser = false;
        return user;
      }
      // Redux local storage
      case SET_USER_IS_LOADING_FROM_STORAGE: {
        return { ...state, userIsLoadingFromStorage: action.yes };
      }

      case SET_USER_LOADED_FROM_STORAGE: {
        return {
          ...state,
          userLoadedFromStorage: action.yes,
        };
      }

      case CHANGE_MAP_REGION: {
        console.log('Reducer: CHANGE_MAP_REGION');
        const result = {
          ...state,
          map: {
            ...state.map,
            coordinates: action.region,
          },
        };
        saveUserToStorage(result);

        return result;
      }

      case CHANGE_MAP_LAYOUT: {
        console.log('Reducer: CHANGE_MAP_LAYOUT');
        const result = {
          ...state,
          map: {
            ...state.map,
            layout: action.layout,
          },
        };
        saveUserToStorage(result);

        return result;
      }

      case USER_ADD_FRIEND_LETTER: {
        console.log('Reducer: USER_ADD_FRIEND_LETTER');

        // prevent bad characters, TODO: remove (API res trusted)
        // if (!action.character.match(/[a-z]/i)) {
        // return state;
        // }

        const result = { ...state };

        if (result.secondary_letter_1.overwrite) {
          result.secondary_letter_1.character = action.character;
          result.secondary_letter_1.disabled = false;
        } else if (result.secondary_letter_2.overwrite) {
          result.secondary_letter_2.character = action.character;
          result.secondary_letter_2.disabled = false;
        } else if (result.secondary_letter_3.overwrite) {
          result.secondary_letter_3.character = action.character;
          result.secondary_letter_3.disabled = false;
        } else if (result.secondary_letter_4.overwrite) {
          result.secondary_letter_4.character = action.character;
          result.secondary_letter_4.disabled = false;
        }

        saveUserToStorage(result);
        return result;
      }

      case USER_GET_LETTER: {
        console.log('Reducer: USER_GET_LETTER');

        const result = {
          ...state,
          primary_letter: {
            ...state.primary_letter,
            character: action.character,
          },
        };
        saveUserToStorage(result);
        return result;
      }

      case USER_UPDATE_LETTER_MENU: {
        console.log('Reducer: USER_UPDATE_LETTER_MENU');

        const result = { ...state };

        if (action.menuIndex === 1) {
          result.secondary_letter_1.disabled = true;
        } else if (action.menuIndex === 2) {
          result.secondary_letter_2.disabled = true;
        } else if (action.menuIndex === 3) {
          result.secondary_letter_3.disabled = true;
        } else {
          result.secondary_letter_4.disabled = true;
        }

        saveUserToStorage(result);
        return result;
      }

      case USER_REVIVE_LETTER_MENU: {
        console.log('Reducer: USER_REVIVE_LETTER_MENU');

        const result = { ...state };

        if (action.menuIndex === 1) {
          result.secondary_letter_1.disabled = false;
        } else if (action.menuIndex === 2) {
          result.secondary_letter_2.disabled = false;
        } else if (action.menuIndex === 3) {
          result.secondary_letter_4.disabled = false;
        } else if (action.menuIndex === 4) {
          result.secondary_letter_4.disabled = false;
        }

        saveUserToStorage(result);
        return result;
      }

      case USER_BIN_LETTER: {
        console.log('Reducer: USER_BIN_LETTER');

        const result = { ...state };

        if (action.menuIndex === 1) {
          result.secondary_letter_1.character = '';
          result.secondary_letter_1.disabled = false;
        } else if (action.menuIndex === 2) {
          result.secondary_letter_2.character = '';
          result.secondary_letter_2.disabled = false;
        } else if (action.menuIndex === 3) {
          result.secondary_letter_3.character = '';
          result.secondary_letter_4.disabled = false;
        } else if (action.menuIndex === 4) {
          result.secondary_letter_4.character = '';
          result.secondary_letter_4.disabled = false;
        }

        saveUserToStorage(result);
        return result;
      }

      case USER_FLAG_LETTER_FOR_OVERWRITE: {
        console.log('Reducer: USER_FLAG_LETTER_FOR_OVERWRITE');

        const result = { ...state };

        result.secondary_letter_1.overwrite = action.menuIndex === 1;
        result.secondary_letter_2.overwrite = action.menuIndex === 2;
        result.secondary_letter_3.overwrite = action.menuIndex === 3;
        result.secondary_letter_4.overwrite = action.menuIndex === 4;

        return result;
      }

      case USER_SET_ID:
        console.log('Reducer: USER_SET_ID');
        return state;

      case USER_SET_COORDINATES:
        console.log('Reducer: USER_SET_COORDINATES');
        return {
          ...state,
          coordinates: {
            ...state.coordinates,
            latitude: action.lat,
            longitude: action.lng,
          },
        };

      case USER_UPDATE_ERROR:
        console.log('Reducer: USER_UPDATE_ERROR');
        return state;

      // Voting
      case USER_VOTE_INTERNAL: {
        console.log('USER_VOTE_INTERNAL');
        const myInternalVotes = state.internalVotes.internalVotes;
        myInternalVotes[action.proposalId] = { bool: action.yes };
        const result = {
          ...state,
          internalVotes: {
            ...state.internalVotes,
            internalVotes: myInternalVotes,
            time: new Date().getTime(),
          },
        };
        saveUserToStorage(result);
        return result;
      }
      case USER_SEND_INTERNAL_VOTES: {
        console.log('USER_SEND_INTERNAL_VOTES');
        const myInternalVotes = state.internalVotes;
        myInternalVotes.isInternalLoading = true;
        const result = {
          ...state,
          internalVotes: myInternalVotes,
        };
        return result;
      }
      case USER_INTERNAL_VOTES_SENT: {
        console.log('USER_INTERNAL_VOTES_SENT');
        const myInternalVotes = state.internalVotes;
        const myVotes = state.votes;
        const proposalIds = Object.keys(action.action.internalVotes.internalVotes);

        for (let i = 0; i < proposalIds.length; i += 1) {
          const proposalId = proposalIds[i];
          myVotes[proposalId] = { bool: myInternalVotes.internalVotes[proposalId].bool };
          delete myInternalVotes.internalVotes[proposalId];
        }

        // action.internalVotes.internalVotes;
        myInternalVotes.time = new Date().getTime();
        myInternalVotes.isInternalLoading = false;
        const result = {
          ...state,
          internalVotes: myInternalVotes,
          votes: myVotes,
        };
        saveUserToStorage(result);
        return result;
      }
      case USER_SEND_INTERNAL_VOTES_ERROR: {
        console.log('USER_SEND_INTERNAL_VOTES_ERROR');
        const myInternalVotes = state.internalVotes;
        myInternalVotes.isInternalLoading = false;
        const result = {
          ...state,
          myInternalVotes,
        };
        return result;
      }
      case USER_SET_MAP_TUTORIAL_STATUS: {
        console.log('USER_SET_MAP_TUTORIAL_STATUS');
        const result = {
          ...state,
          map: {
            ...state.map,
            tutorialStatus: action.status,
          },
        };
        console.log(result);
        saveUserToStorage(result);
        return result;
      }
      case SET_OWN_PROPOSAL: {
        console.log('SET_OWN_PROPOSAL');

        let myChallenges = state.challenges // this is the challenges object in user
        let myChallenge = myChallenges[action.challengeId];
        if(!myChallenge) {
          myChallenge = {};
        }
        if(!myChallenge.ownProposalInReview) {
          myChallenge.ownProposal = action.answer;
          myChallenge.ownProposalInReview = action.review;
          myChallenge.ownProposalBlocked = action.blocked;
          myChallenges[action.challengeId] = myChallenge;
        }
        const result = {
          ...state,
          challenges: myChallenges,
        };
        saveUserToStorage(result);
        return result;
      }
      case SUCCESS_POST_PROPOSAL: {
        console.log("user reducer: SUCESS_POST_PROPOSAL");
        console.log(action);

        let myChallenges = state.challenges;
        let myChallenge = state.challenges[action.action.body.challenge_id];
        if(!myChallenge) {
          myChallenge = {};
        }
        myChallenge.ownProposal = action.action.body.text;
        myChallenge.ownProposalId = action.result.proposal._id;
        myChallenge.ownProposalInReview = true;
        myChallenge.ownProposalBlocked = false;
        myChallenges[action.action.body.challenge_id] = myChallenge;

        const result = {
          ...state,
          challenges: myChallenges,
        };
        saveUserToStorage(result);

        navigateToStatus(action.action.props, null);

        return result;
      }

      default:
        return state;
    }
  } catch (e) {
    console.log('Reducer user');
    console.log(e);
    throw e;
  }
};
