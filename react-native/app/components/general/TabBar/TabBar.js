import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { CHALLENGE_VIEWS, SCREENS, MAP_VIEWS } from '../../../consts';

import {
  navigateToVote,
  navigateToBecome,
  navigateToStream,
  navigateToInfo,
} from '../../../helper/navigationProxy';

import I18n from '../../../i18n/i18n';

import styles from './styles';

class TabBar extends Component {
  static propTypes = {
    language: PropTypes.string,
    navigation: PropTypes.object,
    challengesView: PropTypes.string,
    screen: PropTypes.string,
    mapView: PropTypes.string,
  };

  handleVotePress = () => {
    navigateToVote(this.props);
  };

  handleBecomePress = () => {
    navigateToBecome(this.props);
  };

  handleStreamPress = () => {
    navigateToStream(this.props);
  };

  handleInfoPress = () => {
    navigateToInfo(this.props);
  };

  tab = (selected, text, onPress, first = false, always = false) => {
    const tabStyle = first ? [styles.tab, styles.tabFirst] : styles.tab;
    return !selected ? (
      <TouchableHighlight
        underlayColor={styles._tab.backgroundColor}
        activeOpacity={0.5}
        style={tabStyle}
        onPress={onPress}
      >
        <Text style={styles.text}>{text}</Text>
      </TouchableHighlight>
    ) : always ? (
      <TouchableHighlight
        underlayColor={styles._tab.backgroundColor}
        activeOpacity={0.5}
        style={tabStyle}
        onPress={onPress}
      >
        <View style={tabStyle}>
          <Text style={styles.textHigh}>{text}</Text>
        </View>
      </TouchableHighlight>
    ) : (
      <View style={tabStyle}>
        <Text style={styles.textHigh}>{text}</Text>
      </View>
    );
  };

  render() {
    I18n.locale = this.props.language;
    const tabIndex = this.props.navigation.state.index;

    let voteSelected = false;
    let becomeSelected = false;
    let streamSelected = false;
    let infoSelected = false;
    let showTabBar = true;
    if (tabIndex === 0) {
      voteSelected = true;
    } else if (tabIndex === 1) {
      becomeSelected = true;
    } else if (tabIndex === 2) {
      streamSelected = true;
    } else if (tabIndex === 3) {
      infoSelected = true;
    }
    let voteActive = true;
    if (this.props.screen === SCREENS.VOTE) {
      if (this.props.challengesView === CHALLENGE_VIEWS.SUGGEST) {
        showTabBar = false;
      }
      if (this.props.challengesView === CHALLENGE_VIEWS.LIST) {
        voteActive = false;
      }
    }
    if (this.props.screen === SCREENS.MAP) {
      if (
        this.props.mapView === MAP_VIEWS.CAMERA ||
        this.props.mapView === MAP_VIEWS.QR_CODE_GET ||
        this.props.mapView === MAP_VIEWS.QR_CODE_SEND
      ) {
        showTabBar = false;
      }
    }

    if (showTabBar) {
      return (
        <View style={styles.container}>
          {this.tab(
            voteSelected,
            I18n.t('top_menu_option_1'),
            this.handleVotePress,
            true,
            voteActive,
          )}
          {this.tab(
            becomeSelected,
            I18n.t('top_menu_option_2'),
            this.handleBecomePress,
            false,
            false,
          )}
          {this.tab(
            streamSelected,
            I18n.t('top_menu_option_3'),
            this.handleStreamPress,
            false,
            false,
          )}
          {this.tab(infoSelected, I18n.t('top_menu_option_4'), this.handleInfoPress, false, false)}
        </View>
      );
    }
    return <View />;
  }
}

const mapStateToProps = (state) => {
  try {
    const language = state.globals.language;
    const challengesView = state.challenges.challengeView;
    const mapView = state.globals.mapView;
    const screen = state.globals.screen;
    return {
      language,
      challengesView,
      screen,
      mapView,
    };
  } catch (e) {
    console.log('TabBar');
    console.log(e);
    throw e;
  }
};

export default connect(mapStateToProps)(TabBar);
