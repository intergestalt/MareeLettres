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
  proxyLetterPosition,
  proxyLetterCharacter,
  addFriendLetter,
  setUserMapTutorialStatus,
} from '../actions/user';

import store from '../config/store';

export function proxyLetterPositionProxy(x, y) {
  store.dispatch(proxyLetterPosition(x, y));
}

export function proxyLetterCharacterProxy(char) {
  store.dispatch(proxyLetterCharacter(char));
}

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

export function addFriendLetterProxy(character) {
  store.dispatch(addFriendLetter(character))
}

export function wipeLetterMenuProxy() {
  store.dispatch(wipeLetterMenu());
}

export function setUserLetterProxy(char) {
  store.dispatch(setUserLetter(char));
}

export function setUserMapTutorialStatusProxy(char) {
  store.dispatch(setUserMapTutorialStatus(char));
}
