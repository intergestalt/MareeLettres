import { callLoadUser, callSendUserVotes } from '../helper/apiCalls';

export const LOAD_USER = 'LOAD_USER';
export const SET_USER = 'SET_USER';
export const USER_LOADED = 'USER_LOADED';
export const LOAD_USER_ERROR = 'LOAD_USER_ERROR';
export const USER_SET_ID = 'USER_SET_ID';
export const USER_SET_COORDINATES = 'USER_SET_COORDINATES';
export const USER_SET_PRIMARY_LETTER = 'USER_SET_PRIMARY_LETTER';
export const USER_SET_SECONDARY_LETTERS = 'USER_SET_SECONDARY_LETTERS';
export const USER_DELETE_LETTERS = 'USER_DELETE_LETTERS';
export const USER_LETTER_TO_MAP = 'USER_PUT_LETTER_ON_MAP';
export const USER_UPDATE_ERROR = 'USER_UPDATE_ERROR';
export const USER_UPDATE_LETTER_MENU = 'USER_UPDATE_LETTER_MENU';
export const USER_WIPE_LETTER_MENU = 'USER_WIPE_LETTER_MENU';
export const USER_GET_LETTER = 'USER_GET_LETTER';
export const USER_REVIVE_LETTER_MENU = 'USER_REVIVE_LETTER_MENU';
export const USER_BIN_LETTER = 'USER_BIN_LETTER';

export const USER_VOTE_INTERNAL = 'USER_VOTE_INTERNAL';
export const USER_SEND_INTERNAL_VOTES = 'USER_SEND_INTERNAL_VOTES';
export const USER_INTERNAL_VOTES_SENT = 'USER_INTERNAL_VOTES_SENT';
export const USER_SEND_INTERNAL_VOTES_ERROR = 'USER_SEND_INTERNAL_VOTES_ERROR';
export const SET_USER_IS_LOADING_FROM_STORAGE = 'SET_USER_IS_LOADING_FROM_STORAGE';
export const SET_USER_LOADED_FROM_STORAGE = 'SET_USER_LOADED_FROM_STORAGE';

export const setUser = user => ({
  type: SET_USER,
  user,
});

export const loadUser = originId => ({
  type: LOAD_USER,
  successEvent: USER_LOADED,
  errorEvent: LOAD_USER_ERROR,
  apiCall: callLoadUser,
  originId,
});
export const setUserIsLoadingFromStorage = yes => ({
  type: SET_USER_IS_LOADING_FROM_STORAGE,
  yes,
});
export const setUserLoadedFromStorage = yes => ({
  type: SET_USER_LOADED_FROM_STORAGE,
  yes,
});
export const getUserLetter = () => ({
  type: USER_GET_LETTER,
  errorEvent: USER_UPDATE_ERROR,
});

export const setUserId = () => ({
  type: USER_SET_ID,
  errorEvent: USER_UPDATE_ERROR,
});

export const setUserCoordinates = () => ({
  type: USER_SET_COORDINATES,
  errorEvent: USER_UPDATE_ERROR,
});

export const setUserPrimaryLetter = () => ({
  type: USER_SET_PRIMARY_LETTER,
  errorEvent: USER_UPDATE_ERROR,
});

export const setUserSecondaryLetters = () => ({
  type: USER_SET_SECONDARY_LETTERS,
  errorEvent: USER_UPDATE_ERROR,
});

export const deleteLetters = () => ({
  type: USER_DELETE_LETTERS,
  errorEvent: USER_UPDATE_ERROR,
});

export const updateLetterMenu = menuIndex => ({
  type: USER_UPDATE_LETTER_MENU,
  errorEvent: USER_UPDATE_ERROR,
  menuIndex,
});

export const reviveLetterMenu = (menuIndex, character) => ({
  type: USER_REVIVE_LETTER_MENU,
  errorEvent: USER_UPDATE_ERROR,
  menuIndex,
  character,
});

export const binLetter = menuIndex => ({
  type: USER_BIN_LETTER,
  errorEvent: USER_UPDATE_ERROR,
  menuIndex,
});

export const wipeLetterMenu = () => ({
  type: USER_WIPE_LETTER_MENU,
  error: USER_UPDATE_ERROR,
});

// Voteing

export const userVoteInternal = (proposalId, yes) => ({
  type: USER_VOTE_INTERNAL,
  proposalId,
  yes,
});

export const userSendInternalVotes = (originId, internalVotes) => ({
  type: USER_SEND_INTERNAL_VOTES,
  successEvent: USER_INTERNAL_VOTES_SENT,
  errorEvent: USER_SEND_INTERNAL_VOTES_ERROR,
  apiCall: callSendUserVotes,
  originId,
  internalVotes,
});
