import React, { Component, PropTypes } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';

import I18n from '../../../i18n/i18n';
import { gradient0 } from '../../../config/gradients';
import styles from './styles';
import { ReloadButton } from '../../../components/general/ReloadButton';
import { loadProposalServiceProxy } from '../../../helper/apiProxy';
import { VoteMark } from '../VoteMark/';
import { getProposalVotesWithUser } from '../../../helper/proposalsHelper';

import { connectAlert } from '../../../components/general/Alert';
import { setUserVoteTutorialStatusProxy } from '../../../helper/userHelper';

class ProposalStatus extends Component {
  static propTypes = {
    language: PropTypes.string,
    challenge: PropTypes.object,
    userChallenge: PropTypes.object,
    onBackPressed: PropTypes.func,
    onTryAgainPressed: PropTypes.func,
    voteMap: PropTypes.object,
  };

  componentWillUnmount() {
    console.log("unmount");
    if(this.props.voteTutorialStatus) {
      if(!this.props.voteTutorialStatus.status && this.props.voteTutorialStatus.back) {
        this.props.alertWithType(
            'info',
            I18n.t('vote_tutorial_status_title'),
            I18n.t('vote_tutorial_status_text')
          );
        setUserVoteTutorialStatusProxy("status");
      }
    }
  }

  handleReloadPressPress = () => {
    loadProposalServiceProxy(this.props.challenge._id, false);
  };
  render() {
    let noContent = false;
    if (!this.props.userChallenge.ownProposal) {
      noContent = true;
    }
    let proposalBlocked = null;
    let proposalInReview = null;
    let proposalPassed = null;
    let blocked = null;
    let review = null;
    let rank = null;
    let passed = null;
    if (!this.props.userChallenge.isLoading) {
      proposalBlocked = this.props.userChallenge.ownProposalBlocked.bool;
      proposalInReview = this.props.userChallenge.ownProposalInReview.bool;
      proposalPassed = !proposalBlocked && !proposalInReview;

      I18n.locale = this.props.language;
      blocked = I18n.t('proposal_blocked');
      blocked = blocked.replace('{NUM}', this.props.challenge.voteNum);
      review = I18n.t('proposal_in_review1');
      review = review.replace('{NUM}', this.props.challenge.voteNum);
      passed = I18n.t('proposal_passed');
      passed = passed.replace('{NUM}', this.props.challenge.voteNum);
      rank = I18n.t('proposal_rank');
    }
    let panel = null;

    if (this.props.userChallenge.isLoading) {
      panel = <ActivityIndicator />;
    } else if (proposalPassed) {
      panel = (
        <View style={styles.statusBottomContainer}>
          <View style={styles.statusBottomTop}>
            <Text style={styles.statusBottomText1}>{passed}</Text>
            <Text style={styles.statusBottomText2}>
              {rank} {this.props.userChallenge.rank}
            </Text>
          </View>
          <View style={styles.statusBottomBottom}>
            <View style={styles.statusBottomBottomLeft}>
              <VoteMark size="l" active value={0} type="no" />
              <Text style={styles.textPanel}>
                {this.props.userChallenge.no + this.props.voteMap.votesNoOffset}
              </Text>
            </View>
            <View style={styles.statusBottomBottomRight}>
              <VoteMark size="l" active value={0} type="yes" />
              <Text style={styles.textPanel}>
                {this.props.userChallenge.yes + this.props.voteMap.votesYesOffset}
              </Text>
            </View>
          </View>
        </View>
      );
    } else {
      panel = (
        <View style={styles.statusBottomContainer}>
          <View style={styles.statusBottomTop}>
            <Text style={styles.statusBottomText1}>{proposalBlocked ? blocked : review}</Text>
          </View>
          <View style={styles.statusBottomBottom}>
            <Text style={styles.statusBottomText2}>
              {this.props.userChallenge.ownProposalBlocked.bool ? null : (
                I18n.t('proposal_in_review2').toUpperCase()
              )}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View>
        <View style={styles.statusContainer}>
          <View style={styles.statusTop}>
            <LinearGradient
              colors={gradient0.colors}
              locations={gradient0.stops}
              style={{ flex: 1, opacity: 1 }}
            >
              <View style={styles.statusTopContainer}>
                <View style={styles.statusTopTop}>
                  <Text style={styles.statusTopText1}>
                    {this.props.challenge.title[this.props.language].toUpperCase()}
                  </Text>
                </View>
                <View style={styles.statusTopBottom}>
                  {!(this.props.userChallenge.isLoading || noContent) ? (
                    <Text style={styles.statusTopText2}>
                      {this.props.userChallenge.ownProposal}
                    </Text>
                  ) : (
                    <ActivityIndicator />
                  )}
                </View>
              </View>
            </LinearGradient>
          </View>
          {!noContent ? (
            <View style={styles.statusBottom}>{panel}</View>
          ) : (
            <View style={styles.statusBottom}>
              <ReloadButton textKey="reload_challenges" onReload={this.handleReloadPressPress} />
            </View>
          )}
        </View>
        <View style={styles.submitContainer}>
          {noContent || !proposalBlocked ? (
            <TouchableOpacity onPress={this.props.onBackPressed}>
              <View style={styles.submitButton}>
                <Text style={styles.submitButtonText}>{I18n.t('back_button').toUpperCase()}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={this.props.onTryAgainPressed}>
              <View style={styles.submitButton}>
                <Text style={styles.submitButtonText}>
                  {I18n.t('try_again_button').toUpperCase()}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  // console.log(state.challenges);
  // console.log(props);

  try {
    const language = state.globals.language;
    const selectedChallengeIndex = state.challenges.selectedChallengeIndex;
    const challenge = state.challenges.challenges[selectedChallengeIndex];
    const userChallenge = state.user.challenges ? state.user.challenges[challenge._id] : {};
    const id = userChallenge.ownProposalId;
    const voteMap = getProposalVotesWithUser(id);

    return {
      language,
      challenge,
      userChallenge,
      voteMap,
      voteTutorialStatus: state.user.voteTutorialStatus
    };
  } catch (e) {
    console.log('ProposalStatus');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(connectAlert(ProposalStatus));
