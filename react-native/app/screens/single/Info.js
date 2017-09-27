import React, { PropTypes, Component } from 'react';
import { StatusBar, Button } from 'react-native';
import Expo from 'expo';

import config from '../../config/config';

import { Screen } from '../../components/general/Container';
import { InfoBox } from '../../components/info/InfoBox';
import { deleteAllFromStorage } from '../../helper/localStorage';

class Info extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  handleDeleteStorage() {
    console.log("delete storage")
    deleteAllFromStorage();
  }

  render() {
    return (
      <Screen navigation={this.props.navigation}>
        <StatusBar />
        <InfoBox />
        {Expo.Constants.appOwnership === 'expo' && <Button
          onPress={this.handleDeleteStorage}
          title={`Reset App and delete all personal data (${config.SERVER_NAME}\u00a0${config.SERVER_ADDRESS})`}
        />}
      </Screen>
    );
  }
}

export default Info;
