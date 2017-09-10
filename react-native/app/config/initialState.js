import Expo from 'expo';
import { OriginId, systemConfigInitial } from 'maree-lettres-shared';

import { CHALLENGE_VIEWS, SCREENS, MAP_VIEWS } from '../consts';

const originId = OriginId.generateFromDeviceId(Expo.Constants.deviceId);
const sampleDate = new Date().toISOString();

console.log('initial config: ', systemConfigInitial);

export default {
  config: {
    isLoading: false,
    isInternalLoading: false,
    currentConfig: null,
    config: {
      // systemConfigInitial
      // see shared/maree-lettres-shared/src/config/defaultSystemConfig for values and info
      //
      // to add or change something:
      // $ cd shared/maree-lettres-shared/
      // [ edit src/config/defaultSystemConfig ]
      // $ yarn run build
      // $ yarn run install-app
      ...systemConfigInitial,

      // Not sent by API, but they are not overwrittem
      request_timeout: 10000,
      delay_config_call: 5000,

      default_proposal_list_limit: 10,
      default_proposal_new_batch: 30, // For List reload, if scrolling reached ends
      proposal_reload_list_offset: 0.8,
      default_proposal_tinder_limit: 30,
      proposal_reload_tinder_offset: 10,
      internal_votes_offset: 9,

      // Proposals
      // On Press of the list types or list vs tinder button
      load_quiet_challenge_selector: { bool: true },
      // On Press on the challenge List.
      load_quiet_to_challenge_selector: { bool: true },
      load_quiet_pull_down_update: { bool: true },
      load_quiet_pull_up_update: { bool: true },
      load_quiet_tinder: { bool: true },
      load_quiet_challenges_list: { bool: true },

      update_challenges_after: 100000,
      update_proposals_after: 100000,
      update_content_after: 100000,
      send_internal_votes_after: 10000,

      display_next_network_error_after: 30000,
    },
  },
  globals: {
    globalsIsLoadingFromStorage: false,
    isNetworkError: false,
    networkErrorMessageKey: null,
    language: null,
    screen: SCREENS.VOTE,
    mapView: MAP_VIEWS.OVERVIEW,
    showAllFinishedChallenges: false,
  },

  user: {
    isDefaultUser: true,
    userIsLoadingFromStorage: false,
    userLoadedFromStorage: false,
    origin_id: originId,
    created_at: sampleDate,
    last_seen: sampleDate,
    coordinates: {
      latitude: 48.8566,
      longitude: 2.3522,
      latitudeDelta: 0.0004,
      longitudeDelta: 0.0004,
    },
    map: {
      coordinates: {
        latitude: 48.8566,
        longitude: 2.3522,
        latitudeDelta: 0.0004,
        longitudeDelta: 0.0004,
      },
      tutorialStatus: 'welcome',
      maxMarkers: 200,
    },
    primary_letter: {
      _id: originId,
      character: '+',
      acquired_at: sampleDate,
      last_used_at: sampleDate,
      disabled: false,
    },
    secondary_letter_1: {
      character: '',
      disabled: false,
      overwrite: false,
    },
    secondary_letter_2: {
      character: '',
      disabled: false,
      overwrite: false,
    },
    secondary_letter_3: {
      character: '',
      disabled: false,
      overwrite: false,
    },
    secondary_letter_4: {
      character: '',
      disabled: false,
      overwrite: false,
    },
    votes: {},
    internalVotes: {
      isInternalLoading: false,
      internalVotes: {},
    },
    banned: false,
  },

  challenges: {
    challengeView: CHALLENGE_VIEWS.LIST,
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

  stream: {
    token: false,
    isLoading: false,
    isError: false,
    content: [],
  },

  letters: {
    isLoading: false,
    isInternalLoading: false,
    content: {},
  },

  myLetters: {
    isLoading: false,
    content: {},
  },
};
