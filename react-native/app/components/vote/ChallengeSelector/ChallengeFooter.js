import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { isFinished } from '../../../helper/dateFunctions';
import styles from './styles';
import { PROPOSAL_VIEWS } from '../../../consts';

import I18n from '../../../i18n/i18n';

class ChallengeFooter extends Component {
  static propTypes = {
    challengeOffset: PropTypes.number,
    challenges: PropTypes.array,
    selectedChallengeIndex: PropTypes.number,
    proposalView: PropTypes.string,
    handleSharePress: PropTypes.func,
    handleTinderPress: PropTypes.func,
    handleListPress: PropTypes.func,
    handleCommitPress: PropTypes.func,
  };

  getChallengeIndex() {
    return this.props.selectedChallengeIndex + this.props.challengeOffset;
  }

  getChallenge() {
    if (
      this.getChallengeIndex() < 0 ||
      this.getChallengeIndex() > this.props.challenges.length - 1
    ) {
      return null;
    }
    return this.props.challenges[this.getChallengeIndex()];
  }

  isFinished() {
    return isFinished(this.getChallenge());
  }
  renderFinished() {
    return (
      <View style={styles.challengeFooter}>
        <View style={styles.challengeFooterFinished}>
          <TouchableOpacity onPress={this.props.handleSharePress}>
            <Text style={styles.challengeFooterText}>{I18n.t('share_button')}</Text>
            /* TODO: overview and status options here */
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  renderTinderButton() {
    return this.props.proposalView === PROPOSAL_VIEWS.TINDER
      ? <TouchableOpacity onPress={this.props.handleListPress}>
        <Text style={styles.challengeFooterText}>{I18n.t('overview_button')}</Text>
      </TouchableOpacity>
      : <TouchableOpacity onPress={this.props.handleTinderPress}>
        <Text style={styles.challengeFooterText}>{I18n.t('tinder_button')}</Text>
      </TouchableOpacity>;
  }

  renderUnfinished() {
    return (
      <View style={styles.challengeFooter}>
        <View style={styles.challengeFooterUnfinished}>
          {this.renderTinderButton()}
          <TouchableOpacity onPress={this.props.handleCommitPress}>
            <Text style={styles.challengeFooterText}>{I18n.t('suggest_button')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    if (this.isFinished()) {
      return this.renderFinished();
    }
    return this.renderUnfinished();
  }
}
const mapStateToProps = (state) => {
  try {
    const challenges = state.challenges.challenges;
    const selectedChallengeIndex = state.challenges.selectedChallengeIndex;
    const proposalView = state.challenges.proposalView;

    return {
      selectedChallengeIndex,
      challenges,
      proposalView,
    };
  } catch (e) {
    console.log('ChallengeFooter');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ChallengeFooter);
