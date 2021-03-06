export const CHANGE_MAP_REGION = 'CHANGE_MAP_REGION';
export const PUT_LETTER_ON_MAP = 'PUT_LETTER_ON_MAP';
export const PUT_LETTER_ERROR = 'PUT_LETTER_ERROR';
export const LOAD_MY_LETTERS = 'LOAD_MY_LETTERS';
export const SET_MY_LETTERS = 'SET_MY_LETTERS';
export const CLEAR_MY_LETTERS = 'CLEAR_MY_LETTERS';
export const SET_MY_LETTERS_IS_LOADING_FROM_STORAGE = 'SET_MY_LETTERS_IS_LOADING_FROM_STORAGE';
export const USER_SET_COORDINATES = 'USER_SET_COORDINATES';
export const CHANGE_MAP_LAYOUT = 'CHANGE_MAP_LAYOUT';

export const clearMyLetters = () => ({
  type: CLEAR_MY_LETTERS,
})

export const loadMyLetters = () => ({
  type: LOAD_MY_LETTERS,
});

export const changeMapRegion = region => ({
  type: CHANGE_MAP_REGION,
  region,
});

export const changeMapLayout = layout => ({
  type: CHANGE_MAP_LAYOUT,
  layout,
});

export const setUserCoordinates = (lat, lng) => ({
  type: USER_SET_COORDINATES,
  lat,
  lng,
});

export const putLetterOnMap = (character, x, y) => ({
  type: PUT_LETTER_ON_MAP,
  character,
  x,
  y,
});
export const setMyLetters = myLetters => ({
  type: SET_MY_LETTERS,
  myLetters,
});

export const setMyLettersIsLoadingFromStorage = yes => ({
  type: SET_MY_LETTERS_IS_LOADING_FROM_STORAGE,
  yes,
});
