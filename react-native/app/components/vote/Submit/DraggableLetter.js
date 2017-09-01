import React, { Component, PropTypes } from 'react';
import { Animated, Text } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';

class DraggableLetter extends Component {
  static propTypes = {
    dragQueenOffset: PropTypes.object,
    dragQueenPos: PropTypes.object,
    scaleDragQueen: PropTypes.number,
    character: PropTypes.string,
    active: PropTypes.bool,
    color: PropTypes.string,
    colorFrom: PropTypes.string,
    layoutCallback: PropTypes.func,
    opacity: PropTypes.number,
    index: PropTypes.number,
    colorScale: PropTypes.number,
    cursor: PropTypes.bool,
    cursorHidden: PropTypes.bool,
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
      cursorColor = '#aa00FF';
    }
    return (
      <Animated.View
        style={myStyle}
        onLayout={event => this.props.layoutCallback(event, this.props.index, this.props.type)}
      >
        <Text
          style={[
            styles.letter,
            { color: cursorColor || this.props.color || 'grey' },
            this.props.active ? styles.letterActive : null,
          ]}
        >
          {this.props.cursor ? this.props.character : this.props.character}
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

    return (
      <Animated.View style={myViewStyle}>
        <Animated.Text style={myLetterStyle}>
          {this.props.character}
        </Animated.Text>
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
