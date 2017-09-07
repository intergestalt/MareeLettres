import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import I18n from '../../../i18n/i18n';
import styles from './styles';

class ChallengeHeadInactive extends Component {
  static propTypes = {
    data: PropTypes.object,
    language: PropTypes.string,
    tickerEntry: PropTypes.object,
  };

  render() {
    I18n.locale = this.props.language;
    let myEndString = null;
    if (this.props.language === 'en') {
      myEndString = this.props.tickerEntry.endStringEn;
    } else {
      myEndString = this.props.tickerEntry.endStringFr;
    }
    console.log('RENDER HEAD INACTIVE');
    return (
      <View style={styles.row}>
        <Text style={styles.title}>
          {this.props.data.title ? this.props.data.title.toUpperCase() : '-'}
        </Text>
        <Text style={styles.ticker}>
          {myEndString}
        </Text>
        <Text style={styles.answer}>
          {this.props.data.answer}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  try {
    const language = state.globals.language;
    const tickerEntry = state.challengesTicker[ownProps.data.id];
    return {
      language,
      tickerEntry,
    };
  } catch (e) {
    console.log('ChallengeHeadInactive');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ChallengeHeadInactive);
