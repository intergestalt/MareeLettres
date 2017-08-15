import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';

import { LettersMenu, DropZone, CameraButton } from '../Overlay';
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
  };

  componentDidMount() {};

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

  render() {
    const isLoading = this.props.isLoading;
    const isError = this.props.isError;
    const length = this.props.letters.length;

    return (
      <View style={styles.container}>
        <MapView
    	    provider={MapView.PROVIDER_GOOGLE}
          style={styles.container}
          initialRegion={{
            latitude: 52.48, //48.864716 (Paris LAT)
            longitude: 13.41, //2.349014 (Paris LNG)
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
    	  customMapStyle={mapstyles}
        >
          {
            this.props.letters.map((item, i) => {
              //if (i < 10) {
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
            //  } else { return null; }
            })
          }

        </MapView>
        <LettersMenu
          myLetter={this.props.myLetter}
          letterSelectorPress={() => this.handleLetterSelectorPress()}
          shareLettersPress={() => this.handleShareLettersPress()}
          getLettersPress={() => this.handleGetLettersPress()}
          />
        <DropZone />
        <CameraButton
          text='Camera'
          onPress={() => this.handleCameraButtonPress()}
          />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const isLoading = state.letters.isLoading;
  const isError = state.letters.isError;
  const letters = state.letters.content;
  const myLetter = state.user.letter;

  return {
    isLoading,
    isError,
    letters,
    myLetter,
  };
};

export default connect(mapStateToProps)(NativeMap);
