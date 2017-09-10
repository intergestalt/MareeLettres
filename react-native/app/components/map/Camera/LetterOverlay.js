import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { metresToDelta, latLngToScreen, scaleLetterSize } from '../../../helper/mapHelper';


class LetterOverlay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      delta_max: metresToDelta(this.props.config.map_drop_zone_radius * this.props.config.map_delta_max, this.props.map.coordinates.latitude)
    };    
  }

  letterToText(letter, key) {
    const t = new Date().getTime() - new Date(letter.created_at).getTime();
    const opacity = Math.max(0, 1 - t / (1000 * this.props.config.map_letter_decay_time));
    const screenCoords = latLngToScreen(letter.coords.lat, letter.coords.lng, this.props.map.coordinates, this.props.user.map.layout.width, this.props.user.map.layout.height);
    const size = scaleLetterSize(this.props.config.map_letter_base_size * 5, this.props.map.coordinates.latitudeDelta);
    
    return (
      opacity != 0
        ? <Text key={key} style={[styles.letter, {
          position: 'absolute', 
          opacity: opacity,
          fontSize: size,
          left: screenCoords.x - size / 4, 
          top: screenCoords.y - size / 2,
        }]}>{letter.character}</Text>
        : null
    );
  }

  render() {
    
    const mapLetters = [];
    if(this.props.map.coordinates.longitudeDelta <= this.state.delta_max) { // only add markers at all if we are low enough
      Object.keys(this.props.letters.content).forEach((key)=>{
        if(this.props.letters.content[key].showAsMarker) {
          mapLetters.push(this.letterToText(this.props.letters.content[key], key));  
        }
      });
    }
    
    return (
      <View style={styles.overlay}>
        {mapLetters}
      </View>
    );
  }

}

const mapStateToProps = (state) => {
  try {
    const user = state.user;
    const map = state.user.map;
    const config = state.config.config;
    const letters = state.letters;

    return {
      user,
      map,
      config,
      letters
    };
  } catch (e) {
    console.log('LetterOverlay Error', e);
    throw e;
  }
};

export default connect(mapStateToProps)(LetterOverlay);
