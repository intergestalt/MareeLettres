import React, { Component, PropTypes } from 'react';
import { View, BackHandler } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { CHALLENGE_VIEWS, SCREENS, MAP_VIEWS } from '../../../consts';
import {
  dispatchBackActionToMapOverview,
  popProposalSubmitter,
  popChallengeSelector,
} from '../../../helper/navigationProxy';

class Screen extends Component {
  static propTypes = {
    children: PropTypes.any,
    customStyle: PropTypes.object,
    backgroundColor: PropTypes.string,
    centerContent: PropTypes.bool,
    screen: PropTypes.string,
    challengeView: PropTypes.string,
    mapView: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBack);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
  }
  handleBack() {
    if (this.props.screen === SCREENS.VOTE) {
      if (this.props.challengeView === CHALLENGE_VIEWS.SUGGEST) {
        popProposalSubmitter(this.props);
        return true;
      } else if (this.props.challengeView === CHALLENGE_VIEWS.DETAIL) {
        popChallengeSelector(this.props);
        return true;
      }
    }
    if (this.props.screen === SCREENS.MAP) {
      if (
        this.props.mapView === MAP_VIEWS.CAMERA ||
        this.props.mapView === MAP_VIEWS.LETTER_SELECTOR ||
        this.props.mapView === MAP_VIEWS.QR_CODE_GET ||
        this.props.mapView === MAP_VIEWS.QR_CODE_SEND
      ) {
        dispatchBackActionToMapOverview(this.props, MAP_VIEWS.OVERVIEW);
        return true;
      }
    }
    return true;
  }

  render() {
    const containerStyles = [styles.screen];
    if (this.props.backgroundColor) {
      containerStyles.push({ backgroundColor: this.props.backgroundColor });
      containerStyles.push(this.props.customStyle);
    }
    if (this.props.centerContent) {
      containerStyles.push({ alignItems: 'center', justifyContent: 'center' });
    }
    return (
      <View style={containerStyles}>
        {this.props.children}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    const screen = state.globals.screen;
    const challengeView = state.challenges.challengeView;
    const mapView = state.globals.mapView;
    return {
      screen,
      challengeView,
      mapView,
    };
  } catch (e) {
    console.log('Screen');
    console.log(e);
    throw e;
  }
};

export default connect(mapStateToProps)(Screen);
