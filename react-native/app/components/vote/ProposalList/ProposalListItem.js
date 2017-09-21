import React, { PureComponent, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { styles } from './';
import { VoteMark, VoteMarkPanel } from '../VoteMark/';
import { getProposalVotesWithUser } from '../../../helper/proposalsHelper';

class ProposalListItem extends PureComponent {
  static propTypes = {
    yes: PropTypes.bool,
    no: PropTypes.bool,
    votesYesOffset: PropTypes.number,
    votesNoOffset: PropTypes.number,
    proposal: PropTypes.object,
    onYesPress: PropTypes.func,
    onNoPress: PropTypes.func,
    listEnabled: PropTypes.bool,
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
    let voteMarkPanel = false;
    let yesNum = 0;
    if (this.props.yes) {
      voteMarkPanel = true;
      yesNum = 1;
    }
    let noNum = 0;
    if (this.props.no) {
      voteMarkPanel = true;
      noNum = 1;
    }
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemLeft}>
          <VoteMark
            onPress={this.props.onNoPress}
            size="m"
            active={this.props.listEnabled}
            active2
            value={noNum}
            type="no"
          />
          {/*  <TouchableOpacity onPress={this.props.onNoPress}>
            {noNum === 1
              ? <Text style={{ color: '#FF0000' }}>NO</Text>
              : <Text style={{ color: '#000000' }}>NO</Text>}
          </TouchableOpacity> */}
        </View>
        <View style={styles.itemCenter}>
          <Text style={styles.text}>{this.props.proposal.text}</Text>
          {voteMarkPanel ? (
            <VoteMarkPanel
              style={styles.voteMarkPanel}
              yes_amount={this.props.proposal.yes_votes + this.props.votesYesOffset}
              no_amount={this.props.proposal.no_votes + this.props.votesNoOffset}
            />
          ) : null}
        </View>
        <View style={styles.itemRight}>
          {/*   <TouchableOpacity onPress={this.props.onYesPress}>
            {yesNum === 1
              ? <Text style={{ color: '#88FF00' }}>YES</Text>
              : <Text style={{ color: '#000000' }}>YES</Text>}
          </TouchableOpacity> */}
          <VoteMark
            onPress={this.props.onYesPress}
            size="m"
            active={this.props.listEnabled}
            active2
            value={yesNum}
            type="yes"
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  try {
    const id = ownProps.proposal._id;
    const voteMap = getProposalVotesWithUser(id);
    return {
      yes: voteMap.yes,
      no: voteMap.no,
      votesNoOffset: voteMap.votesNoOffset,
      votesYesOffset: voteMap.votesYesOffset,
    };
  } catch (e) {
    console.log('ProposalListItem');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ProposalListItem);
