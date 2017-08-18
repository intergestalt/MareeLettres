import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { Back } from '../../general/BackButton';

import styles from './styles';
import { navigateToMapOverview } from '../../../helper/navigationProxy';

class NativeCamera extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  handleBackPress() {
    navigateToMapOverview(this.props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Back
          onPress={() => this.handleBackPress()} />
      </View>
    )
  }
}

export default NativeCamera;
