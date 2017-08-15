import React, { Component, PropTypes } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { ProposalListItem, styles } from './';
import { Separator } from '../ChallengesList/';

class ProposalList extends Component {
  static propTypes = {
    proposals: PropTypes.array,
  };

  render() {
    if (!this.props.proposals.isLoading && !this.props.proposals.isError) {
      return (
        <View style={styles.container}>
          <FlatList
            style={styles.container}
            data={this.props.proposals.proposals}
            renderItem={({ item }) => <ProposalListItem data={item} />}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={Separator}
          />
        </View>
      );
    }
    if (this.props.proposals.isLoading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }
    // Else: isError==true
    return (
      <View style={styles.container}>
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

  return {
    proposals,
  };
};
export default connect(mapStateToProps)(ProposalList);
