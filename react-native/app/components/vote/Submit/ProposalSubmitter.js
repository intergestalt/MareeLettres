import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import { connect } from 'react-redux';

import styles from './styles';

import { WritingArea, Keyboard, DraggableLetter } from './index';

class ProposalSubmitter extends Component {
  static propTypes = {
    challenge: PropTypes.object,
    language: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {};
  }

  render() {
    console.log(this.props.challenge);
    const letters = this.props.challenge.letters;
    const draggableLettersProperties = [];
    for (let i = 0, len = letters.length; i < len; i++) {
      draggableLettersProperties.push({ character: letters[i], key: i });
    }

    const draggableLettersKeyboard = draggableLettersProperties;
    const draggableLettersWritingArea = draggableLettersKeyboard.splice(4, 5); // as example - put some letters on writing area
    const draggableLetterBeingDragged = draggableLettersKeyboard.splice(10, 1)[0]; // example - dragging a letter

    const title = this.props.challenge.title[this.props.language];
    return (
      <View style={styles.container}>
        {/* BackButton */}
        <WritingArea title={title} letters={draggableLettersWritingArea} />
        <Keyboard letters={draggableLettersKeyboard} />
        <DraggableLetter {...draggableLetterBeingDragged} active />
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>
            {'Submit'.toUpperCase()}
          </Text>
        </TouchableOpacity>
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
    console.log('ProposalSubmitter');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ProposalSubmitter);
