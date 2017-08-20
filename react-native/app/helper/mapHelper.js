import {
  changeMapRegion,
  putLetterOnMap
} from '../actions/map';

import store from '../config/store';

export function changeMapRegionProxy(region) {
  store.dispatch(changeMapRegion(region))
}

export function putLetterOnMapProxy(character) {
  store.dispatch(putLetterOnMap(character))
}
