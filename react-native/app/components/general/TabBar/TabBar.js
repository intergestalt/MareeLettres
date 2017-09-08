import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { CHALLENGE_VIEWS, SCREENS } from '../../../consts';

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
    viewMode: PropTypes.string,
    screen: PropTypes.string,
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
    if ((this.props.screen = SCREENS.VOTE)) {
      if (this.props.viewMode === CHALLENGE_VIEWS.SUGGEST) {
        showTabBar = false;
      }
    }
    if (showTabBar) {
      return (
        <View style={styles.container}>
          <View style={[styles.tab, styles.tabFirst]}>
            {!voteSelected
              ? <TouchableOpacity onPress={this.handleVotePress}>
                <Text style={styles.text}>
                  {I18n.t('top_menu_option_1')}
                </Text>
              </TouchableOpacity>
              : <Text style={styles.textHigh}>
                {I18n.t('top_menu_option_1')}
              </Text>}
          </View>
          <View style={styles.tab}>
            {!becomeSelected
              ? <TouchableOpacity onPress={this.handleBecomePress} style={styles.touchable}>
                <Text style={styles.text}>
                  {I18n.t('top_menu_option_2')}
                </Text>
              </TouchableOpacity>
              : <Text style={styles.textHigh}>
                {I18n.t('top_menu_option_2')}
              </Text>}
          </View>
          <View style={styles.tab}>
            {!streamSelected
              ? <TouchableOpacity onPress={this.handleStreamPress}>
                <Text style={styles.text}>
                  {I18n.t('top_menu_option_3')}
                </Text>
              </TouchableOpacity>
              : <Text style={styles.textHigh}>
                {I18n.t('top_menu_option_3')}
              </Text>}
          </View>
          <View style={styles.tab}>
            {!infoSelected
              ? <TouchableOpacity onPress={this.handleInfoPress}>
                <Text style={styles.text}>
                  {I18n.t('top_menu_option_4')}
                </Text>
              </TouchableOpacity>
              : <Text style={styles.textHigh}>
                {I18n.t('top_menu_option_4')}
              </Text>}
          </View>
        </View>
      );
    }
    return <View />;
  }
}

const mapStateToProps = (state) => {
  try {
    const language = state.globals.language;
    const viewMode = state.challenges.challengeView;
    const screen = state.globals.screen;
    return {
      language,
      viewMode,
      screen,
    };
  } catch (e) {
    console.log('TabBar');
    console.log(e);
    throw e;
  }
};

export default connect(mapStateToProps)(TabBar);
