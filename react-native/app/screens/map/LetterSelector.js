import React, { PropTypes, Component } from 'react';
import { StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';

import { Screen } from '../../components/general/Container';
import { TabBar } from '../../components/general/TabBar';

class LetterSelector extends Component {
  static PropTypes = {
    navigation: PropTypes.object,
  };

  render() {
    return (
      <Screen backgroundColor={'#00aaaa'}>
        <StatusBar />
        <Text>Letter Selector !</Text>
        <TabBar navigation={this.props.navigation} />
      </Screen>
    );
  }
}

export default connect()(LetterSelector);
