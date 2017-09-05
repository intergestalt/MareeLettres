import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';

import { LetterHolster } from '../Letters';
import I18n from '../../../i18n/i18n';

class LettersMenu extends Component {
  static propTypes = {
    language: PropTypes.string,
  };
  render() {
    I18n.locale = this.props.language;
    return (
      <View style={styles.letters__container}>
        <View style={styles.letters__item__you}>
          <Text style={styles.letters__label__you}>
            {I18n.t('map_you_label')}
          </Text>
          <LetterHolster main />
        </View>
        <View style={styles.letters__item__friends}>
          <Text style={styles.letters__label__friends}>
            {I18n.t('map_letter_friends_label')}
          </Text>
          <View style={styles.letters__row}>
            <LetterHolster />
            <LetterHolster />
            <LetterHolster />
            <LetterHolster />
          </View>
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
    console.log('LettersMenu');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(LettersMenu);
