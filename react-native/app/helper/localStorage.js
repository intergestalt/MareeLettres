import { AsyncStorage } from 'react-native';
import store from '../config/store';
import { setUser, setUserIsLoadingFromStorage, setUserLoadedFromStorage } from '../actions/user';

export async function saveUser() {
  try {
    console.log('SAVE USER TO DISC');

    const user = store.getState().user;
    await AsyncStorage.setItem('user', JSON.stringify(user));
    console.log('SAVE USER FROM DISC FINISH');
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
    console.log('LOAD USER FROM DISC FINISH');

    if (userStr !== null && userStr !== '') {
      console.log('FOUND');
      const user = JSON.parse(userStr);
      store.dispatch(setUser(user));
      store.dispatch(setUserIsLoadingFromStorage(false));
      store.dispatch(setUserLoadedFromStorage(true));
      return;
    }
    console.log('FOUND NOTHING');
    store.dispatch(setUserIsLoadingFromStorage(false));
    store.dispatch(setUserLoadedFromStorage(false));
  } catch (error) {
    console.log(error);
  }
}
