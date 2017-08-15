import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';

// TODO break into smaller components

class LettersMenu extends Component {
  static PropTypes = {
    myLetter: PropTypes.string,
    letterSelectorPress: PropTypes.func,
    shareLettersPress: PropTypes.func,
    getLettersPress: PropTypes.func,
  };

  render() {
    return (
      <View style={styles.lettersMenu}>
        <View style={styles.lettersMenuUpper}>
          <TouchableOpacity
              style={styles.lettersMenuYou}
              onPress={this.props.letterSelectorPress}
              >
              <Text style={styles.lettersMenuText}>You</Text>
              <View style={styles.lettersMenuYourLetter}>
                <Text>
                  {this.props.myLetter}
                </Text>
              </View>
          </TouchableOpacity>
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
            <TouchableOpacity
              style={styles.lettersMenuLowerMenuItem}
              onPress={this.props.shareLettersPress}
              >
            <Text style={styles.lettersMenuText}>
              Share Your Letters
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

export default connect()(LettersMenu);
