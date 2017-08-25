import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import { connect } from 'react-redux';

import styles from './styles';

class DraggableLetter extends Component {
  static propTypes = {
    character: PropTypes.string,
    active: PropTypes.bool,
    color: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Text
        style={[
          styles.letter,
          { color: this.props.color || 'grey' },
          this.props.active ? styles.letterActive : null,
        ]}
      >
        {this.props.character}
      </Text>
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
    console.log('DraggableLetter');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(DraggableLetter);
