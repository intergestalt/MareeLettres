import { takeEvery, call, put } from 'redux-saga/effects';
import {
  LOAD_CHALLENGES,
  NETWORK_ERROR_LOAD_CHALLENGES,
  CHALLENGES_LOADED,
} from '../actions/services/challenges';
import {
  LOAD_PROPOSALS,
  PROPOSALS_LOADED,
  NETWORK_ERROR_LOAD_PROPOSALS,
} from '../actions/services/proposals';
import {
  LOAD_CONTENT,
  CONTENT_LOADED,
  NETWORK_ERROR_LOAD_CONTENT,
} from '../actions/services/content';

import config from '../config/config';

export const callAllChallenges = () => {
  console.log('Load Challenges');
  const url = `${config.API_PREFIX}challenges/`;
  console.log(url);
  return fetch(url);
};
export const callProposals = () => {
  console.log('Load Proposals');
  const url = `${config.API_PREFIX}proposals?limit=15/`;
  console.log(url);
  return fetch(url);
};

export const callAllContent = () => {
  console.log('Load Content');
  const url = `${config.API_PREFIX}content/`;
  console.log(url);
  return fetch(url);
};
function* loadData(successEvent, errorEvent, func) {
  try {
    const response = yield call(func);
    const result = yield response.json();
    if (result.error) {
      yield put({ type: errorEvent, error: result.error });
    } else {
      yield put({ type: successEvent, result });
    }
  } catch (error) {
    yield put({ type: errorEvent, error: error.message });
  }
}

export default function* rootSaga() {
  yield takeEvery(
    LOAD_CHALLENGES,
    loadData,
    CHALLENGES_LOADED,
    NETWORK_ERROR_LOAD_CHALLENGES,
    callAllChallenges,
  );
  yield takeEvery(
    LOAD_PROPOSALS,
    loadData,
    PROPOSALS_LOADED,
    NETWORK_ERROR_LOAD_PROPOSALS,
    callProposals,
  );
  yield takeEvery(
    LOAD_CONTENT,
    loadData,
    CONTENT_LOADED,
    NETWORK_ERROR_LOAD_CONTENT,
    callAllContent,
  );
}
