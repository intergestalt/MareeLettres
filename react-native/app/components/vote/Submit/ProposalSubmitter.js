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

    // I. Bindings
    this.submitPressed = this.submitPressed.bind(this);
    this.onLayoutCallback = this.onLayoutCallback.bind(this);
    this.onQueensLayoutCallback = this.onQueensLayoutCallback.bind(this);
    // This Layout infos of the letter container.
    // Ofsett to determine the cursor pos and the letter pos... Hate it!
    // The whole writing area
    this.onLayoutCallbackWritingArea = this.onLayoutCallbackWritingArea.bind(this);
    // the first inner container
    this.onLayoutCallbackWritingArea1 = this.onLayoutCallbackWritingArea1.bind(this);
    // The second inner container
    this.onLayoutCallbackWritingArea2 = this.onLayoutCallbackWritingArea2.bind(this);

    // II. Prepare Arrays
    // all letters from challenge
    const letters = this.props.challenge.letters;
    const lettersProperties = [];
    // convert them
    for (let i = 0, len = letters.length; i < len; i += 1) {
      lettersProperties.push({ character: letters[i], key: i, opacity: 1, cursor: false });
    }
    lettersProperties.push({
      character: ' ',
      key: letters.length,
      opacity: 1,
      space: true,
      cursor: false,
    });

    // insert them to the array of actually used letters
    const lettersKeyboard = lettersProperties;
    // JUst not to have an empty writing area DELETE THIS AFTERWARTS
    const lettersWritingArea = [];
    // No letter is dragged at the beginning
    const dragQueen = null;
    // Arrays for the layout callback: To determin the pos of all letters.
    this.layoutLetters = {};
    this.queensLayout = null;
    // Will be overwritten by container layout callbacks
    this.writingAreaOffsetY = 0;
    this.writingArea1OffsetY = 0;
    this.writingArea2OffsetY = 0;
    this.dummyDx = 0;
    this.dummyDy = 0;
    // II Vars which do not manipulate Layout, but are part of the logic
    this.schlawinerTime = null;
    this.touchStartX = -1;
    this.touchStartY = -1;
    this.dragPressed = false;
    this.dragPressedFinished = false;
    this.dragReleasedButNotFinishedAnimation = false;
    this.cursorType = -1; // if the queen ist choosen, but not necessarly moved
    this.cursorIndex = -1;
    // Why ever, but animated value is not working to calculate things...
    this.initialDragQueenX = -1;
    this.initialDragQueenY = -1;
    this.dragQueenType = -1;
    this.dragQueenIndex = -1;
    this.waitForCursorLayout = false;
    this.tickerId = null;
    this.state = {
      // Type of the dragged Queen. 0: writing area, 1: Keyboard
      // Index in the arrays of letters (Keybard or TextWritingarea)
      dragQueenOffset: new Animated.ValueXY({ x: 0, y: 0 }), // dx & dy of a dragQueen
      dragQueenPos: new Animated.ValueXY({ x: 0, y: 0 }), // start position of a dragQueen
      lettersKeyboard, // Array to be displayed in Keyboard. (TODO: No Spaces, but one)
      lettersWritingArea, // Array to be displayed in writing area (TODO: Also spaces)
      dragQueen, // null if there is no dragQueen
      scaleDragQueen: new Animated.Value(1), // JUst to animate the queen.
      colorScale: new Animated.Value(0),
      colorFrom: colorKeyBoard,
    };

    this.panResponder = this.createPanResponder();
  }

  // Letter was pressed, not moved and released
  // JUst rescale and recolor and show the letter again in the keyboard or writinarea.
  // Also remove the dragqueen.
  onLetterReleased(dx, dy) {
    console.log(`onLetterReleased ${this.cursorType} ${this.cursorIndex}`);

    const letterPos = this.getLetterPos(this.cursorType, this.cursorIndex);
    if (!letterPos) {
      console.log(`NO LETTER ${this.cursorType} ${this.cursorIndex}`);
      this.resetEverything();
      return;
    }
    console.log(`letterPos ${this.cursorType} ${this.cursorIndex}`);
    console.log(letterPos);
    let newDx = letterPos.x - this.initialDragQueenX;
    let newDy = letterPos.y - this.initialDragQueenY;

    // recenter
    const dstW = letterPos.width / 2;
    const srcW = this.queensLayout.width / 2;
    newDx += Math.round(dstW - srcW);
    let finalX = letterPos.x;
    const finalY = letterPos.y;
    finalX += Math.round(dstW - srcW);

    const distX = newDx - dx;
    const distY = newDy - dy;
    console.log(`READY1: ${this.dragPressed}`);
    const duration = getDuration(distX, distY);
    newDy /= 2;
    newDx /= 2;
    Animated.timing(this.state.dragQueenOffset, {
      toValue: { x: newDx, y: newDy },
      duration,
    }).start(() => {
      this.state.dragQueenOffset.setValue({ x: 0, y: 0 });
      this.state.dragQueenPos.setValue({ x: finalX, y: finalY });
      Animated.parallel([
        Animated.timing(this.state.scaleDragQueen, {
          toValue: 1.0,
          duration: 111,
        }),
        Animated.timing(this.state.colorScale, {
          toValue: 0,
          duration: 111,
        }),
      ]).start(() => {
        this.makeCursorLetter();
      });
    });
  }

  // A letter is pressed:
  // Find the exact position via layout callbacks
  // Set the Queen and scale and color her
  onLetterIn(index, type) {
    if (!this.dragPressed) {
      console.log(`LETTER IN ${index} ${type}`);
      this.dragPressed = true;
      let colour = null;
      // let myLetter = null;
      const myLetter = this.makeLetterCursor(type, index);
      this.cursorIndex = index;
      this.cursorType = type;
      if (myLetter === null) {
        console.log('No Letter found to drag. Should not happen!');
        this.resetEverything();
        return;
      }
      const letterPos = this.getLetterPos(type, index);
      if (letterPos === null) {
        console.log('No letterPos found to drag. Should not happen!');
        this.resetEverything();
        return;
      }
      this.initialDragQueenX = letterPos.x;
      this.initialDragQueenY = letterPos.y;

      if (type === 0) {
        colour = colorWriteArea;
      } else {
        colour = colorKeyBoard;
      }
      this.setState({
        lettersWritingArea: Array.from(this.state.lettersWritingArea),
        lettersKeyboard: Array.from(this.state.lettersKeyboard),
        dragQueen: myLetter,
        colorFrom: colour,
      });
      this.state.dragQueenPos.setValue({ x: letterPos.x, y: letterPos.y });
      this.state.dragQueenOffset.setValue({ x: 0, y: 0 });

      this.dragQueenType = type;
      this.dragQueenIndex = index;

      Animated.parallel([
        Animated.timing(this.state.scaleDragQueen, {
          toValue: 2.0,
          duration: 111,
        }),
        Animated.timing(this.state.colorScale, {
          toValue: 1,
          duration: 111,
        }),
      ]).start(() => {
        this.dragPressedFinished = true;
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
  onLayoutCallback(event, key) {
    // handle Wait for cursor layout
    if (this.waitForCursorLayout) {
      let cKey = null;
      if (this.testLettersArrayBounds(this.cursorType, this.cursorIndex)) {
        let cursor = null;
        if (this.cursorType === 0) {
          cursor = this.state.lettersWritingArea[this.cursorIndex];
        } else {
          cursor = this.state.lettersKeyboard[this.cursorIndex];
        }
        cKey = cursor.key;

        if (cKey === key) {
          this.waitForCursorLayout = false;
        }
      }
    }
    this.layoutLetters[key] = event.nativeEvent.layout;
  }
  onQueensLayoutCallback(event) {
    this.queensLayout = event.nativeEvent.layout;
  }
  getLetterPos(type, index) {
    if (!this.testLettersArrayBounds(type, index)) return null;
    let x = 0;
    let y = 0;
    let width = 0;
    if (type === 0) {
      const key = this.state.lettersWritingArea[index].key;
      if (!this.layoutLetters[key]) return null;
      x = this.layoutLetters[key].x;
      y = this.layoutLetters[key].y + this.writingArea1OffsetY + this.writingArea2OffsetY;
      width = this.layoutLetters[key].width;
    } else {
      const key = this.state.lettersKeyboard[index].key;
      if (!this.layoutLetters[key]) return null;
      x = this.layoutLetters[key].x;
      y = this.layoutLetters[key].y + this.writingAreaOffsetY;
      width = this.layoutLetters[key].width;
    }
    return { x, y, width };
  }
  getNextKey() {
    const ids = Object.keys(this.layoutLetters);
    let max = 0;
    for (let i = 0; i < ids.length; i += 1) {
      const id = ids[i];
      if (id > max) max = parseInt(id, 0);
    }
    max += 1;
    /*    for (let i = 0; i < this.state.lettersKeyboard.length; i += 1) {
      if (this.state.lettersKeyboard[i].key === max) {
        console.log('FOUND MAX IN KEYBOARD!');
      }
    }
    for (let i = 0; i < this.state.lettersWritingArea.length; i += 1) {
      if (this.state.lettersWritingArea[i].key === max) {
        console.log('FOUND MAX IN WRITING!');
      }
    } */
    console.log(`NEW MAX ${max}`);
    return max;
  }
  setCursor(type, index) {
    if (!this.state.dragQueen) {
      console.log('NO DRAG QUEEN, but SETTIG CURSOR...');
      return;
    }
    const newIndex = index;

    // Check if is the same
    const oldIndex = this.cursorIndex;
    const oldType = this.cursorType;

    // no cursor and no cursor to set
    if (oldIndex === -1 && newIndex === -1) return;

    // No Change?
    if (oldType === type && newIndex === oldIndex) {
      return;
    }
    // console.log('OKAY');
    console.log(`SET CURSOR ${type} ${newIndex}`);
    let newCursor = { ...this.state.dragQueen, cursor: true }; // , cursorHidden: false };
    // this.cursorIndex = newIndex;
    // this.cursorType = type;

    // Do it
    let writingChanged = false;
    let keyboardChanged = false;
    let newCursorIndex = -1;
    let newCursorType = -1;
    // 1. Delete old Cursor if exists
    // let spaceDetected=false;
    if (newCursor.space && oldType === 1) {
      this.state.lettersKeyboard[oldIndex].cursor = false;
      this.state.lettersKeyboard[oldIndex].cursorHidden = false;
      keyboardChanged = true;
      console.log('SPACE DETECTED');
      // spaceDetected=true;
      newCursor.key = this.getNextKey();
    } else {
      const changedType = this.deleteCursor();
      if (changedType === 0) {
        writingChanged = true;
      } else if (changedType === 1) {
        keyboardChanged = true;
      }
    }

    // 3. Add new Cursor
    // DragQueen should exist anyway, but we dont know later cases

    // Set new Cursor, if index is setted
    if (newIndex >= 0) {
      // Space is dragged back...
      if (newCursor.space && oldType === 0 && type === 1) {
        console.log('SPACE DRAG BACK  DETECTED');
        newCursorIndex = this.getKeyboardSpaceIndex();
        newCursorType = 1;
        newCursor = this.state.lettersKeyboard[newCursorIndex];
        newCursor.cursor = true;
        keyboardChanged = true;
        // Normal dragback
      } else {
        console.log('ADD');
        const changedType = this.addLetter(type, newIndex, newCursor);
        if (changedType === -1) {
          return;
        } else if (changedType === 0) {
          writingChanged = true;
        } else if (changedType === 1) {
          keyboardChanged = true;
        }
        newCursorIndex = newIndex;
        newCursorType = type;
        this.waitForCursorLayout = true;
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
    };
    if (writingChanged) {
      // console.log('WRITING CHANGED');
      newState = {
        ...newState,
        lettersWritingArea: Array.from(this.state.lettersWritingArea),
      };
    }
    if (keyboardChanged) {
      // console.log('KEYBOARD CHANGED');
      newState = {
        ...newState,
        lettersKeyboard: Array.from(this.state.lettersKeyboard),
      };
    }
    this.cursorIndex = newCursorIndex;
    this.cursorType = newCursorType;
    this.setState({
      ...newState,
    });
  }
  getKeyboardSpaceIndex() {
    for (let i = 0; i < this.state.lettersKeyboard.length; i += 1) {
      const letter = this.state.lettersKeyboard[i];
      if (letter.space) {
        console.log(`FOUND THE SPACE ${i}`);
        return i;
      }
    }
    return -1;
  }
  getTouchZone(posY) {
    if (posY < this.writingAreaOffsetY) {
      return 0;
    }
    return 1;
  }
  getTouchIndex(touchZone, posX, posY) {
    if (touchZone < 0) return -1;
    let letterArray = null;
    let offsetY = 0;
    if (touchZone === 0) {
      letterArray = this.state.lettersWritingArea;
      offsetY = this.writingArea1OffsetY + this.writingArea2OffsetY;
    } else if (touchZone === 1) {
      letterArray = this.state.lettersKeyboard;
      offsetY = this.writingAreaOffsetY;
    }
    for (let i = 0; i < letterArray.length; i += 1) {
      const key = letterArray[i].key;
      // console.log(`KEY: ${key}`);
      if (!this.layoutLetters[key]) {
        // console.log('NO ENTRY');
        return -1;
      }
      /*   console.log(letterArray[i]);
      console.log(this.layoutLetters[key]); */

      let letterX1 = this.layoutLetters[key].x;
      const letterY1 = this.layoutLetters[key].y + offsetY;
      const letterW = this.layoutLetters[key].width;
      const letterH = this.layoutLetters[key].height;
      let letterX2 = letterX1 + letterW;
      const letterY2 = letterY1 + letterH;
      /* console.log(`${i}: ${letterX1} : ${letterY1}     -    ${letterX2} : ${letterY2}`);
      console.log(`${posX} : ${posY}`);
      console.log('   -   '); */
      if (posX >= letterX1 && posX <= letterX2) {
        if (posY >= letterY1 && posY <= letterY2) {
          // Test if it is a move to direct neighbour.
          // yes => Retest with a protection margin, to avoid blinking
          let blinkProtection = false;
          if (this.cursorType === touchZone) {
            // To right
            if (!this.testLettersArrayBounds(this.cursorType, this.cursorIndex)) {
              console.log('WHY');
              return -1;
            }
            const cursorKey = letterArray[this.cursorIndex].key;
            if (i === this.cursorIndex + 1) {
              blinkProtection = true;
              if (!this.layoutLetters[cursorKey]) {
                return -1;
              }
              const cursorWidth = this.layoutLetters[cursorKey].width;
              letterX1 = letterX2 - cursorWidth;
              if (posX >= letterX1 && posX <= letterX2) {
                if (posY >= letterY1 && posY <= letterY2) {
                  return i;
                }
              }
            }
            // to Left
            if (i === this.cursorIndex - 1) {
              blinkProtection = true;
              if (!this.layoutLetters[cursorKey]) {
                return -1;
              }
              const cursorWidth = this.layoutLetters[cursorKey].width;
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
        }
      }
    }
    return -1;
  }

  getKeyboardPos() {
    for (let i = 0, len = this.state.lettersKeyboard.length; i < len; i += 1) {
      if (this.state.dragQueen.space && this.state.lettersKeyboard[i].space) {
        return i;
      }
      if (this.state.lettersKeyboard[i].key >= this.state.dragQueen.key) {
        return i;
      }
    }
    return this.state.lettersKeyboard.length;
  }
  deleteCursor() {
    if (this.cursorIndex !== -1) {
      console.log('Delete');
      this.removeLetter(this.cursorType, this.cursorIndex);
      return this.cursorType;
    }
    return -1;
  }
  defaultCursorPos(type) {
    if (type === 0) {
      return this.state.lettersWritingArea.length;
    }
    return this.getKeyboardPos();
  }
  createPanResponder() {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderStart: (e) => {
        try {
          if (this.dragPressed) {
            console.log('PAN ALREADY IN USE');
            // this.resetEveryThing();
            return;
          }
          console.log('START');
          this.touchStartX = e.nativeEvent.locationX;
          this.touchStartY = e.nativeEvent.locationY;
          const zone = this.getTouchZone(this.touchStartY);
          const index = this.getTouchIndex(zone, this.touchStartX, this.touchStartY);
          if (index !== -1) {
            console.log(`INTO ${index}`);
            this.onLetterIn(index, zone);
          } else {
            this.resetEverything();
          }
        } catch (err) {
          console.log('ERROR onPanResponderStart');
          console.log(err);
          this.resetEverything();
        }
      },
      onPanResponderMove: (e, gesture) => {
        try {
          if (this.dragReleasedButNotFinishedAnimation) {
            console.log('MOVE BUT OLD GESTUR STILL ANIMATES');
            return;
          }
          if (!this.dragPressed) {
            return;
          }
          if (this.dragQueenIndex < 0) {
            console.log('MOVE BUT NO QUEEN');
            this.resetEverything();
            return;
          }
          // absolute Pos.

          const posX = this.touchStartX + gesture.dx;
          const posY = this.touchStartY + gesture.dy;
          const touchZone = this.getTouchZone(posY);
          // Check if zone changed
          let newCursorIndex = null;
          if (this.cursorType !== touchZone) {
            newCursorIndex = this.defaultCursorPos(touchZone);
          } else if (touchZone === 0) {
            newCursorIndex = this.getTouchIndex(touchZone, posX, posY);
          } else {
            newCursorIndex = this.defaultCursorPos(touchZone, posX, posY);
          }
          if (newCursorIndex !== -1) {
            this.setCursor(touchZone, newCursorIndex);
          }
          // set State
          const myDx = gesture.dx / 2;
          const myDy = gesture.dy / 2;
          this.state.dragQueenOffset.setValue({ x: myDx, y: myDy });
        } catch (err) {
          console.log('ERROR onPanResponderMove');
          console.log(err);
          this.resetEverything();
        }
      },
      onPanResponderRelease: (e, gesture) => {
        try {
          if (this.dragReleasedButNotFinishedAnimation) {
            console.log('RELEASE BUT OLD GESTUR STILL ANIMATES');
            return;
          }
          if (!this.dragPressed) {
            console.log('RELEASE BUT NO PRESS');
            this.resetEverything();
            return;
          }
          if (this.dragQueenIndex < 0) {
            console.log('RELEASE BUT NO QUEEN');
            this.resetEverything();
            return;
          }
          console.log('RELEASE');
          this.dragReleasedButNotFinishedAnimation = true;
          this.dummyDx = gesture.dx;
          this.dummyDy = gesture.dy;
          if (!this.tickerId) {
            console.log('TICKER!!!');
            this.schlawinerTime = new Date().getTime();
            this.tickerId = setInterval(() => {
              this.observeLayout();
            }, 10);
          } else {
            console.log('WHat to do here');
          }

          // this.onLetterReleased(gesture.dx, gesture.dy);
          /*          setTimeout(() => {
          }, 10); */
        } catch (err) {
          console.log('ERROR onPanResponderMove');
          console.log(err);
          this.resetEverything();
        }
      },
      handleResponderTerminate() {
        console.log('touch canceled');
        this.resetEverything();
      },
    });
  }

  observeLayout() {
    console.log('SCHLAWINER ALARM ');
    if (!this.waitForCursorLayout) {
      console.log('CLOSE TICKER');
      clearInterval(this.tickerId);
      this.tickerId = null;
      this.onLetterReleased(this.dummyDx, this.dummyDy);
    }
    const now = new Date().getTime();
    if (now - this.schlawinerTime > 1000) {
      console.log('CLOSE TICKER: TIMEOUT');
      clearInterval(this.tickerId);
      this.tickerId = null;
      // Strange things must happen
      this.waitForCursorLayout = false;
      this.makeCursorLetter();
    }
  }
  // Add letter
  addLetter(type, index, letter) {
    if (!this.testLettersArrayBounds(type, index, 1)) return -1;
    if (type === 0) {
      this.state.lettersWritingArea.splice(index, 0, letter);
      return 0;
    }
    this.state.lettersKeyboard.splice(index, 0, letter);
    return 1;
  }

  // Remove it.
  removeLetter(type, index) {
    if (!this.testLettersArrayBounds(type, index)) return null;
    console.log(`Delete ${type} ${index}`);

    if (type === 0) {
      return this.state.lettersWritingArea.splice(index, 1);
    }
    return this.state.lettersKeyboard.splice(index, 1);
  }

  testLettersArrayBounds(type, index, offset = 0) {
    if (index < 0) {
      console.log(`Bounds ERR 1 ${type} ${index}`);
      return false;
    }
    if (type === 0) {
      if (index > this.state.lettersWritingArea.length + offset) {
        console.log(`Bounds ERR 2 ${type} ${index}`);
        return false;
      }
    } else if (index > this.state.lettersKeyboard.length + offset) {
      console.log(`Bounds ERR 3 ${type} ${index}`);
      return false;
    }
    return true;
  }
  // Show it again
  showLetter(type, index) {
    if (!this.testLettersArrayBounds(type, index)) return;
    if (type === 0) {
      this.state.lettersWritingArea[index].opacity = 1;
    } else {
      this.state.lettersKeyboard[index].opacity = 1;
    }
  }

  makeLetterCursor(type, index) {
    if (!this.testLettersArrayBounds(type, index)) return null;
    // delete cursor if already setted. Should not be the case
    this.deleteCursor();
    let myLetter = null;
    if (type === 0) {
      if (this.state.lettersWritingArea[index]) {
        myLetter = this.state.lettersWritingArea[index];
        this.state.lettersWritingArea[index].cursor = true;
        // this.state.lettersWritingArea[index].cursorHidden = true;
      } else {
        console.log('Strange Error 3');
      }
    } else if (this.state.lettersKeyboard[index]) {
      myLetter = this.state.lettersKeyboard[index];
      this.state.lettersKeyboard[index].cursor = true;
      // this.state.lettersKeyboard[index].cursorHidden = true;
    } else {
      console.log('Strange Error 3');
    }

    return myLetter;
  }
  makeCursorLetter() {
    console.log('CURSOR TO LETTER');
    if (!this.testLettersArrayBounds(this.cursorType, this.cursorIndex)) {
      console.log('GO CURSOR 2 LETTER');
      this.resetEverything();
      return;
    }
    if (this.cursorType === 0) {
      if (this.state.lettersWritingArea[this.cursorIndex]) {
        console.log('KEYBOARD');
        this.state.lettersWritingArea[this.cursorIndex].cursor = false;
        this.state.lettersWritingArea[this.cursorIndex].cursorHidden = false;
        if (this.state.lettersWritingArea[this.cursorIndex].space) {
          console.log('SPACE IT');
          let spaceNeighbour = false;
          if (this.cursorIndex > 0) {
            if (this.state.lettersWritingArea[this.cursorIndex - 1].space) {
              console.log('SPACE NEIGHBOUR LEFT DETECTED');
              spaceNeighbour = true;
            }
          }
          if (this.cursorIndex < this.state.lettersWritingArea.length - 1) {
            if (this.state.lettersWritingArea[this.cursorIndex + 1].space) {
              console.log('SPACE NEIGHBOUR RIGHT DETECTED');
              spaceNeighbour = true;
            }
          }
          if (spaceNeighbour) {
            this.removeLetter(this.cursorType, this.cursorIndex);
          }
        }
      } else {
        console.log('Strange Error 1');
      }
    } else if (this.state.lettersKeyboard[this.cursorIndex]) {
      this.state.lettersKeyboard[this.cursorIndex].cursor = false;
      this.state.lettersKeyboard[this.cursorIndex].cursorHidden = false;
    } else {
      console.log('Strange Error 2');
    }
    this.resetEverything();
  }

  resetEverything(setState = true) {
    console.log('RESET EVERYTHING');
    this.dragReleasedButNotFinishedAnimation = false;
    this.touchStartX = -1;
    this.touchStartY = -1;
    this.dragPressed = false;
    this.dragPressedFinished = false;
    this.cursorType = -1;
    this.cursorIndex = -1;
    this.initialDragQueenX = -1;
    this.initialDragQueenY = -1;
    this.dragQueenType = -1;
    this.dragQueenIndex = -1;
    this.state.scaleDragQueen.setValue(1);
    this.state.colorScale.setValue(0);
    this.state.dragQueenOffset.setValue({ x: 0, y: 0 });
    this.state.dragQueenPos.setValue({ x: 0, y: 0 });
    this.waitForState = false;
    this.dummyDx = 0;
    this.dummyDy = 0;
    if (this.tickerId) {
      clearInterval(this.tickerId);
      this.tickerId = null;
    }
    if (this.state.dragQueen) {
      this.state.dragQueen.cursor = false;
      this.state.dragQueen.cursorHidden = false;
    }
    for (let i = 0; i < this.state.lettersKeyboard.length; i += 1) {
      this.state.lettersKeyboard[i].cursor = false;
      this.state.lettersKeyboard[i].cursorHidden = false;
    }
    for (let i = 0; i < this.state.lettersWritingArea.length; i += 1) {
      this.state.lettersWritingArea[i].cursor = false;
      this.state.lettersWritingArea[i].cursorHidden = false;
    }
    if (setState) {
      this.setState({
        lettersKeyboard: Array.from(this.state.lettersKeyboard),
        lettersWritingArea: Array.from(this.state.lettersWritingArea),
        dragQueen: null,
      });
    }
  }
  submitPressed() {
    let answer = '';
    for (let i = 0; i < this.state.lettersWritingArea.length; i += 1) {
      answer += this.state.lettersWritingArea[i].character;
    }
    console.log(`answer ${answer}`);
  }

  render() {
    const title = this.props.challenge.title[this.props.language];
    return (
      <View style={styles.container}>
        <View
          pointerEvents="box-only"
          {...this.panResponder.panHandlers}
          style={styles.dragContainer}
        >
          {/* BackButton */}
          <WritingArea
            layoutCallback={this.onLayoutCallback}
            onLayoutCallbackWritingArea={this.onLayoutCallbackWritingArea}
            onLayoutCallbackWritingArea1={this.onLayoutCallbackWritingArea1}
            onLayoutCallbackWritingArea2={this.onLayoutCallbackWritingArea2}
            title={title}
            letters={this.state.lettersWritingArea}
          />
          <Keyboard layoutCallback={this.onLayoutCallback} letters={this.state.lettersKeyboard} />
          <DraggableLetter
            {...this.state.dragQueen}
            type={2}
            colorFrom={this.state.colorFrom}
            colorScale={this.state.colorScale}
            scaleDragQueen={this.state.scaleDragQueen}
            dragQueenOffset={this.state.dragQueenOffset}
            dragQueenPos={this.state.dragQueenPos}
            layoutCallback={this.onQueensLayoutCallback}
            active
          />
        </View>
        <View style={styles.submitContainer}>
          <TouchableOpacity onPress={this.submitPressed} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>
              {'Submit'.toUpperCase()}
            </Text>
          </TouchableOpacity>
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
    console.log('ProposalSubmitter');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ProposalSubmitter);
