import { OriginId } from 'maree-lettres-shared';

import { PROPOSAL_LIST_MODES, CHALLENGE_VIEWS, PROPOSAL_VIEWS } from '../consts';

export default {
  user: {
    id: OriginId.generateFromDeviceId('device-id-here'), // TODO: get a uid from device
    letter: 'X',
    isAssignedLetter: false,
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
};
