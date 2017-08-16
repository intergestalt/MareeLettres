import { VOTE_VIEWS } from '../consts';

import { OriginId } from 'maree-lettres-shared';

export default {
  user: {
    id: OriginId.generateFromDeviceId('device-id-here'), // TODO: get a uid from device
    letter: 'X',
  },
  globals: {
    language: 'fr',
    isTinder: true,
    listMode: 0,
    voteView: VOTE_VIEWS.LIST,
  },

  challenges: {
    selectedChallengeId: null,
    selectedChallengeIndex: -1,
    isLoading: true,
    isError: false,
    time: null,
    challenges: [],
  },
  challengesTicker: {},
  proposals: {},

  content: {
    isLoading: false,
    isLoaded: false,
    isError: false,
    time: null,
    content: [],
  },

  letters: {
    isLoading: false,
    isError: false,
    content: [],
  },
};
