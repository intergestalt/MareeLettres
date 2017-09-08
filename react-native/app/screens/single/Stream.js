import React, { PropTypes, Component } from 'react';
import { Text, StatusBar } from 'react-native';

import { Screen } from '../../components/general/Container';

class Stream extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };
  render() {
    return (
      <Screen navigation={this.props.navigation} centerContent backgroundColor="#fff">
        <StatusBar />
        <Text>To come: News Feed from Twitter</Text>
      </Screen>
    );
  }
}
export default Stream;
