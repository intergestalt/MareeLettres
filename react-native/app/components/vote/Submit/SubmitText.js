import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import I18n from '../../../i18n/i18n';

import styles from './styles';

class SubmitText extends Component {
  static propTypes = {
    language: PropTypes.string,
  };

  render() {
    I18n.locale = this.props.language;
    return (
      <View style={styles.keyboard}>
        <Text>!</Text>
        <Text>
          {I18n.t('submit_alert')}
        </Text>
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
    console.log('SubmitText');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(SubmitText);
