import React, { Component, PropTypes } from 'react';
import { PanResponder, Animated, TouchableOpacity, StatusBar, View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { LinearGradient } from 'expo';
import { connect } from 'react-redux';

import { gradient1 } from '../../config/gradients';
import { Screen } from '../../components/general/Container';
import { screenWidth, screenHeight } from '../../helper/screen';
import { getDuration } from '../../helper/helper';
import { popLanguageSelector } from '../../helper/navigationProxy';
import { setLanguage } from '../../actions/general';
import store from '../../config/store';
import I18n from '../../i18n/i18n';
import { connectAlert } from '../../components/general/Alert';
import { setUserVoteTutorialStatusProxy } from '../../helper/userHelper';

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
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: 'black',
    textShadowRadius: 2,
  },
  langActive: {
    transform: [{ scale: 1.2 }], // animate this
  },
});



class LanguageSelector extends Component {
  static propTypes = {
    language: PropTypes.string,
    navigation: PropTypes.object,
  };
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

    this.didIt = false;
    this.buttonCounter = 0;
    this.panResponder = this.createPanResponder();
  }

  onPress(param) {
    if (this.didIt) return;
    if (!this.state.enabled) return;
    this.setState({ enabled: false });
    const sel = this.state.selected;
    sel[param] = true;
    let second = 1;
    if (param === 1) second = 0;
    this.setState({ choosen: param });
    this.setState({ secondChoosen: second });
    this.setState({ selected: sel });

    if (param === 1) {
      I18n.locale = 'en';
      store.dispatch(setLanguage('en'));
    } else {
      I18n.locale = 'fr';
      store.dispatch(setLanguage('fr'));
    }

    Animated.timing(this.state.scale, {
      toValue: 1.2,
      duration: 100,
    }).start();
  }
  onRelease(param) {
    if (this.didIt) return;
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
    const pos = this.state.iconPos;
    const centerDx = event.nativeEvent.layout.width / 2;
    const centerDy = event.nativeEvent.layout.height / 2;
    const myX = event.nativeEvent.layout.x + centerDx;
    let myY = event.nativeEvent.layout.y + centerDy;
    myY += screenHeight / 2;
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
        if (!this.state.enabled && !this.didIt) {
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
        if (!this.state.enabled && !this.didIt) {
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
              this.didIt = true;
              if (this.state.choosen === 0) {
                store.dispatch(setLanguage('fr'));
              } else {
                store.dispatch(setLanguage('en'));
              }
              setTimeout(() => {
                popLanguageSelector(this.props);

                setTimeout(()=>{
                  this.props.alertWithType(
                    'info',
                    I18n.t('vote_tutorial_1_title'),
                    I18n.t('vote_tutorial_1_text')
                  );
                  setUserVoteTutorialStatusProxy('step2');
                }, 500);

              }, 500);
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
    I18n.locale = this.props.language;
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
      <Screen
        navigation={this.props.navigation}
        tyle={styles.container}
        backgroundColor={styles._container.backgroundColor}
      >
        <View {...this.panResponder.panHandlers} style={{ flex: 1 }}>
          <LinearGradient
            colors={gradient1.colors}
            locations={gradient1.stops}
            style={{ flex: 1, opacity: 1 }}
          >
            <StatusBar hidden />
            <View style={styles.dropzone}>
              <Animated.Text style={myDrop}>
                {I18n.t('language_drag_and_drop').toUpperCase()}
              </Animated.Text>
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

const mapStateToProps = (state) => {
  try {
    return {
      language: state.globals.language,
    };
  } catch (e) {
    console.log('LanguageSelector');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(connectAlert(LanguageSelector));
