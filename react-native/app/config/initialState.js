import { VOTE_VIEWS } from '../consts';

// NOTE:
// generateFromDeviceId
// import { OriginId } from 'maree-lettres-shared';

export default {
  user: {
    id: 'user_1337',
    letter: 'X',
    isAssignedLetter: false,
  },
  globals: {
    language: 'fr',
    isTinder: false,
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
  content: {
    isLoading: false,
    isLoaded: false,
    isError: false,
    time: null,
    content: [],
  },
  proposals: {},

  letters: {
    isLoading: false,
    isError: false,
    content: [],
  },
};
