import React, { Component, PropTypes } from 'react';
import { Image, Animated, View, Text } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { VoteMark } from '../VoteMark/';
import { getProposalList } from '../../../helper/proposalsHelper';

class ProposalTinder extends Component {
  static propTypes = {
    panResponderContent: PropTypes.object,
    myTinderStyle: PropTypes.object,
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
    let noContainer = null;
    let yesContainer = null;

    if (this.props.proposalIndex === 0 && this.props.proposal) {
      // Foreground
      myStyle = styles.container;
    } else {
      // BAckground
      myStyle = styles.containerBackground;
    }
    if (this.props.proposalIndex === 0 && this.props.proposal && this.props.challengeOffset === 0) {
      // Foreground or neighbour
      noContainer = (
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
      );
      yesContainer = (
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
      );
    } else {
      // BAckground or neighbour
      noContainer = (
        <View style={styles.noContainer1}>
          <View style={styles.noContainer2}>
            <VoteMark size="l" active value={0} type="no" />
          </View>
        </View>
      );
      yesContainer = (
        <View style={styles.noContainer1}>
          <View style={styles.noContainer2}>
            <VoteMark size="l" active value={0} type="yes" />
          </View>
        </View>
      );
    }
    let tinder = null;
    if (!this.props.isLoading && !this.props.isError) {
      if (this.props.proposal) {
        tinder = (
          <View style={myStyle}>
            <View style={styles.topContainer}>
              <Text style={styles.text}>
                {this.props.proposal.text}
              </Text>
            </View>
            <View style={styles.bottomContainer}>
              {noContainer}
              {yesContainer}
            </View>
          </View>
        );
      } else {
        tinder = (
          <View style={myStyle}>
            <Text>Nothing to Swipe</Text>
          </View>
        );
      }
      if (
        this.props.proposalIndex === 0 &&
        this.props.proposal &&
        this.props.challengeOffset === 0
      ) {
        return (
          <Animated.View
            {...this.props.panResponderContent.panHandlers}
            style={this.props.myTinderStyle}
          >
            {tinder}
          </Animated.View>
        );
      }
      return tinder;
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

  const proposalView = state.globals.proposalView;
  const proposalListMode = state.globals.proposalListMode;
  // all 4 lists
  const p = state.proposals[id];

  const proposals = getProposalList(p, proposalView, proposalListMode);
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
