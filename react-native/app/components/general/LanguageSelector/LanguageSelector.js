import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { swapLanguage } from '../../../actions/general';

class LanguageSelector extends Component {
  static propTypes = {
    language: PropTypes.string,
    dispatch: PropTypes.func,
  };

  handleSwapLanguagePress = () => {
    this.props.dispatch(swapLanguage());
  };

  render() {
    let isEng = false;

    if (this.props.language === 'en') {
      isEng = true;
    }
    return (
      <View style={styles.container}>
        {!isEng
          ? <TouchableOpacity onPress={this.handleSwapLanguagePress}>
            <Text style={styles.paragraph}>ENG</Text>
          </TouchableOpacity>
          : <Text style={styles.paragraphHigh}>ENG</Text>}
        <Text style={styles.paragraphHigh}> / </Text>
        {isEng
          ? <TouchableOpacity onPress={this.handleSwapLanguagePress}>
            <Text style={styles.paragraph}>FR</Text>
          </TouchableOpacity>
          : <Text style={styles.paragraphHigh}>FR</Text>}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const language = state.globals.language;

  return {
    language,
  };
};
export default connect(mapStateToProps)(LanguageSelector);
