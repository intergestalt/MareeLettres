import {
  LOAD_USER,
  USER_LOADED,
  SET_USER,
  LOAD_USER_ERROR,
  USER_SET_ID,
  USER_UPDATE_LETTER_MENU,
  USER_REVIVE_LETTER_MENU,
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
  USER_SET_VOTE_TUTORIAL_STATUS,
  USER_FLAG_LETTER_FOR_OVERWRITE,
  SET_OWN_PROPOSAL,
  SUCCESS_POST_PROPOSAL,
  NETWORK_ERROR_POST_PROPOSAL,
  POST_PROPOSAL,
  LOAD_PROPOSAL,
  SUCCESS_LOAD_PROPOSAL,
  NETWORK_ERROR_LOAD_PROPOSAL,
  DELETE_OWN_PROPOSAL,
} from '../actions/user';

import { CHANGE_MAP_REGION, CHANGE_MAP_LAYOUT, USER_SET_COORDINATES } from '../actions/map';

import initialState from '../config/initialState';
import { saveUserToStorage } from '../helper/localStorage';
import { isEmpty } from '../helper/helper';

// const selectMenuItem = (state, index) => {};

export default (state = initialState.user, action) => {
  try {
    switch (action.type) {
      case LOAD_USER: {
        console.log('LOAD USER');
        const result = {
          ...state,
          votes: {},
          isLoading: true,
          isInternalLoading: true,
        };
        return result;
      }

      case USER_LOADED: {
        console.log('USER_LOADED');
        const newVotes = {};
        const proposalIds = Object.keys(action.result.votes);
        console.log(action.result);

        for (let i = 0; i < proposalIds.length; i += 1) {
          const proposalId = proposalIds[i];
          newVotes[proposalId] = { bool: action.result.votes[proposalId] };
        }

        const newChallenges = {};
        if (action.result.proposals) {
          for (let i = 0; i < action.result.proposals.length; i += 1) {
            const proposal = action.result.proposals[i];
            const userProposal = { ownProposalId: proposal._id };
            newChallenges[proposal.challenge_id] = userProposal;
          }
        }
        const result = {
          ...state,
          isDefaultUser: false,
          votes: newVotes,
          challenges: newChallenges,
          isLoading: false,
          isInternalLoading: false,
        };
        console.log(result);
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
            acquired_at: new Date().toISOString(),
          },
        };
        saveUserToStorage(result);
        return result;
      }

      case USER_UPDATE_LETTER_MENU: {
        console.log('Reducer: USER_UPDATE_LETTER_MENU');

        const result = { ...state };

        if (action.menuIndex === 0) {
          result.primary_letter.disabled = true;
        } else if (action.menuIndex === 1) {
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

        if (action.menuIndex === 0) {
          result.primary_letter.disabled = false;
        }
        if (action.menuIndex === 1) {
          result.secondary_letter_1.disabled = false;
        } else if (action.menuIndex === 2) {
          result.secondary_letter_2.disabled = false;
        } else if (action.menuIndex === 3) {
          result.secondary_letter_3.disabled = false;
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
      case USER_SET_VOTE_TUTORIAL_STATUS: {
        console.log('USER_SET_VOTE_TUTORIAL_STATUS');
        const result = {
          ...state,
          voteTutorialStatus: action.status,
        };
        console.log(result);
        saveUserToStorage(result);
        return result;
      }
      case DELETE_OWN_PROPOSAL: {
        console.log(`DELETE_OWN_PROPOSAL ${action.challengeId}`);

        let myChallenges = state.challenges; // this is the challenges object in user
        if (!myChallenges) myChallenges = {};
        let myChallenge = myChallenges[action.challengeId];
        if (!myChallenge) {
          myChallenge = {};
        }
        myChallenge.isLoading = false;
        myChallenge.isInternalLoading = false;
        myChallenge.ownProposalInReview = null;
        myChallenge.ownProposalBlocked = null;
        myChallenge.ownProposal = null;
        myChallenge.ownProposalId = null;
        myChallenges[action.challengeId] = myChallenge;

        const result = {
          ...state,
          challenges: { ...myChallenges },
        };
        saveUserToStorage(result);
        return result;
      }
      case SET_OWN_PROPOSAL: {
        console.log(`SET_OWN_PROPOSAL ${action.challengeId}`);

        let myChallenges = state.challenges; // this is the challenges object in user
        if (!myChallenges) myChallenges = {};
        let myChallenge = myChallenges[action.challengeId];
        if (!myChallenge) {
          myChallenge = {};
        }
        myChallenge.ownProposal = action.answer;
        myChallenges[action.challengeId] = myChallenge;
        const result = {
          ...state,
          challenges: myChallenges,
        };
        saveUserToStorage(result);
        return result;
      }
      case POST_PROPOSAL: {
        console.log('Reducer: POST_PROPOSAL');
        let myChallenges = state.challenges; // this is the challenges object in user
        if (!myChallenges) myChallenges = {};
        let myChallenge = myChallenges[action.challengeId];
        if (!myChallenge) {
          myChallenge = {};
        }
        myChallenge.isLoading = true;
        myChallenge.isInternalLoading = true;
        myChallenges[action.challengeId] = myChallenge;
        const result = {
          ...state,
          challenges: myChallenges,
        };
        return result;
      }
      case SUCCESS_POST_PROPOSAL: {
        console.log('user reducer: SUCESS_POST_PROPOSAL');

        let myChallenges = state.challenges;
        if (!myChallenges) myChallenges = {};
        let myChallenge = state.challenges[action.action.body.challenge_id];
        if (!myChallenge) {
          myChallenge = {};
        }
        myChallenge.ownProposalId = action.result.proposal._id;
        myChallenge.isLoading = false;
        myChallenge.isInternalLoading = false;
        myChallenge.ownProposalInReview = { bool: true };
        myChallenge.ownProposalBlocked = { bool: false };
        myChallenge.ownProposal = action.result.proposal.text;
        myChallenges[action.action.body.challenge_id] = myChallenge;

        const result = {
          ...state,
          challenges: { ...myChallenges },
        };
        saveUserToStorage(result);

        return result;
      }
      case NETWORK_ERROR_POST_PROPOSAL: {
        console.log('Reducer: NETWORK_ERROR_POST_PROPOSAL');
        let myChallenges = state.challenges;
        if (!myChallenges) myChallenges = {};
        let myChallenge = state.challenges[action.action.body.challenge_id];
        if (!myChallenge) {
          myChallenge = {};
        }
        // myChallenge.ownProposalId = action.result.proposal._id;
        myChallenge.isLoading = false;
        myChallenge.isInternalLoading = false;
        myChallenges[action.action.body.challenge_id] = myChallenge;
        myChallenge.ownProposalInReview = { bool: true };
        myChallenge.ownProposalBlocked = { bool: false };
        const result = {
          ...state,
          challenges: myChallenges,
        };

        return result;
      }
      case LOAD_PROPOSAL: {
        console.log('LOAD_PROPOSAL');

        const myChallenges = state.challenges;
        const myChallenge = state.challenges[action.challengeId];
        myChallenge.isLoading = true;
        if (!isEmpty(myChallenge.ownProposalBlocked) && !isEmpty(myChallenge.ownProposalInReview)) {
          myChallenge.isLoading = !action.quietLoading;
        } else {
          myChallenge.isLoading = true;
        }
        myChallenge.isInternalLoading = true;

        myChallenges[action.challengeId] = myChallenge;

        const result = {
          ...state,
          challenges: { ...myChallenges },
        };
        return result;
      }
      case SUCCESS_LOAD_PROPOSAL: {
        console.log('SUCCESS_LOAD_PROPOSAL');
        const myChallenges = state.challenges;
        const myChallenge = state.challenges[action.action.challengeId];
        const myProposal = action.result.proposals[0];
        myChallenge.ownProposal = myProposal.text;
        myChallenge.isLoading = false;
        myChallenge.isInternalLoading = false;
        myChallenge.ownProposalInReview = { bool: myProposal.in_review };
        myChallenge.ownProposalBlocked = { bool: myProposal.blocked };
        myChallenge.rank = myProposal.rank;
        const votes = state.votes;
        let offsetYes = 0;
        let offsetNo = 0;
        if (votes[myProposal._id]) {
          if (votes[myProposal._id].bool) {
            offsetYes -= 1;
          } else {
            offsetNo -= 1;
          }
        }

        myChallenge.yes = myProposal.yes_votes + offsetYes;
        myChallenge.no = myProposal.no_votes + offsetNo;
        myChallenges[action.action.challengeId] = myChallenge;

        const result = {
          ...state,
          challenges: { ...myChallenges },
        };
        saveUserToStorage(result);
        return result;
      }
      case NETWORK_ERROR_LOAD_PROPOSAL: {
        console.log('NETWORK_ERROR_LOAD_PROPOSAL');
        const myChallenges = state.challenges;
        const myChallenge = state.challenges[action.action.challengeId];

        myChallenge.isLoading = false;
        myChallenge.isInternalLoading = false;
        myChallenge.ownProposalInReview = null;
        myChallenge.ownProposalBlocked = null;
        myChallenge.ownProposal = null;
        myChallenges[action.action.challengeId] = myChallenge;

        const result = {
          ...state,
          challenges: myChallenges,
        };
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
