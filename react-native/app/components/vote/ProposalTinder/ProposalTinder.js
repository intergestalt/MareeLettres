import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { VoteMark } from '../VoteMark/';

class ProposalTinder extends Component {
  static propTypes = {
    proposalIndex: PropTypes.number,
    proposal: PropTypes.object,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
  };

  render() {
    let myStyle = null;
    if (this.props.proposalIndex === 0) {
      myStyle = styles.container;
    } else {
      myStyle = styles.containerBackground;
    }
    if (!this.props.isLoading && !this.props.isError) {
      return (
        <View style={myStyle}>
          <View style={styles.topContainer}>
            <Text style={styles.text}>
              {this.props.proposal.text}
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <VoteMark size="l" active value={0} type="no" />
            <VoteMark size="l" active value={0} type="yes" />
          </View>
        </View>
      );
    }
    if (this.props.isLoading) {
      return (
        <View style={myStyle}>
          <Text>Loading...</Text>
        </View>
      );
    }
    // Else: isError==true
    return (
      <View style={myStyle}>
        <Text>ERROR!</Text>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const challenges = state.challenges.challenges;
  const selectedChallengeIndex = state.challenges.selectedChallengeIndex;
  const challengeIndex = selectedChallengeIndex;
  const id = challenges[challengeIndex]._id;
  const proposals = state.proposals[id];
  const isError = proposals.isError;
  const isLoading = proposals.isLoading;

  const proposal = proposals.proposals[ownProps.proposalIndex];
  return {
    proposal,
    isError,
    isLoading,
  };
};
export default connect(mapStateToProps)(ProposalTinder);
