import React, { Component, PropTypes } from 'react';
import { Animated, View, Text } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { VoteMark } from '../VoteMark/';
import { getProposalList } from '../../../helper/proposalsHelper';
import { ReloadButton } from '../../../components/general/ReloadButton';

class ProposalTinder extends Component {
  static propTypes = {
    panResponderContent: PropTypes.object,
    myTinderStyle: PropTypes.array,
    proposalIndex: PropTypes.number,
    proposal: PropTypes.object,
    noOpacity: PropTypes.object,
    yesOpacity: PropTypes.object,
    isLoading: PropTypes.bool,
    challengeOffset: PropTypes.number,
    textColor: PropTypes.object,
  };
  renderIsLoading() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  renderNoTinder(myStyle) {
    return (
      <View style={myStyle}>
        <ReloadButton textKey="reload_proposals" onReload={null} />
      </View>
    );
  }

  render() {
    let myStyle = null;
    let noContainer = null;
    let yesContainer = null;
    let textContainer = null;

    let foreground = false;
    if (this.props.proposalIndex === 0) {
      foreground = true;
    }
    let proposalExists = false;
    if (this.props.proposal) {
      proposalExists = true;
    }
    let center = false;
    if (this.props.challengeOffset === 0) {
      center = true;
    }
    if (foreground && proposalExists) {
      myStyle = styles.container;
    } else {
      myStyle = styles.containerBackground;
    }
    if (foreground && this.props.isLoading) {
      return this.renderIsLoading();
    }

    if (foreground && proposalExists && center) {
      // Foreground and Center Challenge (That one actually visible end editable)
      // =>  Two Votmarks at the same place to change color. Animated View to do this

      textContainer = (
        <Animated.Text style={[styles.text, { color: this.props.textColor }]}>
          {this.props.proposal.text}
        </Animated.Text>
      );
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
    } else if (proposalExists) {
      // Background or neighbour (not visible, but rendered to swipe challenges left and right)
      // => One Votemark, no AnimatedView
      textContainer = (
        <Text style={styles.text}>
          {this.props.proposal.text}
        </Text>
      );
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
    if (proposalExists) {
      tinder = (
        <View style={myStyle}>
          <View style={styles.topContainer}>
            {textContainer}
          </View>
          <View style={styles.bottomContainer}>
            {noContainer}
            {yesContainer}
          </View>
        </View>
      );
    } else {
      tinder = this.renderNoTinder(myStyle);
    }
    if (foreground && proposalExists && center) {
      // Foreground, existing and it is the center challenge => Animated Container
      return (
        <Animated.View
          {...this.props.panResponderContent.panHandlers}
          style={this.props.myTinderStyle}
        >
          {tinder}
        </Animated.View>
      );
    }
    //      return just the tinder, without animation
    return tinder;
  }
}

const mapStateToProps = (state, ownProps) => {
  try {
    const challenges = state.challenges.challenges;
    const selectedChallengeIndex = state.challenges.selectedChallengeIndex;
    const challengeIndex = selectedChallengeIndex + ownProps.challengeOffset;
    const id = challenges[challengeIndex]._id;

    const proposalView = state.challenges.proposalView;
    const proposalListMode = state.challenges.proposalListMode;
    // all 4 lists
    const p = state.proposals[id];

    const proposals = getProposalList(p, proposalView, proposalListMode);
    const isLoading = proposals.isLoading;
    const proposal = proposals.proposals[ownProps.proposalIndex];
    return {
      proposal,
      isLoading,
    };
  } catch (e) {
    console.log('ProposalTinder');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ProposalTinder);
