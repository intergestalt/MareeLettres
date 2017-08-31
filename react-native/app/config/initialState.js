import Expo from 'expo';
import { OriginId /* , systemConfigInitial */ } from 'maree-lettres-shared';

import { PROPOSAL_LIST_MODES, CHALLENGE_VIEWS, PROPOSAL_VIEWS } from '../consts';

const originId = OriginId.generateFromDeviceId(Expo.Constants.deviceId);
const sampleDate = new Date().toISOString();

export default {
  config: {
    isLoading: false,
    isInternalLoading: false,
    currentConfig: null,
    config: {
      name: 'default',
      proposals_auto_accept: true,
      track_player_movements: true,
      tinder_proposals_regeneration_interval: 300,
      map_update_interval: 10,
      map_update_latency: 2,
      map_cache_update_interval: 10,
      map_query_update_latency: 1,
      map_letter_decay_time: 30,
      map_letter_regeneration_time_primary: 5,
      map_letter_regeneration_time_secondary: 5,
      map_letter_transfer_timeout: 60,
      map_drop_zone_radius: 10,
      map_min_zoom_level: 0,
      map_max_zoom_level: 20,
      map_letter_base_size: 5,

      map_delta_initial: 2, // multiplies map_drop_zone_radius. when delta = 1, dropzone touches edges of screen
      map_delta_max: 14, // delta at which letters cannot be placed or seen

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
    },
  },
  globals: {
    globalsIsLoadingFromStorage: false,
    isNetworkError: false,
    networkErrorMessageKey: null,
    language: null,
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
      dropzone_radius: 10,
      coordinates: {
        latitude: 48.8566,
        longitude: 2.3522,
        latitudeDelta: 0.0004,
        longitudeDelta: 0.0004,
      },
      letters_selected: {
        mine: false,
        friends: [false, false, false, false],
      },
      tutorialStatus: 'welcome'
    },
    primary_letter: {
      _id: originId,
      character: '+',
      acquired_at: sampleDate,
      last_used_at: sampleDate,
    },
    secondary_letters: [
      /*{
        character: 'A',
        acquired_at: sampleDate,
        last_used_at: sampleDate,
      },*/
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
    content: {},
  },

  myLetters: {
    isLoading: false,
    content: {},
  },
};
