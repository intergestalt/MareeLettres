import {
  putLetterOnMap,
} from '../actions/letters';

import store from '../config/store';

export function putLetterOnMapProxy(character, user) {
  store.dispatch(putLetterOnMap(character, user))
}
