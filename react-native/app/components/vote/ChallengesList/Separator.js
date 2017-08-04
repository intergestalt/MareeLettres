import React from 'react';
import { View } from 'react-native';

import styles from './styles';

const Separator = () =>
  <View style={styles.separator}>
    <View style={styles.separator2} />
  </View>;

export default Separator;
