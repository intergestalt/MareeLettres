import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class ExpoCamera extends React.Component {

  constructor(props) {
    super(props);
    this._snapshot = this._snapshot.bind(this);
    this._takePicture = this._takePicture.bind(this);
  }
  
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    path: ""
  };
  
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  _takePicture() {
    if (this.camera) {
      console.log("taking picture");
      this.camera.takePictureAsync().then((result)=>{
        console.log(result);
        this.setState({pathPhoto: result});
      });
    } 
  }

  _snapshot() {
    Expo.takeSnapshotAsync(this.mainView, {
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

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: 'red' }} ref={input => this.mainView = input}>
          <Camera style={{ flex: 0.8 }} type={this.state.type} ref={ref => { this.camera = ref; }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.2,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this._takePicture}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Photo{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.2,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this._snapshot}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Snapshot{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          {this.state.pathPhoto ? (
            <Image style={{width: 100, height: 100}} source={{uri: this.state.pathPhoto}}/>
          ) : null}
          {this.state.pathSnapshot ? (
            <Image style={{width: 100, height: 100}} source={{uri: this.state.pathSnapshot}}/>
          ) : null}
        </View>
      );
    }
  }
}