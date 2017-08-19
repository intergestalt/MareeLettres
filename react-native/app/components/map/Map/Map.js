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

import { styles, mapstyles } from './styles';

class Map extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    letters: PropTypes.array,
    user: PropTypes.object,
  };

  onPress(region) {
    // click map
  };

  onRegionChange(region) {
    // drag map
  };

  onRegionChangeComplete(region) {
    // after drag map
  };

  handleLetterDrag(letter) {
    console.log('DRAGGED');
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
            latitudeDelta: 0.008, // 0.0922, 0.0421
            longitudeDelta: 0.008,
          }}
    	  customMapStyle={mapstyles}
        >

          <MapView.Circle
            // Drop Zone, TODO: add line dash
            center = {{...coords}}
            radius = {1}
            strokeColor = {'#fff'}
            ></MapView.Circle>
          <MapView.Circle
            center = {{...coords}}
            radius = {300}
            strokeColor = {'rgba(255,255,255,0.25)' }
            fillColor = {'rgba(255,255,255,0.1)'}
            ></MapView.Circle>
          <MapView.Marker
            title={'drop_zone'}
            coordinate={{
              latitude: user.coordinates.latitude + 0.0002,
              longitude: user.coordinates.longitude,
            }} ><Text style={styles.letterDropZone}>DROP ZONE</Text>
          </MapView.Marker>

          {
            this.props.letters.map((item, i) => {
              if (i < 25) {
                let draggable = (item._id === user.origin_id);

                if (draggable) {
                  return (
                    <MapView.Marker
                      draggable
                      onDragEnd={this.handleLetterDrag}
                      key={i}
                      title={item.character}
                      coordinate={{latitude:item.coords.lat, longitude:item.coords.lng}}
                      ><Text style={styles.letterDraggable}>
                        {item.character}
                      </Text>
                    </MapView.Marker>
                  );
                } else {
                  return (
                    <MapView.Marker
                      key={i}
                      coordinate={{latitude:item.coords.lat, longitude:item.coords.lng}}
                      ><Text style={styles.letter}>
                        {item.character}
                      </Text>
                    </MapView.Marker>
                  );
                }
              } else { return null; }
            })
          }

        </MapView>

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

export default connect(mapStateToProps)(Map);
