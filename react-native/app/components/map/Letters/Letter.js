import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

class Letter extends Component {
  static propTypes = {
    character: PropTypes.string,
    selected: PropTypes.bool,
    main: PropTypes.bool,
  }

  render() {
    return (
      <View style = {[
        this.props.selected ? styles.selected : styles.text,
        this.props.main ? styles.main : styles.secondary,
      ]}>
        <Text>{this.props.character}</Text>
      </View>
    );
  }
};

export default Letter;
