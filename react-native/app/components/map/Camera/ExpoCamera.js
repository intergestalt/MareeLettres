import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera, Permissions } from 'expo';
import styles from './styles';

import { dispatchBackActionToMapOverview } from '../../../helper/navigationProxy';
import { MAP_VIEWS } from '../../../consts';


export default class ExpoCamera extends React.Component {

  constructor(props) {
    super(props);
    this._takePhoto = this._takePhoto.bind(this);
    this._takeSnapshot = this._takeSnapshot.bind(this);
    this._cancel = this._cancel.bind(this);
    this.simulator = false;
  }
  
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };
  
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  _cancel() {
    console.log("going back");
    dispatchBackActionToMapOverview(this.props, MAP_VIEWS.OVERVIEW);
  }

  _takePhoto() {
    if (this.camera) {
      console.log("taking picture");
      this.camera.takePictureAsync().then((result)=>{
        console.log(result);
        this.setState({pathPhoto: result});
      });
    } 
  }

  _takeSnapshot() {
    Expo.takeSnapshotAsync(this.photoContainer, {
      format: "jpg",
      quality: 1,
      result: "file",
      height: 100,
      width: 100
    }).then((result) => {
      console.log(result);
      this.setState({pathSnapshot: result});
    });
  }

  _shareSnapshot() {
    console.log("sharing pressed")
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.mainView}>
          {this.simulator ? (
          <View style={styles.cameraContainer} ref={ref => { this.camera = ref; }}></View>
          ) : (
          <Camera style={styles.cameraContainer} type={this.state.type} ref={ref => { this.camera = ref; }}></Camera>
          )}
          <View style={styles.photoContainer} ref={ref => this.photoContainer = ref}>
              {this.state.pathPhoto ? (
                <Image style={styles.photo} source={{uri: this.state.pathPhoto}}/>
              ) : null}
              <Text style={styles.overlayDummy}>FOO</Text>
              {/*<LetterOverlay style={styles.letterOverlay}/>*/}
            </View>
          <View style={styles.controls}>
              <TouchableOpacity style={styles.button}
                onPress={this._cancel}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}
                onPress={this._takePhoto}>
                <Text style={styles.buttonText}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}
                onPress={this._takeSnapshot}>
                <Text style={styles.buttonText}>Take Snapshot</Text>
              </TouchableOpacity>
          </View>
          {this.state.pathSnapshot ? (
            <View>
              <Image style={{width: 100, height: 100}} source={{uri: this.state.pathSnapshot}}/>
              <TouchableOpacity style={styles.button}
                  onPress={this._shareSnapshot}>
                  <Text style={styles.buttonText}>Share</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      );
    }
  }
}