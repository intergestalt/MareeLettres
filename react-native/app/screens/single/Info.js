import React, { PropTypes, Component } from 'react';
import { StatusBar } from 'react-native';

import { Screen } from '../../components/general/Container';
import { InfoBox } from '../../components/info/InfoBox';

class Info extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };
  render() {
    return (
      <Screen navigation={this.props.navigation} backgroundColor="#aaaa00">
        <StatusBar />
        <InfoBox />
      </Screen>
    );
  }
}

export default Info;
