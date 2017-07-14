import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import Home from './screens/Home';
import Challenges from './screens/Challenges';

EStyleSheet.build({
  $backgroundColor: '#0ee',
  outline: 0, // set to 1 to see the elements boundaries
});

// export default () => <Home />;
export default () => <Challenges />;
