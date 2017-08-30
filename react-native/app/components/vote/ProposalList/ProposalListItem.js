import React, { PureComponent, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { styles } from './';
import { VoteMark, VoteMarkPanel } from '../VoteMark/';

class ProposalListItem extends PureComponent {
  static propTypes = {
    yes: PropTypes.bool,
    no: PropTypes.bool,
    votesYesOffset: PropTypes.number,
    votesNoOffset: PropTypes.number,
    proposal: PropTypes.object,
    onYesPress: PropTypes.func,
    onNoPress: PropTypes.func,
  };
  /* getAnswer() {
    let answer = '';
    if (this.props.proposal) {
      const winning = this.props.proposal.winningProposal;
      if (winning) {
        answer = winning.text;
      }
    }
    return answer;
  } */

  render() {
    let yesNum = 0;
    if (this.props.yes) {
      yesNum = 1;
    }
    let noNum = 0;
    if (this.props.no) {
      noNum = 1;
    }
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemLeft}>
          <VoteMark onPress={this.props.onNoPress} size="l" active value={noNum} type="no" />
          {/*  <TouchableOpacity onPress={this.props.onNoPress}>
            {noNum === 1
              ? <Text style={{ color: '#FF0000' }}>NO</Text>
              : <Text style={{ color: '#000000' }}>NO</Text>}
          </TouchableOpacity> */}
        </View>
        <View style={styles.itemCenter}>
          <Text style={styles.text}>
            {this.props.proposal.text}
          </Text>
          <VoteMarkPanel
            style={styles.voteMarkPanel}
            yes_amount={this.props.proposal.yes_votes + this.props.votesYesOffset}
            no_amount={this.props.proposal.no_votes + this.props.votesNoOffset}
          />
        </View>
        <View style={styles.itemRight}>
          {/*   <TouchableOpacity onPress={this.props.onYesPress}>
            {yesNum === 1
              ? <Text style={{ color: '#88FF00' }}>YES</Text>
              : <Text style={{ color: '#000000' }}>YES</Text>}
          </TouchableOpacity> */}
          <VoteMark onPress={this.props.onYesPress} size="l" active value={yesNum} type="yes" />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  try {
    const votes = state.user.votes;
    const internalVotes = state.user.internalVotes.internalVotes;

    const id = ownProps.proposal._id;
    const vote = votes[id];
    const internalVote = internalVotes[id];
    let votesYesOffset = 0;
    let votesNoOffset = 0;
    let yes = false;
    let no = false;
    // Set the offset also in case of votes already sent.
    // User-Votes are deleted internaly after every load
    if (vote) {
      if (vote.bool) {
        yes = true;
        no = false;
        votesYesOffset = 1;
        votesNoOffset = 0;
      } else {
        yes = false;
        no = true;
        votesNoOffset = 1;
        votesYesOffset = 0;
      }
    }
    if (internalVote) {
      if (internalVote.bool) {
        yes = true;
        no = false;
        votesYesOffset = 1;
        votesNoOffset = 0;
      } else {
        votesNoOffset = 1;
        votesYesOffset = 0;
        yes = false;
        no = true;
      }
    }
    return {
      yes,
      no,
      votesNoOffset,
      votesYesOffset,
    };
  } catch (e) {
    console.log('ProposalListItem');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ProposalListItem);
