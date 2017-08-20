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
  getUserLetter,
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
};

export function getUserLetterProxy() {
  console.log('proxy user letter')
  store.dispatch(getUserLetter());
};
