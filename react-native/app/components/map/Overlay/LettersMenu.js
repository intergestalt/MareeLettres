import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';

import { Letter } from '../Letters';

import { deleteLettersProxy, updateLetterMenuProxy, wipeLetterMenuProxy } from '../../../helper/userHelper.js';
import { putLetterOnMapProxy } from '../../../helper/lettersHelper.js';
import { navigateToLetterSelector } from '../../../helper/navigationProxy';

class LettersMenu extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    primaryLetter: PropTypes.string,
    secondaryLetters: PropTypes.array,
    letterSelectorPress: PropTypes.func,
    shareLettersPress: PropTypes.func,
    getLettersPress: PropTypes.func,
    map: PropTypes.object,
    user: PropTypes.object,
  };

  handleLetterSelectorPress() {
    navigateToLetterSelector(this.props);
  }

  handleLetterPress(index, character) {
    putLetterOnMapProxy(character, this.props.user);
    updateLetterMenuProxy(index);
  }

  render() {
    const map = this.props.map;
    const secondaryLetters = this.props.secondaryLetters;
    const length = 4 - secondaryLetters.length;

    let blankLetters = [];

    if (length > 0) {
      for (var i=0; i<length; i+=1) {
        blankLetters.push('');
      }
    }

    return (
      <View style={styles.letters__container}>
        <View style={styles.letters__item__you}>
          <Text style={styles.letters__label__you}>You</Text>
          <Letter
            character={this.props.primaryLetter}
            selected={map.lettersSelected.mine}
            main
            />
        </View>
        <View style={styles.letters__item__friends}>
          <Text style={styles.letters__label__friends}>Letters from friends</Text>
          <View style={styles.letters__row}>
            {
              secondaryLetters.map((item, i) => {
                if (i < 4) {
                  return (
                    <Letter
                      key = {i}
                      character = {item.character}
                      selected = {map.lettersSelected.friends[i]}
                      />
                  );
                }
              })
            }
            {
              blankLetters.map((item, i) => {
                <Letter
                  key = {i}
                  character = {''}
                  selected = {false}
                  />
              })
            }
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const primaryLetter = state.user.primary_letter.character;
  const secondaryLetters = state.user.secondary_letters;
  const map = state.user.map;
  const user = state.user;

  return {
    primaryLetter,
    secondaryLetters,
    map,
    user,
  }
}

export default connect(mapStateToProps)(LettersMenu);
