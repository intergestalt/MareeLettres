export const USER_SET_ID = 'USER_SET_ID';
export const USER_SET_COORDINATES = 'USER_SET_COORDINATES';
export const USER_SET_PRIMARY_LETTER = 'USER_SET_PRIMARY_LETTER';
export const USER_SET_SECONDARY_LETTERS = 'USER_SET_SECONDARY_LETTERS';
export const USER_DELETE_LETTERS = 'USER_DELETE_LETTERS';
export const USER_UPDATE_ERROR = 'USER_UPDATE_ERROR';

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
})
