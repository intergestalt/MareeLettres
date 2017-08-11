import { takeEvery, call, put } from 'redux-saga/effects';
import { LOAD_CHALLENGES, LOAD_CHALLENGE } from '../actions/services/challenges';

import { LOAD_PROPOSALS } from '../actions/services/proposals';

import { LOAD_CONTENT } from '../actions/services/content';

function* loadData(action) {
  try {
    const response = yield call(action.apiCall, action);
    const result = yield response.json();
    if (result.error) {
      yield put({ type: action.errorEvent, error: result.error });
    } else {
      yield put({ type: action.successEvent, result, action });
    }
  } catch (error) {
    yield put({ type: action.errorEvent, error: error.message });
  }
}

export default function* rootSaga() {
  yield takeEvery(LOAD_CHALLENGES, loadData);
  yield takeEvery(LOAD_CHALLENGE, loadData);
  yield takeEvery(LOAD_PROPOSALS, loadData);
  yield takeEvery(LOAD_CONTENT, loadData);
}
