import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import I18n from '../../../i18n/i18n';
import styles from './styles';
import { CHALLENGE_VIEWS } from '../../../consts';

class ChallengeHeadInactive extends Component {
  static propTypes = {
    data: PropTypes.object,
    language: PropTypes.string,
    viewMode: PropTypes.string,
    callerViewMode: PropTypes.string,
    tickerEntry: PropTypes.object,
    style: PropTypes.object,
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.viewMode === CHALLENGE_VIEWS.SUGGEST) {
      return false;
    }
    if (this.props.callerViewMode !== this.props.viewMode) {
      return false;
    }
    return true;
  }
  render() {
    I18n.locale = this.props.language;
    let myEndString = null;
    if (this.props.language === 'en') {
      myEndString = this.props.tickerEntry.endStringEn;
    } else {
      myEndString = this.props.tickerEntry.endStringFr;
    }
    let containerStyle = styles._row;

    if (this.props.data.url) {
      containerStyle = { ...styles._row };
    }
    return (
      <View style={[containerStyle, this.props.style]}>
        {!this.props.hideTicker ? <Text style={styles.ticker}>{myEndString}</Text> : null}
        <Text style={styles.title}>
          {this.props.data.title ? this.props.data.title.toUpperCase() : '-'}
        </Text>
        {/* {answer} */}
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  try {
    const language = state.globals.language;
    const tickerEntry = state.challengesTicker[ownProps.data.id];
    const viewMode = state.challenges.challengeView;
    return {
      language,
      tickerEntry,
      viewMode,
    };
  } catch (e) {
    console.log('ChallengeHeadInactive');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ChallengeHeadInactive);
