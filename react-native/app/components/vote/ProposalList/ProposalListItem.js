import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import { styles } from './';
import { VoteMark } from '../VoteMark/';

class ProposalListItem extends Component {
  static propTypes = {
    data: PropTypes.object,
  };
  getAnswer() {
    let answer = '';
    if (this.props.data) {
      const winning = this.props.data.winningProposal;
      if (winning) {
        answer = winning.text;
      }
    }
    return answer;
  }

  render() {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemLeft}>
          <VoteMark size="l" active value={0} type="no" />
        </View>
        <View style={styles.itemCenter}>
          <Text style={styles.text}>
            {this.props.data.text}
          </Text>
        </View>
        <View style={styles.itemRight}>
          <VoteMark size="l" active value={0} type="yes" />
        </View>
      </View>
    );
  }
}

export default ProposalListItem;
