import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const HomeIntro = props =>
  <View>
    <TouchableOpacity onPress={props.onVotePress}>
      <Text style={styles.paragraph}>Decide together what the Big Letters should say!</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={props.onMapPress}>
      <Text style={styles.paragraph}>Become a Letter yourself and walk around the map!</Text>
    </TouchableOpacity>
  </View>;

export default HomeIntro;
