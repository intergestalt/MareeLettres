
export const CHANGE_MAP_REGION = 'CHANGE_MAP_REGION';
export const PUT_LETTER_ON_MAP = 'PUT_LETTER_ON_MAP';
export const PUT_LETTER_ERROR = 'PUT_LETTER_ERROR';
export const LOAD_MY_LETTERS = 'LOAD_MY_LETTERS';
export const USER_SET_COORDINATES = 'USER_SET_COORDINATES';

export const loadMyLetters = () => ({
  type: LOAD_MY_LETTERS,
});

export const changeMapRegion = (region) => ({
  type: CHANGE_MAP_REGION,
  region: region,
});

export const setUserCoordinates = (lat, lng) => ({
  type: USER_SET_COORDINATES,
  lat: lat,
  lng: lng,
});

export const putLetterOnMap = (character, x, y) => ({
  type: PUT_LETTER_ON_MAP,
  character: character,
  x: x,
  y: y,
});
