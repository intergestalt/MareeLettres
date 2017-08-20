import { OriginId } from 'maree-lettres-shared';
import { PROPOSAL_LIST_MODES, CHALLENGE_VIEWS, PROPOSAL_VIEWS } from '../consts';

const sampleDate = (new Date()).toUTCString();
const lat = 52.4972;
const lng = 13.4377;
const latDelta = 0.001;
const lngDelta = 0.001;

export default {
  user: {
    origin_id: OriginId.generateFromDeviceId(Expo.Constants.deviceId),
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
      character: 'X',
      acquired_at: sampleDate,
      last_used_at: sampleDate,
    },
    secondary_letters: [{
        character: 'A',
        acquired_at: sampleDate,
        last_used_at: sampleDate,
      },{
        character: 'B',
        acquired_at: sampleDate,
        last_used_at: sampleDate,
      },{
        character: 'C',
        acquired_at: sampleDate,
        last_used_at: sampleDate,
      },{
        character: 'D',
        acquired_at: sampleDate,
        last_used_at: sampleDate,
      },
    ],
    votes: [{
      proposal_id: 'my_proposal',
      bool: true,
    }],
    banned: false,
  },

  globals: {
    language: 'fr',
    proposalView: PROPOSAL_VIEWS.LIST,
    proposalListMode: PROPOSAL_LIST_MODES.MOST,
    challengeView: CHALLENGE_VIEWS.LIST,
  },

  challenges: {
    selectedChallengeId: null,
    selectedChallengeIndex: -1,
    isLoading: false,
    isError: false,
    isInternalLoading: false,
    time: 0,
    challenges: [],
  },

  challengesTicker: {},

  proposals: {},

  content: {
    isLoading: false,
    isInternalLoading: false,
    isError: false,
    time: 0,
    content: {},
  },

  letters: {
    isLoading: false,
    isInternalLoading: false,
    isError: false,
    content: [],
  },

  myLetters: {
    isLoading: false,
    isError: false,
    content: [],
  }
  //"_id": "pgYw8TzdLc8NQfdzw",
  //"character": "C",
  //"coords": {
  //    "lat": 52.47469235825353,
  //    "lng": 13.479836201593281
  //}
};
