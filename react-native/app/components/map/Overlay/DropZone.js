import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import styles from './styles';

import I18n from '../../../i18n/i18n';

class DropZone extends Component {
  static propTypes = {
    language: PropTypes.string,
  };
  render() {
    I18n.locale = this.props.language;

    return (
      <View pointerEvents="none" style={styles.dropZoneContainer}>
        <View style={styles.dropZone}>
          <Text style={styles.dropZoneText}>
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    return {
      language: state.globals.language,
    };
  } catch (e) {
    console.log('DropZone');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(DropZone);
