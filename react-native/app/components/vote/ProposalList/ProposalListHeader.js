import React, { PureComponent, PropTypes } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { connect } from 'react-redux';

import { styles } from './';
import { PROPOSAL_LIST_MODES } from '../../../consts';

import I18n from '../../../i18n/i18n';

class ProposalListHeader extends PureComponent {
  static propTypes = {
    onMostPress: PropTypes.func,
    onNewestPress: PropTypes.func,
    onTrendingPress: PropTypes.func,
    proposalListMode: PropTypes.string,
    language: PropTypes.string,
  };

  render() {
    I18n.locale = this.props.language;
    let most = (
      <TouchableOpacity onPress={this.props.onMostPress}>
        <Text style={styles.listHeaderLink}>
          {I18n.t('proposal_list_header_most')}
        </Text>
      </TouchableOpacity>
    );
    let newest = (
      <TouchableOpacity onPress={this.props.onNewestPress}>
        <Text style={styles.listHeaderLink}>
          {I18n.t('proposal_list_header_newest')}
        </Text>
      </TouchableOpacity>
    );
    let trending = (
      <TouchableOpacity onPress={this.props.onTrendingPress}>
        <Text style={styles.listHeaderLink}>
          {I18n.t('proposal_list_header_trending')}
        </Text>
      </TouchableOpacity>
    );

    if (this.props.proposalListMode === PROPOSAL_LIST_MODES.MOST) {
      most = (
        <Text style={styles.listHeaderText}>
          {I18n.t('proposal_list_header_most')}
        </Text>
      );
    } else if (this.props.proposalListMode === PROPOSAL_LIST_MODES.NEWEST) {
      newest = (
        <Text style={styles.listHeaderText}>
          {I18n.t('proposal_list_header_newest')}
        </Text>
      );
    } else if (this.props.proposalListMode === PROPOSAL_LIST_MODES.TRENDING) {
      trending = (
        <Text style={styles.listHeaderText} t>
          {I18n.t('proposal_list_header_trending')}
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
  try {
    return {
      language: state.globals.language,
    };
  } catch (e) {
    console.log('ProposalListHeader');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ProposalListHeader);
