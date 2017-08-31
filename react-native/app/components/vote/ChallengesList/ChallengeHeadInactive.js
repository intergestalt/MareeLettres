import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import I18n from '../../../i18n/i18n';
import styles from './styles';

class ChallengeHeadInactive extends Component {
  static propTypes = {
    data: PropTypes.object,
  };

  render() {
    return (
      <View style={styles.row}>
        <Text style={styles.title}>
          {I18n.t('challenge')} #{this.props.data.voteNum}
        </Text>
        <Text style={styles.ticker}>
          {this.props.data.endString}
        </Text>
        <Text style={styles.title}>
          {this.props.data.title ? this.props.data.title.toUpperCase() : "-"}
        </Text>
        <Text style={styles.answer}>
          {this.props.data.answer}
        </Text>
      </View>
    )
  }
}


export default ChallengeHeadInactive;
