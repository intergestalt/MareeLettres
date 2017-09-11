import React, { PropTypes, Component } from 'react';
import { StatusBar, Button } from 'react-native';

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
        <Button
          onPress={this.handleDeleteStorage}
          title="Reset App and delete all personal data"
        />
        <InfoBox />
      </Screen>
    );
  }
}

export default Info;
