import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import styles from './styles';

class LetterHolster extends Component {
  static PropTypes = {
    main: PropTypes.bool,
  }

  render() {
    return (
      <View style={
        this.props.main
          ? styles.container_main
          : styles.container_secondary
        } />
    )
  }
}

export default LetterHolster;
