import {
  changeMapRegion,
  putLetterOnMap,
  loadMyLetters,
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
