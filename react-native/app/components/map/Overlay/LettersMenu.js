import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

// TODO break into smaller components

class LettersMenu extends Component {
  render() {
    return (
      <View style={styles.lettersMenu}>
        <View style={styles.lettersMenuUpper}>
          <View style={styles.lettersMenuYou}>
            <Text style={styles.lettersMenuText}>You</Text>
            <View style={styles.lettersMenuYourLetter}>
            </View>
          </View>
          <View style={styles.lettersMenuCoworkers}>
            <Text style={styles.lettersMenuText}>Your friends</Text>
            <View style={styles.lettersMenuCoworkersRow}>
              <View style={styles.lettersMenuCoworkersLetter} />
              <View style={styles.lettersMenuCoworkersLetter} />
              <View style={styles.lettersMenuCoworkersLetter} />
              <View style={styles.lettersMenuCoworkersLetter} />
            </View>
          </View>
        </View>
        <View style={styles.lettersMenuLower}>
          <View style={styles.lettersMenuLowerMenuItem}>
            <Text style={styles.lettersMenuText}>
              Share Your Letters
            </Text>
          </View>
          <View style={styles.lettersMenuLowerMenuItem}>
            <Text style={styles.lettersMenuText}>
              Get Letters
            </Text>
          </View>
          <View style={styles.lettersMenuLowerMenuItem}>
            <Text style={styles.lettersMenuText}>
              Move Letters To Trash
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default LettersMenu;
