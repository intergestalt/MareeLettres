import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import Navigator from './config/routes';

EStyleSheet.build({
  $backgroundColor: '#DDDDDD',
  outline: 0, // set to 1 to see the elements boundaries
});

// export default () => <Home />;
export default () => <Navigator />;
