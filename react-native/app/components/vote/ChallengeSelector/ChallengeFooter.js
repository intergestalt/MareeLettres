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
    handleStatusPress: PropTypes.func,
    language: PropTypes.string,
    userChallenges: PropTypes.object,
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

  getUserChallenge() {
    if (!this.props.userChallenges) {
      return {};
    }
    const userChallenge = this.props.userChallenges[this.getChallenge()._id];
    return userChallenge || {};
  }

  isFinished() {
    return isFinished(this.getChallenge());
  }
  renderFinished() {
    let buttonStyle = styles._footerButton;
    if (!this.getUserChallenge().ownProposalId) {
      buttonStyle = { ...styles._footerButton, flex: 1 };
    }
    return (
      <View style={styles.challengeFooter}>
        <View style={styles.challengeFooterUnfinished}>
          {this.renderFinishedButton(buttonStyle)}
          {this.getUserChallenge().ownProposalId ? (
            <TouchableOpacity
              style={[styles.footerButton, styles.footerButtonRight]}
              onPress={this.props.handleStatusPress}
            >
              <Text style={[styles.challengeFooterText, styles.challengeFooterTextRight]}>{I18n.t('status_button')}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
  renderFinishedButton(buttonStyle) {
    return this.props.proposalView === PROPOSAL_VIEWS.TINDER ? (
      <TouchableOpacity style={buttonStyle} onPress={this.props.handleListPress}>
        <Text style={styles.challengeFooterText}>{I18n.t('overview_button')}</Text>
      </TouchableOpacity>
    ) : (
        <TouchableOpacity style={buttonStyle} onPress={this.props.handleTinderPress}>
          <Text style={styles.challengeFooterText}>{I18n.t('winner_button')}</Text>
        </TouchableOpacity>
      );
  }

  renderTinderButton() {
    return this.props.proposalView === PROPOSAL_VIEWS.TINDER ? (
      <TouchableOpacity style={styles.footerButton} onPress={this.props.handleListPress}>
        <Text style={styles.challengeFooterText}>{I18n.t('overview_button')}</Text>
      </TouchableOpacity>
    ) : (
        <TouchableOpacity style={styles.footerButton} onPress={this.props.handleTinderPress}>
          <Text style={styles.challengeFooterText}>{I18n.t('tinder_button')}</Text>
        </TouchableOpacity>
      );
  }

  renderUnfinished() {
    return (
      <View style={styles.challengeFooter}>
        <View style={styles.challengeFooterUnfinished}>
          {this.renderTinderButton()}

          <TouchableOpacity
            style={[styles.footerButton, styles.footerButtonRight]}
            onPress={
              !this.getUserChallenge().ownProposalId ? (
                this.props.handleCommitPress
              ) : (
                  this.props.handleStatusPress
                )
            }
          >
            <Text style={[styles.challengeFooterText, styles.challengeFooterTextRight]}>
              {!this.getUserChallenge().ownProposalId ? (
                I18n.t('suggest_button')
              ) : (
                  I18n.t('status_button')
                )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    I18n.locale = this.props.language;

    if (this.isFinished()) {
      return this.renderFinished();
    }
    return this.renderUnfinished();
  }
}
const mapStateToProps = (state, ownPprops) => {
  try {
    const challenges = state.challenges.challenges;
    const selectedChallengeIndex = state.challenges.selectedChallengeIndex;
    const challenge = challenges[selectedChallengeIndex + ownPprops.challengeOffset];
    const proposalView = challenge.proposalView;

    return {
      selectedChallengeIndex,
      challenges,
      proposalView,
      language: state.globals.language,
      userChallenges: state.user.challenges,
    };
  } catch (e) {
    console.log('ChallengeFooter');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ChallengeFooter);
