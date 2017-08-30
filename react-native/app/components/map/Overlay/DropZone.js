import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

import I18n from '../../../i18n/i18n';

class DropZone extends Component {
  render() {
    return (
      <View pointerEvents='none' style={styles.dropZoneContainer}>
        <View style={styles.dropZone}>
          <Text style={styles.dropZoneText}>{I18n.t('map_drop_zone')}
</Text>
        </View>
      </View>
    );
  }
}

export default DropZone;
