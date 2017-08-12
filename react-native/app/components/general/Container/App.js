import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Font } from 'expo';

import styles from './styles';

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      normal: require('./assets/fonts/ArialMonospacedMTPro.ttf'),
      bold: require('./assets/fonts/ArialMonospacedMTPro-Bld.ttf'),
      impact: require('./assets/fonts/impact.ttf'),
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Text>Loading...</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        {this.props.children}
      </View>
    );
  }
}

export default AppContainer;
