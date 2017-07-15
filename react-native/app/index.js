import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Meteor from 'react-native-meteor';

import config from './config/config';
import Navigator from './config/routes.js';

Meteor.connect(config.SERVER_URL);

EStyleSheet.build({
  $backgroundColor: '#0ee',
  outline: 0, // set to 1 to see the elements boundaries
});

// export default () => <Home />;
export default () => <Navigator />;
