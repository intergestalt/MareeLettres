import { takeEvery, all, call, put } from 'redux-saga/effects';

import { SET_CHALLENGES_TIME_LEFT } from '../actions/challengesTicker';
import { SET_NET_WORK_ERROR } from '../actions/general';
import { LOAD_CHALLENGES, LOAD_CHALLENGE } from '../actions/challenges';
import { LOAD_PROPOSALS, POST_PROPOSAL } from '../actions/proposals';
import { LOAD_CONTENT } from '../actions/content';
import { LOAD_CONFIG } from '../actions/config';
import { LOAD_LETTERS, POST_LETTER, LOAD_LETTERS_INTERVAL } from '../actions/letters';
import { USER_SEND_INTERNAL_VOTES, LOAD_USER } from '../actions/user';
import { getZuffiDelayForApi } from '../helper/helper';
import store from '../config/store';
import { loadConfigServiceProxy } from '../helper/apiProxy';
import { clearMyLettersProxy } from '../helper/mapHelper';

function* loadData(action) {
  try {
    const response = yield call(action.apiCall, action);
    // console.log(response);
    // const result = yield JSON.parse(response);
    const result = JSON.parse(response);
    if (result.error) {
      console.log('ERROR 1');
      console.log(result.error);
      yield put({ type: action.errorEvent, action, error: result.error.message });
      yield put({
        type: SET_NET_WORK_ERROR,
        yes: true,
        messageKey: 'network_error',
      });
    } else {
      // Eventually other actions
      // 1. Load CONFIG?
      if (action.type !== LOAD_CONFIG) {
        // only if there is a current_config in answer
        if (result.current_config) {
          const config = store.getState().config;
          const currentConfig = config.currentConfig;
          // If new Config available or no config loaded at all. (Should not happen)
          if (!currentConfig || currentConfig !== result.current_config) {
            yield setTimeout(() => {
              loadConfigServiceProxy(result.current_config);
            }, getZuffiDelayForApi());
          }
        }
      }

      if (action.type === LOAD_LETTERS_INTERVAL || action.type === LOAD_LETTERS) {
        clearMyLettersProxy();
      }
      // If loading Challanges: Set also the date data with new times...
      if (action.type === LOAD_CHALLENGES) yield put({ type: SET_CHALLENGES_TIME_LEFT, result });

      yield put({ type: action.successEvent, result, action });
    }
  } catch (error) {
    console.log('ERROR 2');
    console.log(error);
    yield put({ type: action.errorEvent, action, error });
    yield put({
      type: SET_NET_WORK_ERROR,
      yes: true,
      messageKey: 'network_error',
    });
  }
}

export default function* rootSaga() {
  yield takeEvery(LOAD_CHALLENGES, loadData);
  yield takeEvery(LOAD_CHALLENGE, loadData);
  yield takeEvery(LOAD_PROPOSALS, loadData);
  yield takeEvery(LOAD_CONTENT, loadData);
  yield takeEvery(LOAD_CONFIG, loadData);
  yield takeEvery(USER_SEND_INTERNAL_VOTES, loadData);
  yield takeEvery(LOAD_LETTERS, loadData);
  yield takeEvery(LOAD_LETTERS_INTERVAL, loadData);
  yield takeEvery(POST_LETTER, loadData);
  yield takeEvery(LOAD_USER, loadData);
  yield takeEvery(POST_PROPOSAL, loadData);
}
