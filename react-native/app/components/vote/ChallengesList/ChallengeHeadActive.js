import React from 'react';
import { View } from 'react-native';

import I18n from '../../../i18n/i18n';
import styles from './styles';

class ChallengesListItem extends Component {
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
        <View style={styles.tickerContainer}>
          <Text style={styles.liveSpacer}>{I18n.t('live_indicator')}</Text>
          <Text style={styles.ticker}>
            {this.props.data.tickerString}
          </Text>
          <Text style={styles.live}>{I18n.t('live_indicator')}</Text>
        </View>
        <Text style={styles.title}>
          {this.props.data.title}
        </Text>
      </View>
    )
  }
}


export default ChallengeHeadActive;
