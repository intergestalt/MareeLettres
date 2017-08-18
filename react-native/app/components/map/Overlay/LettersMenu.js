import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { deleteLettersProxy } from '../../../helper/userHelper.js';

// TODO break into smaller components

class LettersMenu extends Component {
  static propTypes = {
    primaryLetter: PropTypes.string,
    secondaryLetters: PropTypes.array,
    letterSelectorPress: PropTypes.func,
    shareLettersPress: PropTypes.func,
    getLettersPress: PropTypes.func,
  };

  onDeleteLettersPress() {
    deleteLettersProxy();
  }

  render() {
    const secondaryLetters = this.props.secondaryLetters;
    const length = 4 - secondaryLetters.length;
    let blankLetters = [];

    if (length > 0) {
      for (var i=0; i<length; i+=1) {
        blankLetters.push('');
      }
    }

    return (
      <View style={styles.lettersMenu}>
        <View style={styles.lettersMenuUpper}>
          <TouchableOpacity
              style={styles.lettersMenuYou}
              onPress={this.props.letterSelectorPress} >
              <Text style={styles.lettersMenuText}>You</Text>
              <View style={styles.lettersMenuYourLetter}>
                <Text>
                  {this.props.primaryLetter}
                </Text>
              </View>
          </TouchableOpacity>
          <View style={styles.lettersMenuCoworkers}>
            <Text style={styles.lettersMenuText}>{"Your friends' letters"}</Text>
            <View style={styles.lettersMenuCoworkersRow}>
              {
                secondaryLetters.map((item, i) => {
                  if (i < 4) {
                    return (
                      <View key={i} style={styles.lettersMenuCoworkersLetter}>
                        <Text>{item.character}</Text>
                      </View>
                    );
                  } else { return null; }
                })
              }
              {
                blankLetters.map((item, i) => {
                  return (
                    <View key={i} style={styles.lettersMenuCoworkersLetter}>
                      <Text>{item}</Text>
                    </View>
                  )
                })
              }
            </View>
          </View>
        </View>
        <View style={styles.lettersMenuLower}>
            <TouchableOpacity
              style={styles.lettersMenuLowerMenuItem}
              onPress={this.props.shareLettersPress}
              >
            <Text style={styles.lettersMenuText}>
              Share Your Letter
            </Text>
            </TouchableOpacity>
          <TouchableOpacity
            style={styles.lettersMenuLowerMenuItem}
            onPress={this.props.getLettersPress}
            >
            <Text style={styles.lettersMenuText}>
              Get Letters
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.lettersMenuLowerMenuItem}
            onPress={this.onDeleteLettersPress}
            >
            <Text style={styles.lettersMenuText}>
              Move Letters To Trash
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const primaryLetter = state.user.primary_letter.character;
  const secondaryLetters = state.user.secondary_letters;

  return {
    primaryLetter,
    secondaryLetters,
  }
}

export default connect(mapStateToProps)(LettersMenu);
