import { AsyncStorage } from 'react-native';
import store from '../config/store';
import { setUser, setUserIsLoadingFromStorage, setUserLoadedFromStorage, setUserLoadedFromStorageResetDefaults } from '../actions/user';
import { setGlobals, setGlobalsIsLoadingFromStorage } from '../actions/general';

function existing(str) {
  if (!str) return false;
  if (str !== null && str !== '') {
    return true;
  }
  return false;
}
export async function saveUser(user) {
  try {
    let content = null;
    if (user) {
      content = user;
    } else {
      content = store.getState().user;
    }
    await AsyncStorage.setItem('user', JSON.stringify(content));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function loadUser() {
  try {
    store.dispatch(setUserIsLoadingFromStorage(true));
    const userStr = await AsyncStorage.getItem('user');

    if (existing(userStr)) {
      const user = JSON.parse(userStr);
      store.dispatch(setUser(user));
      store.dispatch(setUserIsLoadingFromStorage(false));
      store.dispatch(setUserLoadedFromStorage(true));
      store.dispatch(setUserLoadedFromStorageResetDefaults());
      return;
    }
    store.dispatch(setUserIsLoadingFromStorage(false));
    store.dispatch(setUserLoadedFromStorage(false));
  } catch (error) {
    console.log(error);
  }
}

export async function saveGlobals(globals) {
  try {
    let content = null;
    if (globals) {
      content = globals;
    } else {
      content = store.getState().globals;
    }
    await AsyncStorage.setItem('globals', JSON.stringify(content));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function loadGlobals() {
  try {
    store.dispatch(setGlobalsIsLoadingFromStorage(true));
    const globalsStr = await AsyncStorage.getItem('globals');

    if (existing(globalsStr)) {
      const globals = JSON.parse(globalsStr);
      store.dispatch(setGlobals(globals));
    }
    store.dispatch(setGlobalsIsLoadingFromStorage(false));
  } catch (error) {
    console.log(error);
  }
}
export function saveAll() {
  saveUser();
  saveGlobals();
}
