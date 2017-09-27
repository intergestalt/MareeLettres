import React, { PropTypes, Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';

import globalStyles from '../../config/globalStyles';

import { Screen } from '../../components/general/Container';
import { Map } from '../../components/map/Map';
// import { LettersMenu, CameraButton, MapScreenMenu } from '../../components/map/Overlay';

import I18n from '../../i18n/i18n';

import { connectAlert } from '../../components/general/Alert';

import { setUserMapTutorialStatusProxy } from '../../helper/userHelper';

class MapOverview extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    interval: PropTypes.number,
  };

  componentDidMount() {
    I18n.locale = this.props.language;
    const user = this.props.user;
    if (user.map.tutorialStatus == 'welcome' || user.map.tutorialStatus == 'step2') {
      setTimeout(() => {
        this.props.alertWithType(
          'info',
          I18n.t('map_tutorial_1_title'),
          I18n.t('map_tutorial_1_text'),
        );
        setUserMapTutorialStatusProxy('step2');
      }, 500);
    }
  }

  render() {
    return (
      <Screen
        navigation={this.props.navigation}
        backgroundColor={globalStyles.$screenLoadingBackgroundColor}
      >
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
    language: state.globals.language,
  };
};

export default connect(mapStateToProps)(connectAlert(MapOverview));
