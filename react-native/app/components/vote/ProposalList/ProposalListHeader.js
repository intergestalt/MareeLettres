import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { connect } from 'react-redux';

import { styles } from './';
import { PROPOSAL_LIST_MODES } from '../../../consts';

class ProposalListHeader extends Component {
  static propTypes = {
    onMostPress: PropTypes.func,
    onNewestPress: PropTypes.func,
    onTrendingPress: PropTypes.func,
    proposalListMode: PropTypes.string,
  };

  render() {
    let most = (
      <TouchableOpacity onPress={this.props.onMostPress}>
        <Text style={styles.listHeaderLink}>Most Votes</Text>
      </TouchableOpacity>
    );
    let newest = (
      <TouchableOpacity onPress={this.props.onNewestPress}>
        <Text style={styles.listHeaderLink}>Newest</Text>
      </TouchableOpacity>
    );
    let trending = (
      <TouchableOpacity onPress={this.props.onTrendingPress}>
        <Text style={styles.listHeaderLink}>Trending</Text>
      </TouchableOpacity>
    );

    if (this.props.proposalListMode === PROPOSAL_LIST_MODES.MOST) {
      most = <Text style={styles.listHeaderText}>Most Votes</Text>;
    } else if (this.props.proposalListMode === PROPOSAL_LIST_MODES.NEWEST) {
      newest = <Text style={styles.listHeaderText}>Newest</Text>;
    } else if (this.props.proposalListMode === PROPOSAL_LIST_MODES.TRENDING) {
      trending = (
        <Text style={styles.listHeaderText} t>
          Trending
        </Text>
      );
    }

    return (
      <View style={styles.listHeader}>
        {most}
        <Text>|</Text>
        {newest}
        <Text>|</Text>
        {trending}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const proposalListMode = state.globals.proposalListMode;

  return {
    proposalListMode,
  };
};
export default connect(mapStateToProps)(ProposalListHeader);
