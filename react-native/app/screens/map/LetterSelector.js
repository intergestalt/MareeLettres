import React, { PropTypes, Component } from 'react';
import { StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';

import { Screen } from '../../components/general/Container';
import { TabBar } from '../../components/general/TabBar';

import { LetterSelectorWindow } from '../../components/map/LetterSelector';

class LetterSelector extends Component {
  static PropTypes = {
    navigation: PropTypes.object,
  };

  render() {
    return (
      <Screen navigation={this.props.navigation} backgroundColor={'#ffffff'}>
        <StatusBar />
        <LetterSelectorWindow navigation={this.props.navigation} />
      </Screen>
    );
  }
}

export default LetterSelector;
