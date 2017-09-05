import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';

import { LetterHolster } from '../Letters';
import I18n from '../../../i18n/i18n';

class LettersMenu extends Component {
  render() {
    return (
      <View style={styles.letters__container}>
        <View style={styles.letters__item__you}>
          <Text style={styles.letters__label__you}>You</Text>
          <LetterHolster main/>
        </View>
        <View style={styles.letters__item__friends}>
          <Text style={styles.letters__label__friends}>{I18n.t('map_letter_friends_label')}</Text>
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

export default LettersMenu;
