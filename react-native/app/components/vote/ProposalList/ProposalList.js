import React, { Component, PropTypes } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { ProposalListItem, ProposalListHeader, styles } from './';
import { Separator } from '../ChallengesList/';

import { getProposalList } from '../../../helper/proposalsHelper';

class ProposalList extends Component {
  static propTypes = {
    proposals: PropTypes.object,
    onMostPress: PropTypes.func,
    onTrendingPress: PropTypes.func,
    onNewestPress: PropTypes.func,
  };

  render() {
    if (!this.props.proposals.isLoading && !this.props.proposals.isError) {
      return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <ProposalListHeader
              onMostPress={this.props.onMostPress}
              onTrendingPress={this.props.onTrendingPress}
              onNewestPress={this.props.onNewestPress}
            />
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={this.props.proposals.proposals}
              renderItem={({ item }) => <ProposalListItem data={item} />}
              keyExtractor={item => item._id}
              ItemSeparatorComponent={Separator}
            />
          </View>
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
  const proposalView = state.globals.proposalView;
  const proposalListMode = state.globals.proposalListMode;
  // all 4 lists
  const p = state.proposals[id];
  const proposals = getProposalList(p, proposalView, proposalListMode);

  return {
    proposals,
  };
};
export default connect(mapStateToProps)(ProposalList);
