import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import DraggableLetter from './DraggableLetter';

import styles from './styles';

class Keyboard extends Component {
  static propTypes = {
    letters: PropTypes.array,
    language: PropTypes.string,
    layoutCallback: PropTypes.func,
    letterColor: PropTypes.string,
    spaceColor: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const letters = [];
    for (let i = 0; i < this.props.letters.length; i += 1) {
      const letter = this.props.letters[i];
      let color = this.props.letterColor;
      if (letter.space) {
        color = this.props.spaceColor;
      }
      letters.push(
        <DraggableLetter
          {...letter}
          mykey={letter.key}
          layoutCallback={this.props.layoutCallback}
          type={1}
          color={color}
        />,
      );
    }

    // const last_letters = letters.splice(-3);
    return (
      <View style={styles.keyboard}>
        {letters}
        {/* <Text style={styles.letter}>
          <Text style={styles.space}>
            {'SPACE'}
          </Text>
        </Text> */}
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
