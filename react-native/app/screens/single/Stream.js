import React, { PropTypes, Component } from 'react';
import { StatusBar } from 'react-native';

import { Screen } from '../../components/general/Container';
import { Feed } from '../../components/stream';

class Stream extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };
  render() {
    return (
      <Screen navigation={this.props.navigation} centerContent backgroundColor="#fff">
        <StatusBar />
        <Feed />
      </Screen>
    );
  }
}
export default Stream;
