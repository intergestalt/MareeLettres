import React, { PropTypes, Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';

import { Screen } from '../../components/general/Container';
import { TabBar } from '../../components/general/TabBar';
import { Map } from '../../components/map/Map';
// import { LettersMenu, CameraButton, MapScreenMenu } from '../../components/map/Overlay';

import { connectAlert } from '../../components/general/Alert';

import { setUserMapTutorialStatusProxy } from '../../helper/userHelper';

class MapOverview extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    interval: PropTypes.number,
  };

  componentDidMount() {
    const user = this.props.user;
    if (user.map.tutorialStatus == 'welcome') {
      this.props.alertWithType(
        'info',
        'Welcome to the FLUX!',
        'To choose YOUR letter, tap on the + symbol right under You.',
      );
      setUserMapTutorialStatusProxy('step2');
    }
  }

  render() {
    return (
      <Screen navigation={this.props.navigation} backgroundColor={'#00aaaa'}>
        <StatusBar />
        <Map navigation={this.props.navigation} />
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const user = state.user;

  return {
    user,
  };
};

export default connect(mapStateToProps)(connectAlert(MapOverview));
