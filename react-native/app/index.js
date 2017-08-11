import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider } from 'react-redux';

import Navigator from './config/routes';
import store from './config/store';
import { AppContainer } from './components/general/Container';

EStyleSheet.build({
  $backgroundColor: '#DDDDDD',
  outline: 0, // set to 1 to see the elements boundaries
});

const configureScene = () => ({
  ...Navigator.SceneConfigs.FloatFromBottom,
  gestures: null, // or null
});

// export default () => <Home />;
export default () =>
  <Provider store={store}>
    <AppContainer>
      <Navigator configureScene={configureScene} />
    </AppContainer>
  </Provider>;
