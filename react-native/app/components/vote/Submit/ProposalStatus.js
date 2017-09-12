import React, { Component, PropTypes } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';

import I18n from '../../../i18n/i18n';
import { gradient0 } from '../../../config/gradients';
import styles from './styles';
import { ReloadButton } from '../../../components/general/ReloadButton';
import { loadProposalServiceProxy } from '../../../helper/apiProxy';

class ProposalStatus extends Component {
  static propTypes = {
    language: PropTypes.string,
    challenge: PropTypes.object,
    userChallenge: PropTypes.object,
    onBackPressed: PropTypes.func,
    onTryAgainPressed: PropTypes.func,
  };
  handleReloadPressPress = () => {
    loadProposalServiceProxy(this.props.challenge._id, false);
  };
  render() {
    let noContent = false;
    if (!this.props.userChallenge.ownProposal) {
      noContent = true;
    }

    I18n.locale = this.props.language;
    let blocked = I18n.t('proposal_blocked');
    blocked = blocked.replace('{NUM}', this.props.challenge.voteNum);
    let review = I18n.t('proposal_in_review1');
    review = review.replace('{NUM}', this.props.challenge.voteNum);

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
                    {this.props.challenge.title[this.props.language]}
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
            <View style={styles.statusBottom}>
              {!this.props.userChallenge.isLoading ? (
                <View style={styles.statusBottomContainer}>
                  <View style={styles.statusBottomTop}>
                    <Text style={styles.statusBottomText1}>
                      {this.props.userChallenge.ownProposalBlocked.bool ? blocked : review}
                    </Text>
                  </View>
                  <View style={styles.statusBottomBottom}>
                    <Text style={styles.statusBottomText2}>
                      {this.props.userChallenge.ownProposalBlocked.bool ? null : (
                        I18n.t('proposal_in_review2').toUpperCase()
                      )}
                    </Text>
                  </View>
                </View>
              ) : (
                <ActivityIndicator />
              )}
            </View>
          ) : (
            <View style={styles.statusBottom}>
              <ReloadButton textKey="reload_challenges" onReload={this.handleReloadPressPress} />
            </View>
          )}
        </View>
        <View style={styles.submitContainer}>
          {noContent || !this.props.userChallenge.ownProposalBlocked.bool ? (
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
};

const mapStateToProps = (state, props) => {
  // console.log(state.challenges);
  // console.log(props);

  try {
    const language = state.globals.language;
    const selectedChallengeIndex = state.challenges.selectedChallengeIndex;
    const challenge = state.challenges.challenges[selectedChallengeIndex];
    const userChallenge = state.user.challenges ? state.user.challenges[challenge._id] : {};

    return {
      language,
      challenge,
      userChallenge,
    };
  } catch (e) {
    console.log('ProposalStatus');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ProposalStatus);
