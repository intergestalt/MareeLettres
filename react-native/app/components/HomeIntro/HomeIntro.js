import React, { PropTypes } from 'react';
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
    <TouchableOpacity onPress={props.onStreamPress}>
      <Text style={styles.paragraph}>Live Stream!</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={props.onAboutPress}>
      <Text style={styles.paragraph}>About</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={props.onHowPress}>
      <Text style={styles.paragraph}>How to Play</Text>
    </TouchableOpacity>
  </View>;

HomeIntro.propTypes = {
  onVotePress: PropTypes.func,
  onMapPress: PropTypes.func,
  onStreamPress: PropTypes.func,
  onAboutPress: PropTypes.func,
  onHowPress: PropTypes.func,
};

export default HomeIntro;
