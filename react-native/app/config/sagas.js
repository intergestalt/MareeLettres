import { takeEvery, call, put } from 'redux-saga/effects';

import { SET_CHALLENGES_DATE_DATA } from '../actions/challengesTicker';
import { LOAD_CHALLENGES, LOAD_CHALLENGE } from '../actions/challenges';
import { LOAD_PROPOSALS } from '../actions/proposals';
import { LOAD_CONTENT } from '../actions/content';
import { LOAD_CONFIG } from '../actions/config';
import { LOAD_LETTERS, POST_LETTER } from '../actions/letters';
import { USER_SEND_INTERNAL_VOTES, LOAD_USER } from '../actions/user';
import store from '../config/store';

function* loadData(action) {
  try {
    const response = yield call(action.apiCall, action);
    const result = yield JSON.parse(response);
    if (result.error) {
      console.log('ERROR 1');
      console.log(result.error);
      yield put({ type: action.errorEvent, error: result.error.message });
    } else {
      if (action.type !== LOAD_CONFIG) {
        if (result.current_config) {
          console.log('FOUND PARAM');
          const config = store.getState().config;
          if (config) {
            const currentConfig = config.currentConfig;
            console.log(`${currentConfig} vs. ${result.current_config}`);
            if (!currentConfig || currentConfig !== result.current_config) {
              console.log('GOGOGO');
              yield put({ type: LOAD_CONFIG, currentConfig });
            }
          }
        }
      }
      if (action.type === LOAD_CHALLENGES) yield put({ type: SET_CHALLENGES_DATE_DATA, result });

      yield put({ type: action.successEvent, result, action });
    }
  } catch (error) {
    console.log('ERROR 2');
    console.log(error);
    yield put({ type: action.errorEvent, error: error.message });
  }
}

/* function* loadDataPlusTicker(action) {
  try {
    const response = yield call(action.apiCall, action);
    const result = yield JSON.parse(response);
    if (result.error) {
      yield put({ type: action.errorEvent, error: result.error });
    } else {
      yield put({ type: CHECK_CONFIG, result });
      yield put({ type: SET_CHALLENGES_DATE_DATA, result });
      yield put({ type: action.successEvent, result, action });
    }
  } catch (error) {
    yield put({ type: action.errorEvent, error: error.message });
  }
} */
/* function* sendData(action) {
  try {
    const response = yield call(action.apiCall, action);
    const result = yield JSON.parse(response);
    if (result.error) {
      console.log('ERROR 1');
      console.log(result.error);
      yield put({ type: action.errorEvent, error: result.error.message });
    } else {
      yield put({ type: action.successEvent, result, action });
    }
  } catch (error) {
    console.log('ERROR 2');
    console.log(error);
    yield put({ type: action.errorEvent, error: error.message });
  }
} */
export default function* rootSaga() {
  yield takeEvery(LOAD_CHALLENGES, loadData);
  yield takeEvery(LOAD_CHALLENGE, loadData);
  yield takeEvery(LOAD_PROPOSALS, loadData);
  yield takeEvery(LOAD_CONTENT, loadData);
  yield takeEvery(LOAD_CONFIG, loadData);
  yield takeEvery(USER_SEND_INTERNAL_VOTES, loadData);
  yield takeEvery(LOAD_LETTERS, loadData);
  yield takeEvery(POST_LETTER, loadData);
  yield takeEvery(LOAD_USER, loadData);
}
