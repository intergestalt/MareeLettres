import Expo from 'expo';
import { OriginId } from 'maree-lettres-shared';
import { PROPOSAL_LIST_MODES, CHALLENGE_VIEWS, PROPOSAL_VIEWS } from '../consts';

// for testing

const originId = OriginId.generateFromDeviceId(Expo.Constants.deviceId);
const sampleDate = new Date().toISOString();
const lat = 52.4972;
const lng = 13.4377;
const latDelta = 0.001;
const lngDelta = 0.001;

// NOTE:
// when slicing the state in a reducer, the reducer will change the key name
//
// EXAMPLE:
//
//    initialState = { key: 'my_value' };
//    const myReducer = (state = initialState.key, action) => {
//       ...etc
//      return state;
//    }
//    newState = { myReducer: 'my_value' }

export default {
  globals: {
    globalsIsLoadingFromStorage: false,
    language: null,
  },

  user: {
    userIsLoadingFromStorage: false,
    userLoadedFromStorage: false,
    origin_id: originId,
    created_at: sampleDate,
    last_seen: sampleDate,
    coordinates: {
      latitude: lat,
      longitude: lng,
      latitudeDelta: latDelta,
      longitudeDelta: lngDelta,
    },
    map: {
      dropzone_radius: 30,
      coordinates: {
        latitude: lat,
        longitude: lng,
        latitudeDelta: latDelta,
        longitudeDelta: lngDelta,
      },
      letters_selected: {
        mine: false,
        friends: [false, false, false, false],
      },
    },
    primary_letter: {
      _id: originId,
      character: '...',
      acquired_at: sampleDate,
      last_used_at: sampleDate,
    },
    secondary_letters: [
      {
        character: 'L',
        acquired_at: sampleDate,
        last_used_at: sampleDate,
      },
      {
        character: 'O',
        acquired_at: sampleDate,
        last_used_at: sampleDate,
      },
      {
        character: 'V',
        acquired_at: sampleDate,
        last_used_at: sampleDate,
      },
      {
        character: 'E',
        acquired_at: sampleDate,
        last_used_at: sampleDate,
      },
    ],
    votes: {},
    internalVotes: {
      isInternalLoading: false,
      internalVotes: {},
    },
    banned: false,
  },

  challenges: {
    challengeView: CHALLENGE_VIEWS.LIST,
    proposalView: PROPOSAL_VIEWS.LIST,
    proposalListMode: PROPOSAL_LIST_MODES.MOST,
    selectedChallengeId: null,
    selectedChallengeIndex: -1,
    isLoading: false,
    isInternalLoading: false,
    time: 0,
    challenges: [],
  },

  challengesTicker: {},

  proposals: {},

  content: {
    isLoading: false,
    isInternalLoading: false,
    time: 0,
    content: {},
  },

  letters: {
    isLoading: false,
    isInternalLoading: false,
    content: [],
  },

  myLetters: {
    isLoading: false,
    content: [],
  },
  // "_id": "pgYw8TzdLc8NQfdzw",
  // "character": "C",
  // "coords": {
  //    "lat": 52.47469235825353,
  //    "lng": 13.479836201593281
  // }
};
