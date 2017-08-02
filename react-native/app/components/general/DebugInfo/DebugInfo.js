import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

import config from '../../../config/config';

const DebugInfo = () =>
  <View style={styles.container}>
    <Text>
      {config.SERVER_ADDRESS}
    </Text>
  </View>;

export default DebugInfo;
