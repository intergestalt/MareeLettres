import React, { Component, PropTypes } from 'react';
import { View, Text, CameraRoll, Image, WebView } from 'react-native';

import { Constants, takeSnapshotAsync, Permissions, BarCodeScanner } from 'expo';

import { BackSimple } from '../../general/BackButton';
import TakeButton from './TakeButton';

import styles from './styles';
import { navigateToMapOverview } from '../../../helper/navigationProxy';

import I18n from '../../../i18n/i18n';

class WebCamera extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  state = {
    hasCameraPermission: null,
    lastScanned: null,
    disabled: true,
    cameraRollUri: null,
  };

  _saveToCameraRollAsync = async () => {
    let result = await takeSnapshotAsync(this._container, {
      format: 'png',
      result: 'file',
    });

    let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo');
    this.setState({ cameraRollUri: saveResult });
  };

  componentDidMount() {
    this.setState({ disabled: false });
    this.requestCameraPermission();
  }

  componentWillUnmount() {
    this.setState({ disabled: true });
  }

  requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted'
    })
  }

  handleBackPress() {
    navigateToMapOverview(this.props);
  }

  handleTakePicture() {
    console.log("take picture")
    this._saveToCameraRollAsync()
  }

  render() {
    return (
      <View style={styles.container}
        collapsable={false}
        ref={view => {
          this._container = view;
        }}>

        <BackSimple colour='white' onPress={() => this.handleBackPress()} />


        {
          this.state.hasCameraPermission === null || this.state.disabled
            ? <Text>Waiting for permission</Text>
            : this.state.hasCameraPermission === false
              ? <Text>No permission</Text>
              : <WebView source={require('./cameraDemo.html')} />
        }

        <Text style={styles.textWhite}>
          OVERLAY
        </Text>

        {this.state.cameraRollUri &&
          <Image
            source={{ uri: this.state.cameraRollUri }}
            style={{ width: '100%', height: 200 }}
          />}

        <TakeButton onPress={this._saveToCameraRollAsync} style={{ position: 'absolute', bottom: 20 }} />

      </View>
    );
  }
}

export default WebCamera;
