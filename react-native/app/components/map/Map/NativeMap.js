import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';

import { LettersMenu, CameraButton } from '../Overlay';
import {
  navigateToMapCamera,
  navigateToQRCodeGet,
  navigateToQRCodeSend,
  navigateToLetterSelector
} from '../../../helper/navigationProxy';

import styles from './styles';
import mapstyles from './mapstyles';

// https://www.npmjs.com/package/react-native-maps
// Note: It's possible to use a different map tile provider for better look
// <MapView.UrlTile
//	 urlTemplate="http://c.tile.stamen.com/toner/{z}/{x}/{y}.jpg"
//	 zIndex={-1} />

class NativeMap extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    letters: PropTypes.array,
    myLetter: PropTypes.string,
    user: PropTypes.object,
  };

  handleCameraButtonPress() {
    navigateToMapCamera(this.props);
  };

  handleLetterSelectorPress() {
    navigateToLetterSelector(this.props);
  };

  handleShareLettersPress() {
    navigateToQRCodeSend(this.props);
  };

  handleGetLettersPress() {
    navigateToQRCodeGet(this.props);
  };

  onPress(region) {
    console.log('press');
  };

  onRegionChange(region) {

  };

  onRegionChangeComplete(region) {

  };

  render() {
    const user = this.props.user;
    const coords = this.props.user.coordinates;

    return (
      <View style={styles.container}>
        <MapView
          onRegionChange={e => this.onRegionChange(e)}
          onRegionChangeComplete={e => this.onRegionChangeComplete(e)}
          onPress={e => this.onPress(e.nativeEvent)}
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.container}
          initialRegion={{
            ...coords,
            latitudeDelta: 0.005, //0.0922
            longitudeDelta: 0.005, //0.0421
          }}
    	  customMapStyle={mapstyles}
        >
          <MapView.Circle
            // Drop Zone, TODO: get line dash working??
            center = {{...coords}}
            radius = {250}
            strokeColor = {'rgba(255,255,255,0.25)'}
            ></MapView.Circle>
          <MapView.Circle
              center = {{...coords}}
              radius = {1}
              strokeColor = {'#fff'}
              ></MapView.Circle>
          <MapView.Marker
            title={'The Drop Zone'}
            coordinate={{
              latitude: user.coordinates.latitude + 0.0002,
              longitude: user.coordinates.longitude,
            }} ><Text style={styles.letter}>The Drop Zone</Text>
          </MapView.Marker>

          {
            this.props.letters.map((item, i) => {
              if (i < 20) {
                return (
                  <MapView.Marker
                    key={i}
                    title={item.character}
                    coordinate={{
                      latitude: item.coords.lat,
                      longitude: item.coords.lng,
                    }}
                    ><Text style={styles.letter}>
                      {item.character}
                    </Text>
                  </MapView.Marker>
                );
              } else { return null; }
            })
          }

        </MapView>
        <LettersMenu
          letterSelectorPress={() => this.handleLetterSelectorPress()}
          shareLettersPress={() => this.handleShareLettersPress()}
          getLettersPress={() => this.handleGetLettersPress()}
          />
        <CameraButton
          text='Camera'
          onPress={() => this.handleCameraButtonPress()}
          />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const user = state.user;
  const letters = state.letters.content;

  return {
    user,
    letters,
  };
};

export default connect(mapStateToProps)(NativeMap);
