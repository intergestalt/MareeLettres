import React, { PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import styles from './styles';

const ChallengesListItem = ({ data, onPress }) =>
  <View style={styles.itemContainer}>
    <TouchableHighlight onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.title}>
          {data.title}
        </Text>
      </View>
    </TouchableHighlight>
  </View>;
ChallengesListItem.propTypes = {
  data: PropTypes.object,
  onPress: PropTypes.func,
};

export default ChallengesListItem;
