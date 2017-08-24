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
    const input = state.user.origin_id;

    return {
      input,
    };
  } catch (e) {
    console.log('QRCodeBox');
    console.log(e); throw e;
  }
};

export default connect(mapStateToProps)(QRCodeBox);
