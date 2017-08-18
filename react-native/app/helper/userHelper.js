import {
  setUserId,
  setUserCoordinates,
  setUserPrimaryLetter,
  setUserSecondaryLetters,
  putLetterOnMap,
  updateLetterMenu,
  wipeLetterMenu,
  deleteLetters,
} from '../actions/user';

import store from '../config/store';

export function deleteLettersProxy() {
  store.dispatch(deleteLetters());
}

export function updateLetterMenuProxy(menuIndex) {
  store.dispatch(updateLetterMenu(menuIndex));
}

export function wipeLetterMenuProxy() {
  store.dispatch(wipeLetterMenu());
};
