import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const Header = props =>
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text>MENU</Text>
    </TouchableOpacity>
  </View>;

export default Header;
