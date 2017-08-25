import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import { connect } from 'react-redux';

import DraggableLetter from './DraggableLetter';

import styles from './styles';

class WritingArea extends Component {
  static propTypes = {
    title: PropTypes.string,
    language: PropTypes.string,
    letters: PropTypes.array,
  };

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const letters = this.props.letters.map(letter => <DraggableLetter {...letter} color="white" />);
    return (
      <View style={styles.writingArea}>
        <Text style={styles.title}>
          {this.props.title.toUpperCase()}
        </Text>
        <View style={styles.writingAreaContentContainer}>
          <View style={styles.writingAreaContent}>
            {letters}
          </View>
        </View>
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
    console.log('WritingArea');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(WritingArea);
