import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import I18n from '../../../i18n/i18n';
import styles from './styles';

class ReloadButton extends Component {
  static propTypes = {
    language: PropTypes.string,
    textKey: PropTypes.string,
    onReload: PropTypes.func,
  };

  render() {
    I18n.locale = this.props.language;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onReload}>
          <Text style={styles.text}>
            {I18n.t(this.props.textKey)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    const language = state.globals.language;

    return {
      language,
    };
  } catch (e) {
    console.log('ReloadButton');
    console.log(e);
    throw e;
  }
};

export default connect(mapStateToProps)(ReloadButton);
