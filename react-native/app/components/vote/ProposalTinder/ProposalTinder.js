import React, { Component, PropTypes } from 'react';
import { Animated, View, Text } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { VoteMark, Test } from '../VoteMark/';

class ProposalTinder extends Component {
  static propTypes = {
    proposalIndex: PropTypes.number,
    proposal: PropTypes.object,
    noOpacity: PropTypes.number,
    yesOpacity: PropTypes.number,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    challengeOffset: PropTypes.number,
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
            <View style={styles.noContainer1}>
              <View style={styles.noContainer2}>
                <VoteMark size="l" active value={0} type="no" />
              </View>
              <View style={styles.noContainer2}>
                <Animated.View style={{ opacity: this.props.noOpacity }}>
                  <VoteMark size="l" active value={1} type="no" />
                </Animated.View>
              </View>
            </View>
            <View style={styles.noContainer1}>
              <View style={styles.noContainer2}>
                <VoteMark size="l" active value={0} type="yes" />
              </View>
              <View style={styles.noContainer2}>
                <Animated.View style={{ opacity: this.props.yesOpacity }}>
                  <VoteMark size="l" active value={1} type="yes" />
                </Animated.View>
              </View>
            </View>
          </View>
        </View>
      );
    }
    /*  <Test /> */

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
  const challengeIndex = selectedChallengeIndex + ownProps.challengeOffset;
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
