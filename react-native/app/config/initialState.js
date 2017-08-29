import Expo from 'expo';
import { OriginId, systemConfigInitial } from 'maree-lettres-shared';

import { PROPOSAL_LIST_MODES, CHALLENGE_VIEWS, PROPOSAL_VIEWS } from '../consts';

// for testing

const originId = OriginId.generateFromDeviceId(Expo.Constants.deviceId);
const sampleDate = new Date().toISOString();
const lat = 48.8566;
const lng = 2.3522;
const latDelta = 0.0008;
const lngDelta = 0.0008;
const dropZoneRadius = 30;

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
      dropzone_radius: dropZoneRadius,
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
        character: 'A',
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
    isError: false,
    isInternalLoading: false,
    time: 0,
    challenges: [],
  },

  systemConfig: systemConfigInitial,

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
  },
};
