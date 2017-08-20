import {
  USER_SET_ID,
  USER_SET_COORDINATES,
  USER_SET_SECONDARY_LETTERS,
  USER_SET_PRIMARY_LETTER,
  USER_DELETE_LETTERS,
  USER_UPDATE_LETTER_MENU,
  USER_WIPE_LETTER_MENU,
  USER_UPDATE_ERROR,
  USER_GET_LETTER,
} from '../actions/user';

import {
  CHANGE_MAP_REGION
} from '../actions/map';

import initialState from '../config/initialState';

const selectMenuItem = (state, index) => {
  if (index < 0) {
    return state;
  } else {
    let newFriends = [ ...state.map.letters_selected.friends ];
    newFriends[index] = true;

    return {
      ...state,
      map: {
        ...state.map,
        letters_selected: {
          mine: state.map.letters_selected.mine,
          friends: newFriends,
        }
      }
    }
  }
};

export default (state = initialState.user, action) => {
  switch (action.type) {
    case CHANGE_MAP_REGION:
      console.log('Reducer: CHANGE_MAP_REGION');
      return {
        ...state,
        map: {
          ...state.map,
          coordinates: action.region,
        },
      };

    case USER_GET_LETTER:
      console.log('Reducer: USER_GET_LETTER');

      // get random letter for now
      // TODO: replace with keyboard component
      let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      let char = letters[Math.floor(Math.random() * 26)];
      return {
        ...state,
        primary_letter: {
          ...state.primary_letter,
          character: char,
        }
      }

    case USER_UPDATE_LETTER_MENU:
      console.log('Reducer: USER_UPDATE_LETTER_MENU');
      return selectMenuItem(state, action.menuIndex);

    case USER_WIPE_LETTER_MENU:
      console.log('Reducer: USER_WIPE_LETTER_MENU');
      return {
        ...state,
        map: {
          ...state.map,
          lettersSelected: {
            mine: false,
            friends: [false, false, false, false],
          }
        }
      }

    case USER_SET_ID:
      console.log('Reducer: USER_SET_ID');
      return state;

    case USER_SET_COORDINATES:
      console.log('Reducer: USER_SET_COORDINATES');
      return state;

    case USER_SET_PRIMARY_LETTER:
      console.log('Reducer: USER_SET_PRIMARY_LETTER');
      return state;

    case USER_SET_SECONDARY_LETTERS:
      console.log('Reducer: USER_SET_SECONDARY_LETTERS');
      return state;

    case USER_DELETE_LETTERS:
      console.log('Reducer: USER_DELETE_LETTERS');
      return {
        ...state,
        secondary_letters: [],
      };

    case USER_UPDATE_ERROR:
      console.log('Reducer: USER_UPDATE_ERROR')
      return state;

    default:
      return state;
  }
};
