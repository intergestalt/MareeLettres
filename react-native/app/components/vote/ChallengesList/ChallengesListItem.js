import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import I18n from '../../../i18n/i18n';

import { ChallengeHeadActive, ChallengeHeadInactive } from './';

import styles from './styles';

class ChallengesListItem extends Component {
  static propTypes = {
    data: PropTypes.object,
    tickerEntry: PropTypes.object,
    onPress: PropTypes.func,
    language: PropTypes.string,
  };
  /* shouldComponentUpdate(nextProps, nextState) {
    if (this.props.tickerEntry !== nextProps.tickerEntry) {
      console.log(`YES ${this.props.data.index}`);
      return true;
    }
    console.log(`NO ${this.props.data.index}`);
    return false;
  } */
  render() {
    console.log(`RENDER LIST ITEM ${this.props.data.index}`);
    return (
      <View style={styles.itemContainer}>
        {!this.props.data.isLoading
          ? <TouchableOpacity onPress={this.props.onPress}>
            {!this.props.tickerEntry.finished
                ? <ChallengeHeadActive data={this.props.data} />
                : <ChallengeHeadInactive data={this.props.data} />}
          </TouchableOpacity>
          : <View style={styles.row}>
            <Text style={styles.title}>RELOAD ITEM</Text>
          </View>}
      </View>
    );
  }
}
/*    console.log(`RENDER LIST ITEM ${this.props.data.title}`);


          */
const mapStateToProps = (state, ownProps) => {
  try {
    const language = state.globals.language;
    const tickerEntry = state.challengesTicker[ownProps.data.id];
    return {
      language,
      tickerEntry,
    };
  } catch (e) {
    console.log('ChallengesListItem');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ChallengesListItem);
