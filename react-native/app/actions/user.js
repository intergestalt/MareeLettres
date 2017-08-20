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

export const updateLetterMenu = (menuIndex) => ({
  type: USER_UPDATE_LETTER_MENU,
  errorEvent: USER_UPDATE_ERROR,
  menuIndex: menuIndex,
});

export const reviveLetterMenu = (menuIndex, character) => ({
  type: USER_REVIVE_LETTER_MENU,
  errorEvent: USER_UPDATE_ERROR,
  menuIndex: menuIndex,
  character: character
});


export const wipeLetterMenu = () => ({
  type: USER_WIPE_LETTER_MENU,
  error: USER_UPDATE_ERROR,
});
