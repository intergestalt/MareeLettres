import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';

import { Letter } from '../Letters';
import I18n from '../../../i18n/i18n';

class LettersMenu extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    primary_letter: PropTypes.string,
    secondary_letters: PropTypes.array,
    letters_selected: PropTypes.object,
    map: PropTypes.object,
    user: PropTypes.object,
  };

  render() {
    const length = 4 - this.props.secondary_letters.length;
    const blanks = [];

    if (length > 0) {
      for (let i = 0; i < length; i += 1) {
        blanks.push('');
      }
    }

    const secondary_letters = this.props.secondary_letters.map((item, i) => {
      if (i < 4) {
        return (
          <Letter
            key={i}
            index={i}
            id={item._id}
            character={item.character}
            selected={this.props.letters_selected.friends[i]}
            navigation={this.props.navigation}
            />
        );
      }
    });

    const blank_letters = blanks.map((item, i) =>
      <Letter
        key={i}
        index={-1}
        id={item._id}
        character={''}
        selected={false}
        navigation={this.props.navigation}
        />
    );

    return (
      <View style={styles.letters__container}>
        <View style={styles.letters__item__you}>
          <Text style={styles.letters__label__you}>You</Text>
          <Letter
            character={this.props.primary_letter}
            selected={this.props.letters_selected.mine}
            index={-1}
            navigation={this.props.navigation}
            main
          />
        </View>
        <View style={styles.letters__item__friends}>
          <Text style={styles.letters__label__friends}>{I18n.t('map_letter_friends_label')}</Text>
          <View style={styles.letters__row}>
            { secondary_letters }
            { blank_letters }
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    const primary_letter = state.user.primary_letter.character;
    const secondary_letters = state.user.secondary_letters;
    const letters_selected = state.user.map.letters_selected;

    return {
      primary_letter,
      secondary_letters,
      letters_selected,
    };
  } catch (e) {
    console.log('LettersMenu');
    console.log(e); throw e;
  }
};

export default connect(mapStateToProps)(LettersMenu);
