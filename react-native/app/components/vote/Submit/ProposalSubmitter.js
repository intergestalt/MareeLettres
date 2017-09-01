import React, { Component, PropTypes } from 'react';
import { Animated, PanResponder, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';

import { WritingArea, Keyboard, DraggableLetter } from './index';
import { getDuration } from '../../../helper/helper';

const colorWriteArea = '#FFFFFF';
const colorKeyBoard = '#000000';

class ProposalSubmitter extends Component {
  static propTypes = {
    challenge: PropTypes.object,
    language: PropTypes.string,
  };

  constructor(props) {
    super(props);
    console.log('CONSTRUCTOR');
    this.submitPressed = this.submitPressed.bind(this);
    this.onLayoutCallback = this.onLayoutCallback.bind(this);
    // This Layout infos of the letter container.
    // Ofsett to determine the cursor pos and the letter pos... Hate it!
    // The whole writing area
    this.onLayoutCallbackWritingArea = this.onLayoutCallbackWritingArea.bind(this);
    // the first inner container
    this.onLayoutCallbackWritingArea1 = this.onLayoutCallbackWritingArea1.bind(this);
    // The second inner container
    this.onLayoutCallbackWritingArea2 = this.onLayoutCallbackWritingArea2.bind(this);

    // all letters from challenge
    const letters = this.props.challenge.letters;
    const draggableLettersProperties = [];
    // convert them
    for (let i = 0, len = letters.length; i < len; i += 1) {
      draggableLettersProperties.push({ character: letters[i], key: i, opacity: 1, cursor: false });
    }

    // insert them to the array of actually used letters
    const draggableLettersKeyboard = draggableLettersProperties;
    // JUst not to have an empty writing area DELETE THIS AFTERWARTS
    const draggableLettersWritingArea = draggableLettersKeyboard.splice(4, 5);
    // No letter is dragged at the beginning
    const dragQueen = null;
    // Arrays for the layout callback: To determin the pos of all letters.
    this.layoutWritingArea = new Array(200);
    this.layoutKeyboard = new Array(200); // letters.length);
    // Will be overwritten by container layout callbacks
    this.writingAreaOffsetY = 0;
    this.writingArea1OffsetY = 0;
    this.writingArea2OffsetY = 0;
    this.touchStartX = -1;
    this.touchStartY = -1;
    this.fireRelease = false;

    this.state = {
      dragPressed: false, // if the queen ist choosen, but not necessarly moved
      dragPressedFinished: false,
      dragQueenOffset: new Animated.ValueXY({ x: 0, y: 0 }), // dx & dy of a dragQueen
      dragQueenPos: new Animated.ValueXY({ x: 0, y: 0 }), // start position of a dragQueen
      initialDragQueenX: 0, // Why ever, but animated value is not working to calculate things...
      initialDragQueenY: 0,
      draggableLettersKeyboard, // Array to be displayed in Keyboard. (TODO: No Spaces, but one)
      draggableLettersWritingArea, // Array to be displayed in writing area (TODO: Also spaces)
      dragQueen, // null if there is no dragQueen
      dragQueenType: -1, // Type of the dragged Queen. 0: writing area, 1: Keyboard
      dragQueenIndex: -1, // Index in the arrays of letters (Keybard or TextWritingarea)
      scaleDragQueen: new Animated.Value(1), // JUst to animate the queen.
      colorScale: new Animated.Value(0),
      colorFrom: colorKeyBoard,
      cursorType: -1,
      cursorIndex: -1,
    };

    this.panResponder = this.createPanResponder();
  }

  // Letter was pressed, not moved and released
  // JUst rescale and recolor and show the letter again in the keyboard or writinarea.
  // Also remove the dragqueen.
  onLetterReleased(dx, dy) {
    console.log('RELEASE 2');
    const letterPos = this.getLetterPos(this.state.cursorType, this.state.cursorIndex);
    let newDx = letterPos.x - this.state.initialDragQueenX;
    let newDy = letterPos.y - this.state.initialDragQueenY;

    const distX = newDx - dx;
    const distY = newDy - dy;
    const duration = getDuration(distX, distY);
    newDy /= 2;
    newDx /= 2;
    if (this.state.dragPressedFinished) {
      console.log('YES');
      Animated.timing(this.state.dragQueenOffset, {
        toValue: { x: newDx, y: newDy },
        duration,
      }).start(() => {
        this.state.dragQueenOffset.setValue({ x: 0, y: 0 });
        this.state.dragQueenPos.setValue({ x: letterPos.x, y: letterPos.y });
        Animated.parallel([
          Animated.timing(this.state.scaleDragQueen, {
            toValue: 1.0,
            duration: 200,
          }),
          Animated.timing(this.state.colorScale, {
            toValue: 0,
            duration: 200,
          }),
        ]).start(() => {
          this.makeCursorLetter();
          this.touchStartX = -1;
          this.touchStartY = -1;
        });
      });
    }
  }
  onFastRelease() {
    console.log('FAST RELEASE');
    const duration = 10;
    console.log(duration);
    Animated.timing(this.state.dragQueenOffset, {
      toValue: { x: 0, y: 0 },
      duration,
    }).start(() => {
      Animated.parallel([
        Animated.timing(this.state.scaleDragQueen, {
          toValue: 1.0,
          duration: 200,
        }),
        Animated.timing(this.state.colorScale, {
          toValue: 0,
          duration: 200,
        }),
      ]).start(() => {
        this.makeCursorLetter();
        this.touchStartX = -1;
        this.touchStartY = -1;
      });
    });
  }
  // A letter is pressed:
  // Find the exact position via layout callbacks
  // Set the Queen and scale and color her
  onLetterIn(index, type) {
    if (!this.state.dragPressed) {
      console.log(`LETTER IN ${index} ${type}`);
      this.setState({
        dragPressed: true,
      });
      let colour = null;
      // let myLetter = null;
      const myLetter = this.makeLetterCursor(type, index);
      const letterPos = this.getLetterPos(type, index);
      if (type === 0) {
        colour = colorWriteArea;
      } else {
        colour = colorKeyBoard;
      }
      this.state.dragQueenPos.setValue({ x: letterPos.x, y: letterPos.y });
      this.state.dragQueenOffset.setValue({ x: 0, y: 0 });

      const newCursorIndex = index;
      const newCursorType = type;

      this.setState({
        draggableLettersWritingArea: Array.from(this.state.draggableLettersWritingArea),
        draggableLettersKeyboard: Array.from(this.state.draggableLettersKeyboard),
        cursorIndex: newCursorIndex,
        cursorType: newCursorType,
        dragQueen: myLetter,
        dragQueenType: type,
        dragQueenIndex: index,
        colorFrom: colour,
        initialDragQueenX: letterPos.x,
        initialDragQueenY: letterPos.y,
      });
      // this.removeLetter(type, index);

      Animated.parallel([
        Animated.timing(this.state.scaleDragQueen, {
          toValue: 2.0,
          duration: 50,
        }),
        Animated.timing(this.state.colorScale, {
          toValue: 1,
          duration: 50,
        }),
      ]).start(() => {
        if (this.fireRelease) {
          console.log('FIRE');
          this.onFastRelease();
          return;
        }
        this.setState({
          dragPressedFinished: true,
        });
        if (type === 0) {
          console.log('HERE A');
          const defaultIndex = this.defaultCursorPos(1);
          this.setCursor(1, defaultIndex);
        } else {
          console.log('HERE B');
          const defaultIndex = this.defaultCursorPos(0);
          this.setCursor(0, defaultIndex);
        }
      });
    }
  }

  // Layoutcallbacks
  onLayoutCallbackWritingArea(event) {
    this.writingAreaOffsetY = event.nativeEvent.layout.height;
  }
  onLayoutCallbackWritingArea1(event) {
    this.writingArea1OffsetY = event.nativeEvent.layout.y;
  }
  onLayoutCallbackWritingArea2(event) {
    this.writingArea2OffsetY = event.nativeEvent.layout.y;
  }
  onLayoutCallback(event, index, type) {
    if (type === 0) {
      this.layoutWritingArea[index] = event.nativeEvent.layout;
    } else {
      this.layoutKeyboard[index] = event.nativeEvent.layout;
    }
  }
  getLetterPos(type, index) {
    let x = 0;
    let y = 0;
    if (type === 0) {
      if (!this.layoutWritingArea[index]) return { x: 0, y: 0 };
      x = this.layoutWritingArea[index].x;
      y = this.layoutWritingArea[index].y + this.writingArea1OffsetY + this.writingArea2OffsetY;
    } else {
      if (!this.layoutKeyboard[index]) return { x: 0, y: 0 };
      x = this.layoutKeyboard[index].x;
      y = this.layoutKeyboard[index].y + this.writingAreaOffsetY;
    }
    return { x, y };
  }

  setCursor(type, index) {
    const newIndex = index;

    // Check if is the same
    const oldIndex = this.state.cursorIndex;
    const oldType = this.state.cursorType;

    // no cursor and no cursor to set
    if (oldIndex === -1 && newIndex === -1) return;

    // No Change?
    if (oldType === type && newIndex === oldIndex) {
      return;
    }
    // console.log('OKAY');
    console.log(`SET CURSOR ${type} ${newIndex}`);
    // this.state.cursorIndex = newIndex;
    // this.state.cursorType = type;

    // Do it
    let writingChanged = false;
    let keyboardChanged = false;
    let newCursorIndex = -1;
    let newCursorType = -1;

    // 1. Delete old Cursor if exists
    let changedType = this.deleteCursor();
    if (changedType === 0) {
      writingChanged = true;
    } else if (changedType === 1) {
      keyboardChanged = true;
    }
    // 2. If new Cursor is in the same array => Index may have changed due tu deletation
    /* if (changedType === type) {
      // If cursor was before new position
      if (this.state.cursorIndex < newIndex) {
        console.log('DECREASE');
        newIndex -= 1;
      }
    } */

    // 3. Add new Cursor
    // DragQueen should exist anyway, but we dont know later cases

    if (this.state.dragQueen) {
      // Set new Cursor, if index is setted
      if (newIndex >= 0) {
        const newCursor = { ...this.state.dragQueen, cursor: true, cursorHidden: false };
        console.log(`ADD ${newIndex} ${type}`);
        changedType = this.addLetter(type, newIndex, newCursor);
        if (changedType === 0) {
          writingChanged = true;
        } else if (changedType === 1) {
          keyboardChanged = true;
        }
        newCursorIndex = newIndex;
        newCursorType = type;
      }
    }
    let colour = null;
    if (type === 0) {
      colour = colorWriteArea;
    } else {
      colour = colorKeyBoard;
    }
    let newState = {
      colorFrom: colour,
      cursorIndex: newCursorIndex,
      cursorType: newCursorType,
    };
    if (writingChanged) {
      // console.log('WRITING CHANGED');
      newState = {
        ...newState,
        draggableLettersWritingArea: Array.from(this.state.draggableLettersWritingArea),
      };
    }
    if (keyboardChanged) {
      // console.log('KEYBOARD CHANGED');
      newState = {
        ...newState,
        draggableLettersKeyboard: Array.from(this.state.draggableLettersKeyboard),
      };
    }
    this.setState({
      ...newState,
    });
  }

  getTouchZone(posY) {
    if (posY < this.writingAreaOffsetY) {
      return 0;
    }
    return 1;
  }
  getTouchIndex(touchZone, posX, posY) {
    if (touchZone < 0) return -1;
    let layoutArray = null;
    let letterArray = null;
    let offsetY = 0;
    if (touchZone === 0) {
      layoutArray = this.layoutWritingArea;
      letterArray = this.state.draggableLettersWritingArea;
      offsetY = this.writingArea1OffsetY + this.writingArea2OffsetY;
    } else if (touchZone === 1) {
      layoutArray = this.layoutKeyboard;
      letterArray = this.state.draggableLettersKeyboard;
      offsetY = this.writingAreaOffsetY;
    }
    for (let i = 0; i < letterArray.length; i += 1) {
      if (!layoutArray[i]) {
        return -1;
      }
      let letterX1 = layoutArray[i].x;
      const letterY1 = layoutArray[i].y + offsetY;
      const letterW = layoutArray[i].width;
      const letterH = layoutArray[i].height;
      let letterX2 = letterX1 + letterW;
      const letterY2 = letterY1 + letterH;
      if (posX >= letterX1 && posX <= letterX2) {
        if (posY >= letterY1 && posY <= letterY2) {
          let blinkProtection = false;
          if (this.state.cursorType === touchZone) {
            if (i === this.state.cursorIndex + 1) {
              blinkProtection = true;
              const cursorWidth = layoutArray[this.state.cursorIndex].width;
              letterX1 = letterX2 - cursorWidth;
              if (posX >= letterX1 && posX <= letterX2) {
                if (posY >= letterY1 && posY <= letterY2) {
                  return i;
                }
              }
            }
            if (i === this.state.cursorIndex - 1) {
              blinkProtection = true;
              const cursorWidth = layoutArray[this.state.cursorIndex].width;
              letterX2 = letterX1 + cursorWidth;
              if (posX >= letterX1 && posX <= letterX2) {
                if (posY >= letterY1 && posY <= letterY2) {
                  return i;
                }
              }
            }
          }
          if (!blinkProtection) {
            return i;
          }
          // Retest with a protection margin
        }
      }
    }
    return -1;
  }

  getKeyboardPos() {
    for (let i = 0, len = this.state.draggableLettersKeyboard.length; i < len; i += 1) {
      if (this.state.draggableLettersKeyboard[i].key > this.state.dragQueen.key) {
        return i;
      }
    }
    return this.state.draggableLettersKeyboard.length;
  }
  deleteCursor() {
    if (this.state.cursorIndex !== -1) {
      this.removeLetter(this.state.cursorType, this.state.cursorIndex);
      return this.state.cursorType;
    }
    return -1;
  }
  defaultCursorPos(type) {
    if (type === 0) {
      return this.state.draggableLettersWritingArea.length;
    }
    return this.getKeyboardPos();
  }
  createPanResponder() {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => !this.state.dragPressed,
      onMoveShouldSetPanResponder: () => !this.state.dragPressed,
      onPanResponderStart: (e) => {
        console.log('START');
        this.fireRelease = false;

        this.touchStartX = e.nativeEvent.locationX;
        this.touchStartY = e.nativeEvent.locationY;
        const zone = this.getTouchZone(this.touchStartY);
        const index = this.getTouchIndex(zone, this.touchStartX, this.touchStartY);
        if (index !== -1) {
          this.onLetterIn(index, zone);
        }
      },
      onPanResponderMove: (e, gesture) => {
        if (this.state.dragQueenIndex < 0) {
          return;
        }
        // absolute Pos.

        const posX = this.touchStartX + gesture.dx;
        const posY = this.touchStartY + gesture.dy;
        const touchZone = this.getTouchZone(posY);
        // Check if zone changed
        let newCursorIndex = null;
        if (this.state.cursorType !== touchZone) {
          newCursorIndex = this.defaultCursorPos(touchZone);
        } else {
          newCursorIndex = this.getTouchIndex(touchZone, posX, posY);
        }
        if (newCursorIndex !== -1) {
          this.setCursor(touchZone, newCursorIndex);
        }
        // set State
        const myDx = gesture.dx / 2;
        const myDy = gesture.dy / 2;
        this.state.dragQueenOffset.setValue({ x: myDx, y: myDy });
      },
      onPanResponderRelease: (e, gesture) => {
        console.log('RELEASE');

        if (this.state.dragPressedFinished) {
          if (this.state.dragQueenIndex < 0) {
            return;
          }
          console.log('RELEASE ');
          this.onLetterReleased(gesture.dx, gesture.dy);
        } else {
          this.fireRelease = true;
        }
      },
    });
  }

  // Add letter
  addLetter(type, index, letter) {
    if (index < 0) return -1;
    if (type === 0) {
      this.state.draggableLettersWritingArea.splice(index, 0, letter);
      return 0;
    }
    this.state.draggableLettersKeyboard.splice(index, 0, letter);
    return 1;
  }

  // Remove it.
  removeLetter(type, index) {
    if (index < 0) return null;
    if (type === 0) {
      return this.state.draggableLettersWritingArea.splice(index, 1);
    }
    return this.state.draggableLettersKeyboard.splice(index, 1);
  }
  // Show it again
  showLetter(type, index) {
    if (index < 0) return;
    if (type === 0) {
      this.state.draggableLettersWritingArea[index].opacity = 1;
    } else {
      this.state.draggableLettersKeyboard[index].opacity = 1;
    }
  }

  makeLetterCursor(type, index) {
    if (index < 0) return null;
    // delete cursor if already setted
    this.deleteCursor();
    let myLetter = null;
    if (type === 0) {
      if (this.state.draggableLettersWritingArea[index]) {
        myLetter = this.state.draggableLettersWritingArea[index];
        this.state.draggableLettersWritingArea[index].cursor = true;
        this.state.draggableLettersWritingArea[index].cursorHidden = true;
      } else {
        console.log('Strange Error 3');
      }
    } else if (this.state.draggableLettersKeyboard[index]) {
      myLetter = this.state.draggableLettersKeyboard[index];
      this.state.draggableLettersKeyboard[index].cursor = true;
      this.state.draggableLettersKeyboard[index].cursorHidden = true;
    } else {
      console.log('Strange Error 3');
    }

    return myLetter;
  }
  makeCursorLetter() {
    // If there is no cursor
    if (this.state.cursorIndex === -1) return;

    let writingChanged = false;
    let keyboardChanged = false;

    if (this.state.cursorType === 0) {
      if (this.state.draggableLettersWritingArea[this.state.cursorIndex]) {
        this.state.draggableLettersWritingArea[this.state.cursorIndex].cursor = false;
        this.state.draggableLettersWritingArea[this.state.cursorIndex].cursorHidden = false;
        writingChanged = true;
      } else {
        console.log('Strange Error 1');
      }
    } else if (this.state.draggableLettersKeyboard[this.state.cursorIndex]) {
      this.state.draggableLettersKeyboard[this.state.cursorIndex].cursor = false;
      this.state.draggableLettersKeyboard[this.state.cursorIndex].cursorHidden = false;
      keyboardChanged = true;
    } else {
      console.log('Strange Error 2');
    }

    // Set new State
    let newState = {
      cursorIndex: -1,
      cursorType: -1,
      dragQueen: null,
      dragQueenType: -1,
      dragQueenIndex: -1,
      dragPressed: false,
      dragPressedFinished: false,
    };

    if (writingChanged) {
      newState = {
        ...newState,
        draggableLettersWritingArea: Array.from(this.state.draggableLettersWritingArea),
      };
    }
    if (keyboardChanged) {
      newState = {
        ...newState,
        draggableLettersKeyboard: Array.from(this.state.draggableLettersKeyboard),
      };
    }
    this.setState({
      ...newState,
    });
  }
  submitPressed() {}

  render() {
    const title = this.props.challenge.title[this.props.language];
    return (
      <View pointerEvents="box-only" {...this.panResponder.panHandlers} style={styles.container}>
        {/* BackButton */}
        <WritingArea
          layoutCallback={this.onLayoutCallback}
          onLayoutCallbackWritingArea={this.onLayoutCallbackWritingArea}
          onLayoutCallbackWritingArea1={this.onLayoutCallbackWritingArea1}
          onLayoutCallbackWritingArea2={this.onLayoutCallbackWritingArea2}
          title={title}
          letters={this.state.draggableLettersWritingArea}
        />
        <Keyboard
          layoutCallback={this.onLayoutCallback}
          letters={this.state.draggableLettersKeyboard}
        />
        <DraggableLetter
          {...this.state.dragQueen}
          index={-1}
          type={2}
          colorFrom={this.state.colorFrom}
          colorScale={this.state.colorScale}
          scaleDragQueen={this.state.scaleDragQueen}
          dragQueenOffset={this.state.dragQueenOffset}
          dragQueenPos={this.state.dragQueenPos}
          active
        />
        <TouchableOpacity onPress={this.submitPressed} style={styles.submitButton}>
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
