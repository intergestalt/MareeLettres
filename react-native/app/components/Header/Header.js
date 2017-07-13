import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const Header = () => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button}>
      <Text>
        MENU
      </Text>
    </TouchableOpacity>
  </View>
);

export default Header;
