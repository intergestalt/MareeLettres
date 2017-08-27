import {
  changeMapRegion,
  putLetterOnMap,
  loadMyLetters,
  setUserCoordinates,
} from '../actions/map';

import store from '../config/store';

export function changeMapRegionProxy(region) {
  store.dispatch(changeMapRegion(region));
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
