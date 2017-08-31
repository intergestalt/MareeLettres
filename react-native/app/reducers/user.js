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
  // SET_USER_LOADED_FROM_STORAGE_RESET_DEFAULTS,
} from '../actions/user';

import { CHANGE_MAP_REGION, USER_SET_COORDINATES } from '../actions/map';

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

      /* case SET_USER_LOADED_FROM_STORAGE_RESET_DEFAULTS: {
        // reset values that were on a timeout when app closed

        console.log('Reducer: SET_USER_LOADED_FROM_STORAGE_RESET_DEFAULTS');
        return {
          ...state,
          map: {
            ...state.map,
            letters_selected: {
              ...state.map.letters_selected,
              mine: false,
              friends: [false, false, false, false],
            },
          },
        };
      } */

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

      case USER_ADD_FRIEND_LETTER: {
        console.log('Reducer: USER_ADD_FRIEND_LETTER');

        // prevent bad characters, TODO: remove (API res trusted)
        if (!action.character.match(/[a-z]/i)) {
          return state;
        }

        const letters = [...state.secondary_letters];
        letters.unshift({
          character: action.character,
          acquired_at: new Date().toISOString,
          last_used_at: new Date().toISOString,
        });

        // delete extra letters
        letters.splice(4, 4);

        return {
          ...state,
          secondary_letters: [...letters],
        };
      }

      case USER_GET_LETTER: {
        console.log('Reducer: USER_GET_LETTER');

        const char = action.character; 
        const result = {
          ...state,
          primary_letter: {
            ...state.primary_letter,
            character: char,
          },
        };
        saveUserToStorage(result);
        return result;
      }
      case USER_UPDATE_LETTER_MENU: {
        console.log('Reducer: USER_UPDATE_LETTER_MENU');

        if (action.menuIndex < 0) {
          return state;
        }
        const newFriends = [...state.map.letters_selected.friends];
        newFriends[action.menuIndex] = true;

        const result = {
          ...state,
          map: {
            ...state.map,
            letters_selected: {
              mine: state.map.letters_selected.mine,
              friends: newFriends,
            },
          },
        };
        saveUserToStorage(result);
        return result;
      }
      case USER_REVIVE_LETTER_MENU: {
        console.log('Reducer: USER_REVIVE_LETTER_MENU');

        const letters = state.secondary_letters;
        const friends = [...state.map.letters_selected.friends];

        if (
          letters.length > action.menuIndex &&
          letters[action.menuIndex].character === action.character
        ) {
          friends[action.menuIndex] = false;
        } else {
          // case user deletes a letter (altering index)
          // TODO: change key to transaction_id when it's implemented

          for (let i = 0; i < letters.length; i += 1) {
            if (i < 4 && letters[i].character === action.character) {
              friends[i] = false;
            }
          }
        }

        const result = {
          ...state,
          map: {
            ...state.map,
            letters_selected: {
              ...state.map.letters_selected,
              friends,
            },
          },
        };
        saveUserToStorage(result);
        return result;
      }

      case USER_BIN_LETTER: {
        console.log('Reducer: USER_BIN_LETTER');

        const letters = [...state.secondary_letters];
        const newLetters = [];

        for (let i = 0; i < letters.length; i += 1) {
          if (i !== action.menuIndex) {
            newLetters.push(letters[i]);
          }
        }

        const result = {
          ...state,
          secondary_letters: [...newLetters],
        };
        saveUserToStorage(result);
        return result;
      }

      case USER_WIPE_LETTER_MENU: {
        console.log('Reducer: USER_WIPE_LETTER_MENU');
        const result = {
          ...state,
          map: {
            ...state.map,
            lettersSelected: {
              mine: false,
              friends: [false, false, false, false],
            },
          },
        };
        saveUserToStorage(result);
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

      case USER_SET_PRIMARY_LETTER:
        console.log('Reducer: USER_SET_PRIMARY_LETTER');
        return state;

      case USER_SET_SECONDARY_LETTERS:
        console.log('Reducer: USER_SET_SECONDARY_LETTERS');
        return state;

      case USER_DELETE_LETTERS: {
        console.log('Reducer: USER_DELETE_LETTERS');
        const result = {
          ...state,
          secondary_letters: [],
        };
        saveUserToStorage(result);
        return result;
      }
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
            tutorialStatus: action.status
          },
        };
        console.log(result);
        saveUserToStorage(result);
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
