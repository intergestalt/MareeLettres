import React, { Component, PropTypes } from 'react';
import { Animated, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { VoteMark } from '../VoteMark/';
import { getProposalList } from '../../../helper/proposalsHelper';
import { ReloadButton } from '../../../components/general/ReloadButton';

import I18n from '../../../i18n/i18n';
import { connectAlert } from '../../../components/general/Alert';
import { setUserVoteTutorialStatusProxy } from '../../../helper/userHelper';

class ProposalTinder extends Component {
  static propTypes = {
    panResponderContent: PropTypes.object,
    myTinderStyle: PropTypes.array,
    proposalIndex: PropTypes.number,
    proposal: PropTypes.object,
    noOpacity: PropTypes.object,
    yesOpacity: PropTypes.object,
    yesPress: PropTypes.func,
    noPress: PropTypes.func,
    isLoading: PropTypes.bool,
    challengeOffset: PropTypes.number,
    textColor: PropTypes.object,
    tinderBackgroundColor: PropTypes.object,
  };

  componentWillMount() {
    if (this.props.challengeOffset === 0) {
      if (!this.props.voteTutorialStatus.tinder1) {
        this.props.alertWithType(
          'info',
          I18n.t('vote_tutorial_2_title'),
          I18n.t('vote_tutorial_2_text'),
        );
        setUserVoteTutorialStatusProxy('tinder1');
      }
    }
  }

  renderIsLoading() {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={{ flex: 1 }} />
      </View>
    );
  }
  renderNoTinder(myStyle) {
    return (
      <View style={myStyle}>
        <ReloadButton textKey="reload_proposals_tinder" onReload={null} />
      </View>
    );
  }

  render() {
    I18n.locale = this.props.language;
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
        <View style={styles.markContainer1}>
          <View style={styles.markContainer2}>
            <VoteMark size="l" active={false} value={0} type="no" />
          </View>
          <View style={styles.markContainer2}>
            <Animated.View style={{ opacity: this.props.noOpacity }}>
              <VoteMark size="l" active2 value={1} type="no" />
            </Animated.View>
          </View>
        </View>
      );
      yesContainer = (
        <View style={styles.markContainer1}>
          <View style={styles.markContainer2}>
            <VoteMark size="l" active={false} value={0} type="yes" />
          </View>
          <View style={styles.markContainer2}>
            <Animated.View style={{ opacity: this.props.yesOpacity }}>
              <VoteMark size="l" active2 value={1} type="yes" />
            </Animated.View>
          </View>
        </View>
      );
    } else if (proposalExists) {
      // Background or neighbour (not visible, but rendered to swipe challenges left and right)
      // => One Votemark, no AnimatedView
      textContainer = <Text style={styles.text}>{this.props.proposal.text}</Text>;
      noContainer = (
        <View style={styles.markContainer1}>
          <View style={styles.markContainer2}>
            <VoteMark size="l" active value={0} type="no" />
          </View>
        </View>
      );
      yesContainer = (
        <View style={styles.markContainer1}>
          <View style={styles.markContainer2}>
            <VoteMark size="l" active value={0} type="yes" />
          </View>
        </View>
      );
    }

    let tinder = null;
    if (proposalExists) {
      if (!this.props.tinderBackgroundColor || !center) {
        tinder = (
          <View style={myStyle}>
            <View style={styles.topContainer}>
              {textContainer}
              {/* <VoteMarkPanel style={styles.voteMark} yes_amount={this.props.proposal.yes_votes} no_amount={this.props.proposal.no_votes} /> */}
            </View>
            <View style={styles.bottomContainer}>
              <TouchableOpacity onPress={this.props.noPress}>{noContainer}</TouchableOpacity>
              <TouchableOpacity onPress={this.props.yesPress}>{yesContainer}</TouchableOpacity>
            </View>
          </View>
        );
      } else {
        tinder = (
          <Animated.View
            style={[
              styles.containerBackground,
              { backgroundColor: this.props.tinderBackgroundColor },
            ]}
          >
            <View style={styles.topContainer}>
              {textContainer}
              {/* <VoteMarkPanel style={styles.voteMark} yes_amount={this.props.proposal.yes_votes} no_amount={this.props.proposal.no_votes} /> */}
            </View>
            <View style={styles.bottomContainer}>
              {noContainer}
              {yesContainer}
            </View>
          </Animated.View>
        );
      }
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

    // Return just the tinder
    return tinder;
  }
}

const mapStateToProps = (state, ownProps) => {
  try {
    const challenges = state.challenges.challenges;
    const selectedChallengeIndex = state.challenges.selectedChallengeIndex;
    const challengeIndex = selectedChallengeIndex + ownProps.challengeOffset;
    const id = challenges[challengeIndex]._id;
    const challenge = challenges[challengeIndex];
    const proposalView = challenge.proposalView;
    const proposalListMode = challenge.proposalListMode;
    // all 4 lists
    const p = state.proposals[id];

    const proposals = getProposalList(p, proposalView, proposalListMode);
    let isLoading = true;
    let proposal = null;
    if (proposals) {
      isLoading = proposals.isLoading;
      proposal = proposals.proposals[ownProps.proposalIndex];
    }
    return {
      proposal,
      isLoading,
      language: state.globals.language,
      voteTutorialStatus: state.user.voteTutorialStatus,
    };
  } catch (e) {
    console.log('ProposalTinder');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(connectAlert(ProposalTinder));
