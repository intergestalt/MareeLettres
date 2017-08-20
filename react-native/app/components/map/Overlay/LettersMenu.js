import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';

import { Letter } from '../Letters';

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
    let length = 4 - this.props.secondary_letters.length;
    let blank_letters = [];

    if (length > 0) {
      for (var i=0; i<length; i+=1) {
        blank_letters.push('');
      }
    }

    return (
      <View style={styles.letters__container}>
        <View style={styles.letters__item__you}>
          <Text style={styles.letters__label__you}>You</Text>
          <Letter
            character = {this.props.primary_letter}
            selected = {this.props.letters_selected.mine}
            index = {-1}
            navigation = {this.props.navigation}
            main
            />
        </View>
        <View style={styles.letters__item__friends}>
          <Text style={styles.letters__label__friends}>Letters from friends</Text>
          <View style={styles.letters__row}>
            {
              this.props.secondary_letters.map((item, i) => {
                if (i < 4) {
                  return (
                    <Letter
                      key = {i}
                      index = {i}
                      id = {item._id}
                      character = {item.character}
                      selected = {this.props.letters_selected.friends[i]}
                      />
                  );
                }
              })
            }
            {
              blank_letters.map((item, i) => {
                return (
                  <Letter
                    key = {i}
                    index = {-1}
                    id = {item._id}
                    character = {''}
                    selected = {false}
                    />
                )
              })
            }
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const primary_letter = state.user.primary_letter.character;
  const secondary_letters = state.user.secondary_letters;
  const letters_selected = state.user.map.letters_selected;

  return {
    primary_letter, secondary_letters, letters_selected
  }
}

export default connect(mapStateToProps)(LettersMenu);
