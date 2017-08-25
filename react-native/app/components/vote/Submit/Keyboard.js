import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import DraggableLetter from './DraggableLetter';

import styles from './styles';

class Keyboard extends Component {
  static propTypes = {
    letters: PropTypes.array,
    language: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const letters = this.props.letters.map(letter => <DraggableLetter {...letter} color="black" />);
    // const last_letters = letters.splice(-3);
    return (
      <View style={styles.keyboard}>
        {letters}
        <Text style={styles.letter}>
          <Text style={styles.space}>
            {'SPACE'}
          </Text>
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    const language = state.globals.language;
    return {
      language,
    };
  } catch (e) {
    console.log('Keyboard');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(Keyboard);
