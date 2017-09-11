import React, { Component, PropTypes } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { popProposalStatus } from '../../../helper/navigationProxy';

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
  	return (
  		<View>
	  		{/*<TouchableOpacity onPress={() => this.handleBackPress()}>
	            <Text>
	              {'<'}
	            </Text>
	         </TouchableOpacity>
			<Text>{this.props.challenge.title[this.props.language]}</Text>*/}
			<Text>You proposed: {this.props.userChallenge.ownProposal}</Text>
			<Text>Status: 
				{this.props.userChallenge.ownProposalInReview ? " In Review" : ""}
				{this.props.userChallenge.ownProposalBlocked ? " Blocked" : ""}
			</Text>
		</View>
  	);
  }
}

const mapStateToProps = (state, props) => {
  //console.log(state.challenges);
  //console.log(props);	
  
  try {
    const language = state.globals.language;
    const selectedChallengeIndex = state.challenges.selectedChallengeIndex;
  	const challenge = state.challenges.challenges[selectedChallengeIndex];
  	const userChallenge = state.user.challenges[challenge._id];

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
