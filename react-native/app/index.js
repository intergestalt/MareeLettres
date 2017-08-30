import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider } from 'react-redux';
import Expo from 'expo';

import Navigator from './config/routes';
import store from './config/store';
import { AppContainer } from './components/general/Container';

import { screenHeight } from './helper/screen';

Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);

EStyleSheet.build({
  $backgroundColor: '#DDDDDD',
  $backgroundColorMenuItem: 'rgb(245,132,102)',
  $highlightDraggingLetterColor: 'rgb(245,132,102)',
  $strokeWidth: '0.1rem',
  outline: 0, // set to 1 to see the elements boundaries
  rem: screenHeight > 800 ? 24 : screenHeight > 600 ? 20 : 16,
});

const configureScene = () => ({
  ...Navigator.SceneConfigs.FloatFromBottom,
  gestures: null, // or null
});

export default () =>
  <Provider store={store}>
    <AppContainer>
      <Navigator
        configureScene={configureScene}
        />
    </AppContainer>
  </Provider>;
