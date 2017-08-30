import React, { PureComponent, PropTypes } from 'react';
import { ActivityIndicator, RefreshControl, View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { ProposalListItem, ProposalListHeader, styles } from './';
import { Separator } from '../ChallengesList/';
import { getProposalList } from '../../../helper/proposalsHelper';
import { loadProposalsServiceProxy } from '../../../helper/apiProxy';
import { DYNAMIC_CONFIG } from '../../../config/config';
import { userVoteInternal } from '../../../actions/user';
import { deleteProposalFromTinderList } from '../../../actions/proposals';

class ProposalList extends PureComponent {
  static propTypes = {
    challenges: PropTypes.array,
    proposals: PropTypes.array,
    selectedChallengeIndex: PropTypes.number,
    onMostPress: PropTypes.func,
    onTrendingPress: PropTypes.func,
    onNewestPress: PropTypes.func,
    isPullDownLoading: PropTypes.bool,
    isPullUpLoading: PropTypes.bool,
    lastLimit: PropTypes.number,
    setFlatlistRef: PropTypes.func,
    listEnabled: PropTypes.bool,
    dispatch: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.onPullDownRefresh = this.onPullDownRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
  }
  onPullDownRefresh() {
    const id = this.props.challenges[this.props.selectedChallengeIndex]._id;

    loadProposalsServiceProxy(
      true,
      id,
      DYNAMIC_CONFIG.DEFAULT_PROPOSAL_LIST_LIMIT,
      DYNAMIC_CONFIG.LOAD_QUIET_PULL_DOWN_UPDATE.bool,
      true,
    );
  }
  onEndReached() {
    if (this.props.isPullUpLoading) {
      return;
    }
    const id = this.props.challenges[this.props.selectedChallengeIndex]._id;
    const limit = this.props.proposals.length + DYNAMIC_CONFIG.DEFAULT_PROPOSAL_NEW_BATCH;
    let force = false;
    let lastNotLoad = true;
    if (limit > this.props.lastLimit) {
      force = true;
      lastNotLoad = false;
    }

    loadProposalsServiceProxy(
      force,
      id,
      limit,
      DYNAMIC_CONFIG.LOAD_QUIET_PULL_UP_UPDATE.bool,
      false,
      true,
      lastNotLoad,
    );
  }

  onNoPress(item) {
    const proposalId = item._id;
    const challengeId = this.getChallenge()._id;
    this.onVotePress(proposalId, challengeId, false);
  }
  onYesPress(item) {
    const proposalId = item._id;
    const challengeId = this.getChallenge()._id;
    this.onVotePress(proposalId, challengeId, true);
  }
  onVotePress(proposalId, challengeId, yes) {
    this.props.dispatch(userVoteInternal(proposalId, yes));
    this.props.dispatch(deleteProposalFromTinderList(challengeId, proposalId));
  }

  getChallenge() {
    return this.props.challenges[this.props.selectedChallengeIndex];
  }
  renderFooter() {
    if (this.props.isPullUpLoading) {
      return (
        <View style={styles.listFooter}>
          <ActivityIndicator />
        </View>
      );
    }

    return null;
  }

  render() {
    let myRefCallback = null;
    if (this.props.setFlatlistRef) {
      myRefCallback = (ref) => {
        this.props.setFlatlistRef(ref);
      };
    }
    let listEnabled = null;
    if (!this.props.listEnabled) {
      listEnabled = 'none';
    }

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <ProposalListHeader
            onMostPress={this.props.onMostPress}
            onTrendingPress={this.props.onTrendingPress}
            onNewestPress={this.props.onNewestPress}
          />
        </View>
        <View pointerEvents={listEnabled} style={styles.listContainer}>
          <FlatList
            initialNumToRender={7}
            ref={myRefCallback}
            data={this.props.proposals}
            renderItem={({ item }) =>
              <ProposalListItem
                onNoPress={() => this.onNoPress(item)}
                onYesPress={() => this.onYesPress(item)}
                proposal={item}
              />}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={Separator}
            refreshControl={
              <RefreshControl
                refreshing={this.props.isPullDownLoading}
                onRefresh={this.onPullDownRefresh}
              />
            }
            onEndReachedThreshold={DYNAMIC_CONFIG.PROPOSAL_RELOAD_LIST_OFFSET}
            onEndReached={this.onEndReached}
            ListFooterComponent={this.renderFooter()}
          />
        </View>
      </View>
    );
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
    const p2 = getProposalList(p, proposalView, proposalListMode);

    const proposals = p2.proposals;
    const isPullDownLoading = p2.isPullDownLoading;
    const isPullUpLoading = p2.isPullUpLoading;
    const lastLimit = p2.lastLimit;
    return {
      challenges,
      proposals,
      selectedChallengeIndex,
      isPullDownLoading,
      isPullUpLoading,
      lastLimit,
    };
  } catch (e) {
    console.log('ProposalList');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ProposalList);
