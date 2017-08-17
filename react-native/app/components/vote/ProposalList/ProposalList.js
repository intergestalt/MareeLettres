import React, { Component, PropTypes } from 'react';
import { RefreshControl, View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { ProposalListItem, ProposalListHeader, styles } from './';
import { Separator } from '../ChallengesList/';
import { DEFAULT_PROPOSAL_LIMIT } from '../../../consts';
import { getProposalList } from '../../../helper/proposalsHelper';
import { loadProposalsServiceProxy } from '../../../helper/apiProxy';

class ProposalList extends Component {
  static propTypes = {
    challenges: PropTypes.array,
    proposals: PropTypes.object,
    selectedChallengeIndex: PropTypes.number,
    onMostPress: PropTypes.func,
    onTrendingPress: PropTypes.func,
    onNewestPress: PropTypes.func,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    isPullDownLoading: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.onPullDownRefresh = this.onPullDownRefresh.bind(this);
  }
  onPullDownRefresh() {
    const id = this.props.challenges[this.props.selectedChallengeIndex]._id;
    loadProposalsServiceProxy(id, DEFAULT_PROPOSAL_LIMIT, true, true);
  }

  render() {
    if (!this.props.isLoading && !this.props.isError) {
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
              data={this.props.proposals}
              renderItem={({ item }) => <ProposalListItem data={item} />}
              keyExtractor={item => item._id}
              ItemSeparatorComponent={Separator}
              refreshControl={
                <RefreshControl
                  refreshing={this.props.isPullDownLoading}
                  onRefresh={this.onPullDownRefresh}
                />
              }
            />
          </View>
        </View>
      );
    }
    if (this.props.isLoading) {
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
  const p2 = getProposalList(p, proposalView, proposalListMode);

  const proposals = p2.proposals;
  const isLoading = p2.isLoading;
  const isError = p2.isError;
  const isPullDownLoading = p2.isPullDownLoading;

  return {
    challenges,
    proposals,
    selectedChallengeIndex,
    isLoading,
    isError,
    isPullDownLoading,
  };
};
export default connect(mapStateToProps)(ProposalList);
