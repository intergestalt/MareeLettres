import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import QRCodeBox from './QRCode';
import { BackSimple } from '../../general/BackButton';

import styles from './styles';

import { navigateToMapOverview } from '../../../helper/navigationProxy';

import I18n from '../../../i18n/i18n';

class QRCodeSendScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  handleBackPress() {
    navigateToMapOverview(this.props);
  };

  render() {
    return (
      <View style={styles.container}>
        <BackSimple onPress={() => this.handleBackPress()} />
        <Text style={styles.text}>
          {I18n.t('map_show_qr_instruction')}
        </Text>
        <QRCodeBox />
      </View>
    );
  }
}


export default connect()(QRCodeSendScreen);
