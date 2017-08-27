import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode';

import styles from './styles';

// import QRCode from 'react-native-qrcode';

class QRCodeBox extends Component {
  static PropTypes = {
    input: PropTypes.string,
  };

  render() {
    return (
      <View>
        <QRCode value={this.props.input} size={220} bgColor="black" fgColor="white" />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    // TODO map to user state.user.origin_id; or transaction id
    const salt = '1337_SALT';
    const input = state.user.primary_letter.character + salt;

    return {
      input,
    };
  } catch (e) {
    console.log('QRCodeBox');
    console.log(e); throw e;
  }
};

export default connect(mapStateToProps)(QRCodeBox);
