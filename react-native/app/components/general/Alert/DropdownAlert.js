import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
  Platform,
  Dimensions,
  Image,
  PanResponder,
} from 'react-native';
import { LinearGradient } from 'expo';

// Constants
// Sizes
const DEFAULT_IMAGE_DIMENSIONS = 36;
const WINDOW = Dimensions.get('window');

let closeTimeoutId = null;
let panResponder;

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

export default class DropdownAlert extends Component {
  static propTypes = {
    closeInterval: PropTypes.number,
    startDelta: PropTypes.number,
    endDelta: PropTypes.number,
    containerStyle: View.propTypes.style,
    titleStyle: Text.propTypes.style,
    messageStyle: Text.propTypes.style,
    buttonStyle: Text.propTypes.style,
    imageStyle: Image.propTypes.style,
    cancelBtnImageStyle: Image.propTypes.style,
    titleNumOfLines: PropTypes.number,
    messageNumOfLines: PropTypes.number,
    onClose: PropTypes.func,
    onCancel: PropTypes.func,
    enableCancel: PropTypes.bool,
    tapToCloseEnabled: PropTypes.bool,
    panResponderEnabled: PropTypes.bool,
    replaceEnabled: PropTypes.bool,
    translucent: PropTypes.bool,
  };
  static defaultProps = {
    onClose: null,
    onCancel: null,
    closeInterval: 4000,
    startDelta: -100,
    endDelta: 20,
    titleNumOfLines: 1,
    messageNumOfLines: 3,
    infoColor: '#2B73B6',
    warnColor: '#cd853f',
    errorColor: '#cc3232',
    successColor: '#32A54A',
    enableCancel: false,
    tapToCloseEnabled: true,
    panResponderEnabled: true,
    replaceEnabled: true,
    containerStyle: {
      padding: 16,
      flexDirection: 'row',
    },
    titleStyle: {
      fontSize: 16,
      textAlign: 'left',
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: 'transparent',
    },
    messageStyle: {
      fontSize: 14,
      textAlign: 'left',
      fontWeight: 'normal',
      color: 'white',
      backgroundColor: 'transparent',
    },
    imageStyle: {
      padding: 8,
      width: DEFAULT_IMAGE_DIMENSIONS,
      height: DEFAULT_IMAGE_DIMENSIONS,
      alignSelf: 'center',
    },
    cancelBtnImageStyle: {
      padding: 8,
      width: DEFAULT_IMAGE_DIMENSIONS,
      height: DEFAULT_IMAGE_DIMENSIONS,
      alignSelf: 'center',
    },
    translucent: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      animationValue: new Animated.Value(0),
      duration: 450,
      type: '',
      message: '',
      title: '',
      isOpen: false,
      startDelta: props.startDelta,
      endDelta: props.endDelta,
      topValue: 0,
    };
    // Render
    this.renderButton = this.renderButton.bind(this);
    this.renderDropDown = this.renderDropDown.bind(this);
    // Action
    this.alert = this.alert.bind(this);
    this.alertWithType = this.alertWithType.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onClose = this.onClose.bind(this);
    // Util
    this.animate = this.animate.bind(this);
    // Pan Responder
    this.handlePanResponderMove = this.handlePanResponderMove.bind(this);
    this.handlePanResponderEnd = this.handlePanResponderEnd.bind(this);
    this.handleMoveShouldSetPanResponder = this.handleMoveShouldSetPanResponder.bind(this);
    this.handleStartShouldSetPanResponder = this.handleMoveShouldSetPanResponder.bind(this);
  }
  componentWillMount() {
    panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    });
  }
  alert(title, message) {
    if (title == undefined) {
      title = null;
    }
    if (message == undefined) {
      message = null;
    }
    this.alertWithType('custom', title, message);
  }
  alertWithType(type, title, message) {
    if (this.validateType(type) == false) {
      return;
    }
    if (typeof title !== 'string') {
      title = title.toString();
      console.warn('DropdownAlert: Title is not a string.');
    }
    if (typeof message !== 'string') {
      message = message.toString();
      console.warn('DropdownAlert: Message is not a string.');
    }
    if (this.props.replaceEnabled == false) {
      this.setState({
        type,
        message,
        title,
        isOpen: true,
        topValue: 0,
      });
      if (this.state.isOpen == false) {
        this.animate(1);
      }
      if (this.props.closeInterval > 1) {
        if (closeTimeoutId != null) {
          clearTimeout(closeTimeoutId);
        }
        closeTimeoutId = setTimeout(() => {
          this.onClose('automatic');
        }, this.props.closeInterval);
      }
    } else {
      let delayInMilliSeconds = 0;
      if (this.state.isOpen == true) {
        delayInMilliSeconds = 475;
        this.dismiss();
      }
      const self = this;
      setTimeout(() => {
        if (self.state.isOpen == false) {
          self.setState({
            type,
            message,
            title,
            isOpen: true,
            topValue: 0,
          });
        }
        self.animate(1);
        if (self.props.closeInterval > 1) {
          closeTimeoutId = setTimeout(() => {
            self.onClose('automatic');
          }, self.props.closeInterval);
        }
      }, delayInMilliSeconds);
    }
  }
  dismiss(onDismiss, action) {
    if (this.state.isOpen) {
      if (closeTimeoutId != null) {
        clearTimeout(closeTimeoutId);
      }
      this.animate(0);
      setTimeout(() => {
        if (this.state.isOpen) {
          this.setState({
            isOpen: false,
          });
          if (onDismiss) {
            const data = {
              type: this.state.type,
              title: this.state.title,
              message: this.state.message,
              action, // !!! How the alert was dismissed: automatic, programmatic, tap, pan or cancel
            };
            onDismiss(data);
          }
        }
      }, this.state.duration);
    }
  }
  onClose(action) {
    if (action == undefined) {
      action = 'programmatic';
    }
    this.dismiss(this.props.onClose, action);
  }
  onCancel() {
    this.dismiss(this.props.onCancel, 'cancel');
  }
  animate(toValue) {
    Animated.spring(this.state.animationValue, {
      toValue,
      duration: this.state.duration,
      friction: 9,
    }).start();
  }
  onLayoutEvent(event) {
    const { x, y, width, height } = event.nativeEvent.layout;
    let actualStartDelta = this.state.startDelta;
    let actualEndDelta = this.state.endDelta;
    // Prevent it from going off screen.
    if (this.props.startDelta < 0) {
      const delta = 0 - height;
      if (delta != this.props.startDelta) {
        actualStartDelta = delta;
      }
    } else if (this.props.startDelta > WINDOW.height) {
      actualStartDelta = WINDOW.height + height;
    }
    if (this.props.endDelta < 0) {
      actualEndDelta = 0;
    } else if (this.props.endDelta > WINDOW.height) {
      actualEndDelta = WINDOW.height - height;
    }
    const heightDelta = WINDOW.height - this.props.endDelta - height;
    if (heightDelta < 0) {
      actualEndDelta = this.props.endDelta + heightDelta;
    }
    if (actualStartDelta != this.state.startDelta || actualEndDelta != this.state.endDelta) {
      this.setState({
        startDelta: actualStartDelta,
        endDelta: actualEndDelta,
      });
    }
  }
  validateType(type) {
    if (type.length === 0 || type === null) {
      console.warn('Missing DropdownAlert type. Available types: info, warn, error or custom');
      return false;
    }
    if (
      type != 'info' &&
      type != 'warn' &&
      type != 'error' &&
      type != 'custom' &&
      type != 'success'
    ) {
      console.warn(
        'Invalid DropdownAlert type. Available types: info, warn, error, success, or custom',
      );
      return false;
    }
    return true;
  }
  handleStartShouldSetPanResponder(e: Object, gestureState: Object): boolean {
    return this.props.panResponderEnabled;
  }
  handleMoveShouldSetPanResponder(e: Object, gestureState: Object): boolean {
    return gestureState.dx !== 0 && gestureState.dy !== 0 && this.props.panResponderEnabled;
  }
  handlePanResponderMove(e: Object, gestureState: Object) {
    if (gestureState.dy < 0) {
      this.setState({
        topValue: gestureState.dy,
      });
    }
  }
  handlePanResponderEnd(e: Object, gestureState: Object) {
    const delta = this.state.startDelta / 5;
    if (gestureState.dy < delta) {
      this.dismiss(this.props.onClose, 'pan');
    }
  }
  renderText(text, style, numberOfLines) {
    if (text != null) {
      if (text.length > 0) {
        return (
          <Text style={style} numberOfLines={numberOfLines}>
            {text}
          </Text>
        );
      }
    }
    return null;
  }

  renderStatusBar(type, backgroundColor) {
    if (Platform.OS === 'android') {
      return <StatusBar backgroundColor={backgroundColor} />;
    } else if (type != 'custom') {
      return <StatusBar barStyle="light-content" />;
    }
    return null;
  }
  renderButton(style, onPress) {
    if (this.props.enableCancel) {
      return (
        <TouchableOpacity onPress={onPress}>
          <Text style={style}>XXX</Text>
        </TouchableOpacity>
      );
    }
    return <Text style={style}>XXX</Text>;
  }
  renderDropDown(isOpen) {
    if (isOpen == true) {
      let style = this.props.containerStyle;

      if (Platform.OS === 'android' && this.props.translucent) {
        style = [style, { paddingTop: StatusBar.currentHeight }];
      }

      return (
        <Animated.View
          ref={ref => (this.mainView = ref)}
          {...panResponder.panHandlers}
          style={{
            transform: [
              {
                translateY: this.state.animationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.state.startDelta, this.state.endDelta],
                }),
              },
            ],
            position: 'absolute',
            top: this.state.topValue,
            left: 0,
            right: 0,
          }}
        >
          <LinearGradient
            colors={gradientColors}
            locations={gradientStops}
            style={{ flex: 1, opacity: 1 }}
          >
            {/* this.renderStatusBar(this.state.type, '#FF0000') */}
            <TouchableOpacity
              onPress={this.props.enableCancel ? null : () => this.onClose('tap')}
              disabled={!this.props.tapToCloseEnabled}
              onLayout={event => this.onLayoutEvent(event)}
            >
              <View style={style}>
                {this.renderText(
                  this.state.title,
                  this.props.titleStyle,
                  this.props.titleNumOfLines,
                )}

                {this.renderText(
                  this.state.message,
                  this.props.messageStyle,
                  this.props.messageNumOfLines,
                )}
                {this.renderButton(this.props.buttonStyle, this.onClose)}
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      );
    }
    return null;
  }
  render() {
    return this.renderDropDown(this.state.isOpen);
  }
}

const styles = StyleSheet.create({
  defaultContainer: {
    padding: 8,
    paddingTop: Platform.OS === 'android' ? 0 : 20,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    padding: 8,
  },
});
