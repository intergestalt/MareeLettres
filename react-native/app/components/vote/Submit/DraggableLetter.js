import React, { Component, PropTypes } from 'react';
import { Animated, Text } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';

class DraggableLetter extends Component {
  static propTypes = {
    dragQueenOffset: PropTypes.object,
    dragQueenPos: PropTypes.object,
    scaleDragQueen: PropTypes.object,
    character: PropTypes.string,
    color: PropTypes.string,
    colorFrom: PropTypes.string,
    layoutCallback: PropTypes.func,
    opacity: PropTypes.number,
    colorScale: PropTypes.object,
    cursor: PropTypes.bool,
    cursorHidden: PropTypes.bool,
    space: PropTypes.bool,
    mykey: PropTypes.number,
    type: PropTypes.number, // 0=Writingarea, 1=Keyboard, 2=Dragqueen
  };

  constructor(props) {
    super(props);
    if (this.props.dragQueenOffset) {
      this.state = {
        dragQueenOffset: this.props.dragQueenOffset,
        dragQueenPos: this.props.dragQueenPos,
      };
    }
  }
  renderGridLetter() {
    let myStyle = {
      opacity: this.props.opacity,
    };
    // overrid n case of letter is cursor
    let cursorColor = null;
    let opacity = 0.7;
    if (this.props.cursorHidden) opacity = 0;
    if (this.props.cursor) {
      myStyle = {
        opacity,
        backgroundColor: 'transparent',
        transform: [
          {
            scale: 1,
          },
        ],
      };
      cursorColor = styles._cursor.color;
    }
    let myCharacter = this.props.character;
    if (this.props.space && this.props.type === 1) {
      myCharacter = 'SPACE';
      myStyle = { ...myStyle, opacity: 1 };
    }
    if (this.props.space && this.props.cursor && this.props.type === 0) {
      myCharacter = '_';
    }
    return (
      <Animated.View
        style={myStyle}
        onLayout={event => this.props.layoutCallback(event, this.props.mykey)}
      >
        <Text style={[styles.letter, { color: cursorColor || this.props.color }]}>
          {this.props.cursor ? myCharacter : myCharacter}
        </Text>
      </Animated.View>
    );
  }

  renderDragQueen() {
    const colour = this.props.colorScale.interpolate({
      inputRange: [0, 1],
      outputRange: [this.props.colorFrom, '#F58466'],
    });

    const myLetterStyle = [styles.letter, styles.letterActive, { color: colour }];
    const myViewStyle = [
      styles.letterContainer,
      {
        transform: [
          {
            scale: this.props.scaleDragQueen,
          },
          {
            translateX: this.state.dragQueenOffset.x,
          },
          {
            translateY: this.state.dragQueenOffset.y,
          },
        ],
        left: this.state.dragQueenPos.x,
        top: this.state.dragQueenPos.y,
      },
    ];
    let myCharacter = this.props.character;
    if (this.props.space) {
      myCharacter = 'SPACE';
    }
    return (
      <Animated.View
        onLayout={event => this.props.layoutCallback(event, this.props.mykey)}
        style={myViewStyle}
      >
        <Animated.Text style={myLetterStyle}>{myCharacter}</Animated.Text>
      </Animated.View>
    );
  }
  render() {
    // If it part of a grid
    if (this.props.type < 2) {
      return this.renderGridLetter();
    }

    // This is the DragQueen
    return this.renderDragQueen();
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
