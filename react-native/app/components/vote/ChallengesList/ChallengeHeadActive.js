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
  };

  render() {
    I18n.locale = this.props.language;
    console.log(`RENDER HEAD ACTIVE ${this.props.data.index}`);
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
    return {
      language,
      timeLeft: entry.timeLeft,
    };
  } catch (e) {
    console.log('ChallengeHeadActive');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ChallengeHeadActive);
