import React, { PureComponent, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { styles } from './';
import { VoteMark } from '../VoteMark/';

class ProposalListItem extends PureComponent {
  static propTypes = {
    yes: PropTypes.bool,
    no: PropTypes.bool,
    data: PropTypes.object,
    onYesPress: PropTypes.func,
    onNoPress: PropTypes.func,
  };
  /* getAnswer() {
    let answer = '';
    if (this.props.data) {
      const winning = this.props.data.winningProposal;
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
            {this.props.data.text}
          </Text>
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

    const id = ownProps.data._id;
    const vote = votes[id];
    const internalVote = internalVotes[id];
    let yes = false;
    let no = false;
    if (vote) {
      if (vote.bool) {
        yes = true;
        no = false;
      } else {
        yes = false;
        no = true;
      }
    }
    if (internalVote) {
      if (internalVote.bool) {
        yes = true;
        no = false;
      } else {
        yes = false;
        no = true;
      }
    }
    return {
      yes,
      no,
    };
  } catch (e) {
    console.log('ProposalListItem');
    console.log(e); throw e;
  }
};
export default connect(mapStateToProps)(ProposalListItem);
