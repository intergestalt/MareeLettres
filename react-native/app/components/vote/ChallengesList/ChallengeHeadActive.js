import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import I18n from '../../../i18n/i18n';
import { getTickerString } from '../../../helper/dateFunctions';
import styles from './styles';

class ChallengeHeadActive extends Component {
  static propTypes = {
    data: PropTypes.object,
    language: PropTypes.string,
    timeLeft: PropTypes.number,
    viewMode: PropTypes.string,
    callerViewMode: PropTypes.string,
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.callerViewMode !== this.props.viewMode) {
      return false;
    }
    return true;
  }
  render() {
    I18n.locale = this.props.language;
    return (
      <View style={styles.row}>
        <Text style={styles.title}>
          {this.props.data.title ? this.props.data.title.toUpperCase() : '-'}
        </Text>
        <View style={styles.tickerContainer}>
          <Text style={styles.liveSpacer}>
            {I18n.t('live_indicator')}
          </Text>
          <Text style={styles.ticker}>
            {getTickerString(this.props.timeLeft)}
          </Text>
          <Text style={styles.live}>
            {I18n.t('live_indicator')}
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  try {
    const language = state.globals.language;
    const tickerData = state.challengesTicker;
    const entry = tickerData[ownProps.data.id];
    const viewMode = state.challenges.challengeView;
    return {
      language,
      timeLeft: entry.timeLeft,
      viewMode,
    };
  } catch (e) {
    console.log('ChallengeHeadActive');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ChallengeHeadActive);
