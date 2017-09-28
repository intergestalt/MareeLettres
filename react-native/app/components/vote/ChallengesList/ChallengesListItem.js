import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';

import { ChallengeHeadActive, ChallengeHeadInactive } from './';

import styles from './styles';
import { gradient2 } from '../../../config/gradients';
import { CHALLENGE_VIEWS } from '../../../consts';
import I18n from '../../../i18n/i18n';
import { isEmpty } from '../../../helper/helper';

class ChallengesListItem extends Component {
  static propTypes = {
    data: PropTypes.object,
    tickerEntry: PropTypes.object,
    viewMode: PropTypes.string,
    callerViewMode: PropTypes.string,
    onPress: PropTypes.func,
    onShowAllPress: PropTypes.func,
    onHideAllPress: PropTypes.func,
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
        <View style={styles.separator} />
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
          <TouchableOpacity onPress={this.props.onShowAllPress} activeOpacity={0.5}>
            <View style={styles.showAllButton}>
              <Text style={styles.showAllButtonText}>{I18n.t('see_all_votes').toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    let hideAll = null;
    if (!this.props.oneFinished && this.props.data.last && this.props.showAll) {
      hideAll = (
        <View style={styles.showAllButtonContainer}>
          <TouchableOpacity onPress={this.props.onHideAllPress} activeOpacity={0.5}>
            <View style={styles.showAllButton}>
              <Text style={styles.showAllButtonText}>{I18n.t('hide_all_votes').toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    let answer = this.props.data.answer;
    let emptyAnswer = false;
    if (answer === null) {
      answer = I18n.t('waiting_for_answer');
      emptyAnswer = true;
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
    } else if (emptyAnswer) {
      url = (
        <View style={styles.imageListContainer}>
          <View style={[styles.winningInnerContainer, styles.winningInnerContainerWaiting]}>
            <Text style={[styles.winningText, styles.winningTextWaiting]}>{answer}</Text>
          </View>
        </View>
      );
    } else {
      url = (
        <View style={styles.imageListContainer}>
          <LinearGradient
            colors={gradient2.colors}
            locations={gradient2.stops}
            style={{ flex: 1, opacity: 1 }}
          >
            <View style={styles.winningInnerContainer}>
              <Text style={styles.winningText}>{answer}</Text>
            </View>
          </LinearGradient>
        </View>
      );
    }
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.5}>
          <ChallengeHeadInactive
            onPress={this.props.onShowAllPress}
            callerViewMode={CHALLENGE_VIEWS.LIST}
            data={this.props.data}
            style={styles._challengeHeaderPadding}
          />
          {url}
        </TouchableOpacity>
        {showAll}
        {hideAll}
        <View style={styles.separator} />
      </View>
    );
  }
  render() {
    if (this.props.data.isLoading) return this.renderLoading();
    if (this.props.tickerEntry.finished) return this.renderFinished();
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.5}>
          <ChallengeHeadActive
            callerViewMode={CHALLENGE_VIEWS.LIST}
            data={this.props.data}
            style={styles._challengeHeaderPadding}
          />
        </TouchableOpacity>
        <View style={styles.separator} />
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
