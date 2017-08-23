import React, { Component } from 'react';
import { PanResponder, Animated, TouchableOpacity, StatusBar, View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { LinearGradient } from 'expo';

import { Screen } from '../../components/general/Container';
import { screenWidth, screenHeight } from '../../helper/screen';
import { navigateToVote } from '../../helper/navigationProxy';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'rgb(0,0,67)',
  },
  dropzone: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: '20%',
    paddingRight: '20%',
  },
  dropzoneText: {
    color: 'white',
    opacity: 1, // animate this
    fontSize: '1rem',
    fontFamily: 'normal',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  basezone: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  lang: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: '4.5rem',
    fontFamily: 'impact',
  },
  langActive: {
    transform: [{ scale: 1.2 }], // animate this
  },
});

const gradientStops = [
  0,
  0.009,
  0.1604,
  0.2193,
  0.2736,
  0.3246,
  0.3733,
  0.42,
  0.4641,
  0.5049,
  0.506,
  0.5414,
  0.5793,
  0.6209,
  0.6663,
  0.7173,
  0.7766,
  0.8524,
  1,
];

const gradientColors = [
  '#0D1140',
  '#101241',
  '#191643',
  '#261C46',
  '#36244A',
  '#4B2F4F',
  '#663D55',
  '#894F5B',
  '#B76661',
  '#F58466',
  '#F28366',
  '#C97769',
  '#AA6E6C',
  '#91676E',
  '#7D6270',
  '#6E5E70',
  '#645B71',
  '#5D5A71',
  '#5B5971',
];

function getDuration(x1, y1, x2 = 0, y2 = 0) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const a = dx * dx;
  const b = dy * dy;
  const dist = Math.round(Math.sqrt(a + b));
  const f = dist / screenHeight;
  const duration = Math.round(f * 1000);
  return duration;
}
class LanguageSelector extends Component {
  constructor(props) {
    super(props);
    this.setIconLayout = this.setIconLayout.bind(this);

    const selected = [false, false];
    const iconPos = new Array(2);
    this.state = {
      choosen: -1,
      secondChoosen: -1,
      selected,
      scale: new Animated.Value(1),
      swipeOffset: new Animated.ValueXY({ x: 0, y: 0 }),
      enabled: true,
      dropOpacity: new Animated.Value(1),
      secondOffset: new Animated.Value(0),
      iconPos,
    };

    this.buttonCounter = 0;
    this.panResponder = this.createPanResponder();
  }

  onPress(param) {
    if (!this.state.enabled) return;
    this.setState({ enabled: false });
    const sel = this.state.selected;
    sel[param] = true;
    let second = 1;
    if (param === 1) second = 0;
    this.setState({ choosen: param });
    this.setState({ secondChoosen: second });
    this.setState({ selected: sel });

    Animated.timing(this.state.scale, {
      toValue: 1.2,
      duration: 100,
    }).start();
  }
  onRelease(param) {
    console.log('RELEASE BUTTON');
    this.setState({ enabled: true });
    const sel = this.state.selected;
    sel[param] = false;
    this.setState({ choosen: -1 });
    this.setState({ secondChoosen: -1 });

    this.setState({ selected: sel });
    if (this.state.scale > 1) {
      Animated.timing(this.state.scale, {
        toValue: 0,
        duration: 100,
      }).start();
    }
  }

  setIconLayout(event, index) {
    console.log('BaseZone');
    console.log(event.nativeEvent.layout);
    const pos = this.state.iconPos;
    const centerDx = event.nativeEvent.layout.width / 2;
    const centerDy = event.nativeEvent.layout.height / 2;
    const myX = event.nativeEvent.layout.x + centerDx;
    let myY = event.nativeEvent.layout.y + centerDy;
    myY += screenHeight / 2;
    console.log(`X: ${myX}`);
    console.log(`y: ${myY}`);
    pos[index] = {
      x: myX,
      y: myY,
    };
    this.setState({
      iconPos: pos,
    });
  }

