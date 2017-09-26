import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  CameraRoll,
  PermissionsAndroid,
  Platform
} from 'react-native';
import { Camera, Permissions, takeSnapshotAsync } from 'expo';
import styles from './styles';

import { dispatchBackActionToMapOverview } from '../../../helper/navigationProxy';
import { MAP_VIEWS } from '../../../consts';
import I18n from '../../../i18n/i18n';
import { connect } from 'react-redux';

import LetterOverlay from './LetterOverlay';
import { connectAlert } from '../../../components/general/Alert';
import { BackSimple } from '../../general/BackButton';
import { setUserHasStoragePermissionAndroidProxy }  from '../../../helper/userHelper';

class ExpoCamera extends React.Component {
  constructor(props) {
    super(props);

    this._cancel = this._cancel.bind(this);
    this._takePhoto = this._takePhoto.bind(this);
    this._takeSnapshot = this._takeSnapshot.bind(this);
    this._shareSnapshot = this._shareSnapshot.bind(this);
    this._resetPhoto = this._resetPhoto.bind(this);


    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      pathPhoto: null
    };

    this.simulator = false;
    //this.state.pathPhoto = "https://cdn.pixabay.com/photo/2017/01/06/19/15/soap-bubble-1958650_960_720.jpg";
    
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async componentDidMount() {
    // this is done once to obtain write external storage permission on android - remove when there is a better way
    if(!this.props.user.hasStoragePermissionAndroid && Platform.OS === 'android') {
      const resultCamera = await Expo.ImagePicker.launchCameraAsync({}); 
      console.log(resultCamera);
      setUserHasStoragePermissionAndroidProxy();
      if(!resultCamera.cancelled) {
        console.log(resultCamera.uri);
        this.setState({ pathPhoto: resultCamera.uri })  
      }
    }
  }

  _cancel() {
    dispatchBackActionToMapOverview(this.props, MAP_VIEWS.OVERVIEW);
  }

  _takePhoto() {
    if (this.camera) {
      console.log('taking picture');
      this.camera.takePictureAsync().then((result) => {
        console.log(result);
        this.setState({ pathPhoto: result });
      });
    }
  }

  _resetPhoto() {
    this.setState({ pathPhoto: null });
  }

  async _takeSnapshot() {
    const result = await takeSnapshotAsync(this.photoContainer, {
      format: 'png',
      result: 'file',
    });

    const saveResult = await CameraRoll.saveToCameraRoll(result, 'photo');
    this.setState({ cameraRollUri: saveResult });
    this.props.alertWithType('info', I18n.t('map_photo_save_title'), I18n.t('map_photo_save_text'));
  }

  _shareSnapshot() {
    console.log('sharing pressed');
  }

  render() {
    I18n.locale = this.props.language;
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>No access to camera</Text>
          <BackSimple colour="white" onPress={this._cancel} />
        </View>
      );
    }
    return (
      <View style={styles.mainView}>
        {this.simulator ? (
          <View
            style={styles.cameraContainer}
            ref={(ref) => {
              this.camera = ref;
            }}
          />
        ) : (
            <Camera
              style={styles.cameraContainer}
              type={this.state.type}
              ref={(ref) => {
                this.camera = ref;
              }}
            />
          )}
        <View style={styles.photoContainer} ref={ref => (this.photoContainer = ref)}>
          {this.state.pathPhoto ? (
            <Image style={styles.photo} source={{ uri: this.state.pathPhoto }} />
          ) : null}
          <LetterOverlay style={styles.overlay} />
        </View>
        <BackSimple colour="white" onPress={this._cancel} />
        <View style={styles.controls}>
          {this.state.pathPhoto ? (
            <TouchableOpacity style={styles.panelButton} onPress={this._resetPhoto}>
              <Text style={styles.buttonText}>{I18n.t('reset_button').toUpperCase()}</Text>
            </TouchableOpacity>
          ) : null}
          {this.state.pathPhoto ? (
            <TouchableOpacity style={[styles.panelButton, styles.panelButtonLast]} onPress={this._takeSnapshot}>
              <Text style={[styles.buttonText, styles.buttonTextLast]}>{I18n.t('save_button').toUpperCase()}</Text>
            </TouchableOpacity>
          ) : (
              <TouchableOpacity style={styles.centerButton} onPress={this._takePhoto}>
                <Image
                  style={styles.buttomSnapImage}
                  source={require('./assets/snap.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          {/* <TouchableOpacity style={styles.button}
                onPress={this._shareSnapshot}>
                <Text style={styles.buttonText}>Share</Text>
              </TouchableOpacity> */}
        </View>
        {this.state.pathSnapshot ? (
          <View>
            <Image style={{ width: 100, height: 100 }} source={{ uri: this.state.pathSnapshot }} />
            <TouchableOpacity style={styles.button} onPress={this._shareSnapshot}>
              <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    return {
      language: state.globals.language,
      user: state.user,
    };
  } catch (e) {
    console.log('ExpoCamera');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(connectAlert(ExpoCamera));
