import { takeEvery, call, put } from 'redux-saga/effects';
import { LOAD_CHALLENGES, NETWORK_ERROR, CHALLENGES_LOADED } from '../actions/services/challenges';
import config from '../config/config';

export const callAllChallenges = () => {
  console.log('Load Data');
  const url = `${config.API_PREFIX}challenges/`;
  console.log(url);
  return fetch(url);
};

function* loadData(func) {
  try {
    const response = yield call(func);
    const result = yield response.json();
    if (result.error) {
      yield put({ type: NETWORK_ERROR, error: result.error });
    } else {
      yield put({ type: CHALLENGES_LOADED, result });
    }
  } catch (error) {
    yield put({ type: NETWORK_ERROR, error: error.message });
  }
}

export default function* rootSaga() {
  yield takeEvery(LOAD_CHALLENGES, loadData, callAllChallenges);
}
