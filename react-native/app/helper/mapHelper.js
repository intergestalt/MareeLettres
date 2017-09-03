import {
  changeMapRegion,
  changeMapLayout,
  putLetterOnMap,
  loadMyLetters,
  setUserCoordinates,
  clearMyLetters
} from '../actions/map';

import store from '../config/store';

export function clearMyLettersProxy() {
  store.dispatch(clearMyLetters());
}

export function changeMapRegionProxy(region) {
  store.dispatch(changeMapRegion(region));
}

export function changeMapLayoutProxy(layout) {
  store.dispatch(changeMapLayout(layout));
}

export function putLetterOnMapProxy(character, x, y) {
  store.dispatch(putLetterOnMap(character, x, y));
}

export function loadMyLettersProxy() {
  store.dispatch(loadMyLetters());
}

export function setUserCoordinatesProxy(lat, lng) {
  store.dispatch(setUserCoordinates(lat, lng));
}
