import React, { Component, PropTypes } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';

class BackSimple extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    onPress: PropTypes.func,
    colour: PropTypes.string,
  };

  render() {
    return (
      <TouchableOpacity style={styles.containerSimple} onPress={this.props.onPress}>
        <Text style={this.props.colour === 'white' ? styles.textSimpleWhite : styles.textSimple}>
          {'<'}
        </Text>
      </TouchableOpacity>
    );
  }
};

export default BackSimple;
