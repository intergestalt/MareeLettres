import { takeEvery, call, put } from 'redux-saga/effects';

import { SET_CHALLENGES_DATE_DATA } from '../actions/challengesTicker';
import { LOAD_CHALLENGES, LOAD_CHALLENGE } from '../actions/challenges';
import { LOAD_PROPOSALS } from '../actions/proposals';
import { LOAD_CONTENT } from '../actions/content';
import { LOAD_LETTERS } from '../actions/letters';
import { USER_SEND_INTERNAL_VOTES, LOAD_USER } from '../actions/user';

function* loadData(action) {
  try {
    const response = yield call(action.apiCall, action);
    //    console.log('RESPONSE');
    //    console.log(response);
    const result = yield response.json();
    //    console.log('RESULT');
    //    console.log(result);
    if (result.error) {
      console.log('ERROR 1');
      console.log(result.error);
      yield put({ type: action.errorEvent, error: result.error.message });
    } else {
      //      console.log('SUCCESS');
      yield put({ type: action.successEvent, result, action });
    }
  } catch (error) {
    console.log('ERROR 2');
    console.log(error);
    yield put({ type: action.errorEvent, error: error.message });
  }
}

function* loadDataPlusTicker(action) {
  try {
    const response = yield call(action.apiCall, action);
    const result = yield response.json();
    if (result.error) {
      yield put({ type: action.errorEvent, error: result.error });
    } else {
      yield put({ type: SET_CHALLENGES_DATE_DATA, result });
      yield put({ type: action.successEvent, result, action });
    }
  } catch (error) {
    yield put({ type: action.errorEvent, error: error.message });
  }
}
function* sendData(action) {
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
  yield takeEvery(LOAD_CHALLENGES, loadDataPlusTicker);
  yield takeEvery(LOAD_CHALLENGE, loadData);
  yield takeEvery(LOAD_PROPOSALS, loadData);
  yield takeEvery(LOAD_CONTENT, loadData);
  yield takeEvery(USER_SEND_INTERNAL_VOTES, sendData);
  yield takeEvery(LOAD_LETTERS, loadData);
  yield takeEvery(LOAD_USER, loadData);
}
