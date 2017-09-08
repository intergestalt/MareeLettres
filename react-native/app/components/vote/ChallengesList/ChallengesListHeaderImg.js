import React, { Component, PropTypes } from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import { DYNAMIC_CONFIG } from '../../../config/config';

class ChallengesListHeaderImg extends Component {
  static propTypes = { disabled: PropTypes.bool };

  render() {
    if (this.props.disabled) {
      return <View />;
    }
    return (
      <View style={styles.listHeaderContainer}>
        <Image
          style={styles.imageStye}
          resizeMode="cover"
          source={{ uri: DYNAMIC_CONFIG.CHALLENGE_LIST_IMAGE_URL }}
        />
      </View>
    );
  }
}

export default ChallengesListHeaderImg;
