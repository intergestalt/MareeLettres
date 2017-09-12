import React, { Component, PropTypes } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { popProposalStatus } from '../../../helper/navigationProxy';
import I18n from '../../../i18n/i18n';

class ProposalStatus extends Component {

  constructor(props) {
    super(props);
    this.handleBackPress = this.handleBackPress.bind(this);

    console.log(this.props.challenge);
    console.log(this.props.userChallenge);
  }

  handleBackPress() {
  	popProposalStatus(this.props);
  }

  render() {
    I18n.locale = this.props.language;
  	return (
  		<View>
			<Text>{I18n.t('status_you_proposed')}: {this.props.userChallenge.ownProposal}</Text>
			<Text>{I18n.t('status')}: 
				{" " + this.props.userChallenge.ownProposalInReview ? I18n.t('status_in_review') : ""}
				{" " + this.props.userChallenge.ownProposalBlocked ? I18n.t('status_blocked') : ""}
			</Text>
		</View>
  	);
  }
}

const mapStateToProps = (state, props) => {
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
