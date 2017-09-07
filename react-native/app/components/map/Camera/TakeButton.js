import React, { Component, PropTypes } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { navigateToMapCamera } from '../../../helper/navigationProxy';
import styles from './styles';
import I18n from '../../../i18n/i18n';

class TakeButton extends Component {
  static PropTypes = {
    onPress: PropTypes.function,
  };

  render() {
    I18n.locale = this.props.language;
    return (
      <TouchableOpacity style={styles.take__button} onPress={this.props.onPress}>
        <Text style={styles.take__button__text}>
          {I18n.t('take_picture').toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    return {
      language: state.globals.language,
    };
  } catch (e) {
    console.log('TakeButton');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(TakeButton);