  createPanResponder() {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        console.log(`${gesture.moveX} : ${gesture.moveY}`);
        if (!this.state.enabled) {
          this.setState({ movingStarted: true });
          const myDx = gesture.dx / 1.2;
          const myDy = gesture.dy / 1.2;
          let newOpacity = 1;
          if (myDy < 0) {
            const f = Math.abs(myDy) / screenHeight;
            newOpacity = f * 3;
            newOpacity = 1 - newOpacity;
            if (newOpacity < 0) newOpacity = 0;
            this.state.dropOpacity.setValue(newOpacity);
          }
          this.state.swipeOffset.setValue({ x: myDx, y: myDy });
        }
      },

      onPanResponderRelease: (e, gesture) => {
        if (!this.state.enabled) {
          const pos = this.state.iconPos[this.state.choosen];
          const destX = screenWidth / 2;
          const destY = screenHeight / 4;
          let destDx = destX - pos.x;
          let destDy = destY - pos.y;
          const secondPos = this.state.iconPos[this.state.secondChoosen];
          let secondPosDx = 0;

          const moved = gesture.dy / destDy;
          let duration = 0;
          let destOpacity = 1;
          if (moved > 0.5) {
            duration = getDuration(gesture.dx, gesture.dy, destDx, destDy);
            secondPosDx = destX - secondPos.x;
            destOpacity = 0;
          } else {
            duration = getDuration(gesture.dx, gesture.dy);
            destDx = 0;
            destDy = 0;
          }

          Animated.parallel([
            Animated.timing(this.state.scale, {
              toValue: 1,
              duration: 100,
            }),
            Animated.timing(this.state.dropOpacity, {
              toValue: destOpacity,
              duration,
            }),
            Animated.timing(this.state.secondOffset, {
              toValue: secondPosDx,
              duration,
            }),
            Animated.timing(this.state.swipeOffset, {
              toValue: { x: destDx, y: destDy },
              duration,
            }),
          ]).start(() => {
            if (moved > 0.5) {
              navigateToVote(this.props);
            } else {
              const sel = this.state.selected;
              sel[this.state.choosen] = false;
              this.setState({ choosen: -1 });
              this.setState({ selected: sel });
              this.setState({ enabled: true });
            }
          });
        }
      },
    });
  }

  render() {
    const myStyle = {
      transform: [
        { scale: this.state.scale },
        {
          translateX: this.state.swipeOffset.x,
        },
        {
          translateY: this.state.swipeOffset.y,
        },
      ],
    };
    const mySecondStyle = {
      transform: [
        {
          translateX: this.state.secondOffset,
        },
      ],
    };
    const myDrop = [
      styles.dropzoneText,
      {
        opacity: this.state.dropOpacity,
      },
    ];

    return (
      <Screen style={styles.container} backgroundColor={styles._container.backgroundColor}>
        <View {...this.panResponder.panHandlers} style={{ flex: 1 }}>
          <LinearGradient
            colors={gradientColors}
            locations={gradientStops}
            style={{ flex: 1, opacity: 1 }}
          >
            <StatusBar hidden />
            <View style={styles.dropzone}>
              <Animated.Text style={myDrop}>Drag here to choose your language</Animated.Text>
            </View>

            <View style={styles.basezone}>
              <Animated.View
                onLayout={event => this.setIconLayout(event, 0)}
                style={this.state.selected[0] ? myStyle : mySecondStyle}
              >
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.onRelease(0)}
                  onPressIn={() => this.onPress(0)}
                >
                  <Text style={styles.lang}>FR</Text>
                </TouchableOpacity>
              </Animated.View>
              <Animated.View
                onLayout={event => this.setIconLayout(event, 1)}
                style={this.state.selected[1] ? myStyle : mySecondStyle}
              >
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.onRelease(1)}
                  onPressIn={() => this.onPress(1)}
                >
                  <Text style={styles.lang}>EN</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </LinearGradient>
        </View>
      </Screen>
    );
  }
}

export default LanguageSelector;
