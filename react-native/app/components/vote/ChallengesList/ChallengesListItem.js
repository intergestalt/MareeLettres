import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';

import { ChallengeHeadActive, ChallengeHeadInactive } from './';

import styles from './styles';
import { CHALLENGE_VIEWS } from '../../../consts';
import I18n from '../../../i18n/i18n';

const gradientStops = [
  0,
  0.009,
  0.1604,
  0.2193,
  0.2736,
  0.3246,
  0.4,
  0.5,
  0.6,
  0.7,
  0.72,
  0.74,
  0.76,
  0.78,
  0.8,
  0.82,
  0.84,
  0.86,
  1,
];

const gradientColors = [
  '#5B5971',
  '#5D5A71',
  '#645B71',
  '#6E5E70',
  '#7D6270',
  '#91676E',
  '#AA6E6C',
  '#C97769',
  '#F28366',
  '#F58466',
  '#B76661',
  '#894F5B',
  '#663D55',
  '#4B2F4F',
  '#36244A',
  '#261C46',
  '#191643',
  '#101241',
  '#0D1140',
];

class ChallengesListItem extends Component {
  static propTypes = {
    data: PropTypes.object,
    tickerEntry: PropTypes.object,
    viewMode: PropTypes.string,
    callerViewMode: PropTypes.string,
    onPress: PropTypes.func,
    onShowAllPress: PropTypes.func,
    language: PropTypes.string,
    oneFinished: PropTypes.bool,
    showAll: PropTypes.bool,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.viewMode === CHALLENGE_VIEWS.SUGGEST) {
      return false;
    }
    if (this.props.callerViewMode !== this.props.viewMode) {
      return false;
    }
    return true;
  }
  renderLoading() {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.row}>
          <Text style={styles.title}>Loading...</Text>
        </View>
      </View>
    );
  }
  renderFinished() {
    I18n.locale = this.props.language;
    let url = null;
    let showAll = null;
    if (!this.props.oneFinished && !this.props.showAll) {
      showAll = (
        <View style={styles.showAllButtonContainer}>
          <TouchableOpacity onPress={this.props.onShowAllPress}>
            <View style={styles.showAllButton}>
              <Text style={styles.showAllButtonText}>
                {I18n.t('see_all_votes').toUpperCase()}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }

    if (this.props.data.url) {
      url = (
        <View style={styles.imageListContainer}>
          <Image
            style={styles.imageStyeList}
            resizeMode="cover"
            source={{ uri: this.props.data.url }}
          />
        </View>
      );
    } else {
      url = (
        <View style={styles.imageListContainer}>
          <LinearGradient
            colors={gradientColors}
            locations={gradientStops}
            style={{ flex: 1, opacity: 1 }}
          >
            <View style={styles.winningInnerContainer}>
              <Text style={styles.winningText}>
                {this.props.data.answer}
              </Text>
            </View>
          </LinearGradient>
        </View>
      );
    }
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={this.props.onPress}>
          <ChallengeHeadInactive
            onPress={this.props.onShowAllPress}
            callerViewMode={CHALLENGE_VIEWS.LIST}
            data={this.props.data}
          />
          {url}
        </TouchableOpacity>
        {showAll}
      </View>
    );
  }
  render() {
    if (this.props.data.isLoading) return this.renderLoading();
    if (this.props.tickerEntry.finished) return this.renderFinished();
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={this.props.onPress}>
          <ChallengeHeadActive callerViewMode={CHALLENGE_VIEWS.LIST} data={this.props.data} />
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  try {
    const language = state.globals.language;
    const tickerEntry = state.challengesTicker[ownProps.data.id];
    const viewMode = state.challenges.challengeView;
    return {
      language,
      tickerEntry,
      viewMode,
    };
  } catch (e) {
    console.log('ChallengesListItem');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ChallengesListItem);
