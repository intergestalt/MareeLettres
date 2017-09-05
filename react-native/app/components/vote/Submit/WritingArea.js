import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import DraggableLetter from './DraggableLetter';

import styles from './styles';

class WritingArea extends Component {
  static propTypes = {
    title: PropTypes.string,
    language: PropTypes.string,
    letterColor: PropTypes.string,
    letters: PropTypes.array,
    layoutCallback: PropTypes.func,
    onLayoutCallbackWritingArea: PropTypes.func,
    onLayoutCallbackWritingArea1: PropTypes.func,
    onLayoutCallbackWritingArea2: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const letters = [];

    for (let i = 0; i < this.props.letters.length; i += 1) {
      const letter = this.props.letters[i];
      letters.push(
        <DraggableLetter
          {...letter}
          mykey={letter.key}
          layoutCallback={this.props.layoutCallback}
          type={0}
          color={this.props.letterColor}
        />,
      );
    }
    return (
      <View
        onLayout={event => this.props.onLayoutCallbackWritingArea(event)}
        style={styles.writingArea}
      >
        <Text style={styles.title}>
          {this.props.title.toUpperCase()}
        </Text>
        <View
          onLayout={event => this.props.onLayoutCallbackWritingArea1(event)}
          style={styles.writingAreaContentContainer}
        >
          <View
            onLayout={event => this.props.onLayoutCallbackWritingArea2(event)}
            style={styles.writingAreaContent}
          >
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
