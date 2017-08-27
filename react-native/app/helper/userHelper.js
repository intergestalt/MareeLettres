import {
  setUserId,
  setUserCoordinates,
  setUserPrimaryLetter,
  setUserSecondaryLetters,
  putLetterOnMap,
  updateLetterMenu,
  reviveLetterMenu,
  wipeLetterMenu,
  deleteLetters,
  setUserLetter,
  binLetter,
} from '../actions/user';

import store from '../config/store';

export function deleteLettersProxy() {
  store.dispatch(deleteLetters());
}

export function binLetterProxy(menuIndex) {
  store.dispatch(binLetter(menuIndex));
}

export function updateLetterMenuProxy(menuIndex) {
  store.dispatch(updateLetterMenu(menuIndex));
}

export function reviveLetterMenuProxy(menuIndex, character) {
  store.dispatch(reviveLetterMenu(menuIndex, character));
}

export function wipeLetterMenuProxy() {
  store.dispatch(wipeLetterMenu());
}

export function setUserLetterProxy(char) {
  store.dispatch(setUserLetter(char));
}
