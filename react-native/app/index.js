import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider } from 'react-redux';
import Expo from 'expo';

import Navigator from './config/routes';
import store from './config/store';
import globalStyles from './config/globalStyles';
import { AppContainer } from './components/general/Container';

import { AlertProvider } from './components/general/Alert';

Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);

EStyleSheet.build(globalStyles);

const configureScene = () => ({
  ...Navigator.SceneConfigs.FloatFromBottom,
  gestures: null, // or null
});

export default () =>
  <Provider store={store}>
    <AlertProvider>
      <AppContainer>
        <Navigator configureScene={configureScene} />
      </AppContainer>
    </AlertProvider>
  </Provider>;
