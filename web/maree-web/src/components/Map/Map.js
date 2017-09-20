import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import mapStyles from './google-maps-style.json';
import './style.css';

import { serverUri } from '../../config/config.js';
const axios = require('axios');

class Letter extends React.Component {
  render() {
    return <div style={{opacity:this.props.opacity, fontSize: this.props.size}} className="letter">{this.props.character}</div>
  }
}

const map_letter_decay_time = 5000;

const calculateRadius = function(latitudeDelta) {
  let radius = 1;
  if (latitudeDelta >= 0.002 && latitudeDelta < 0.003) {
    radius = 2;
  }
  if (latitudeDelta >= 0.003 && latitudeDelta < 0.004) {
    radius = 3;
  }
  if (latitudeDelta >= 0.004) {
    radius = 4;
  }
  const radiusMeters = Math.floor((radius * 0.001) * 40008000 / 360); // rough estimation
  return radiusMeters;
}

const defaultProps = {
  center: {lat: 48.856788, lng: 2.3447006},
  zoom: 16
};

export default class FluxMap extends Component {

  constructor() {
    super();
    this.state = {
      letters: []
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(params) {
    let latitudeDelta = params.bounds.ne.lat - params.bounds.se.lat;
    let radius = calculateRadius(latitudeDelta);
    let requestUri = serverUri + '/api/letters?centerLat=' + params.center.lat + '&centerLng=' + params.center.lng + '&radius=' + radius;
    console.log(requestUri);
    axios.get(requestUri)
      .then(response=>{  
        let size = 1 / (10 * latitudeDelta);
        this.setState({letters: response.data.letters, letterSize: size});
      })
      .catch(error=>{
        console.log(error);
      });
  }

  renderMarker(l) {
    const t = new Date().getTime() - new Date(l.created_at).getTime();
    const opacity = Math.max(0, 1 - t / (1000 * map_letter_decay_time));

    return(
      <Letter
        key={l._id}
        lat={l.coords.lat}
        lng={l.coords.lng}
        character={l.character}
        opacity={opacity} // todo calculate from date like in app
        size={this.state.letterSize}
      />
    );
  }

  renderMarkers() {
    if(this.state.letters) {
      const letterArray = this.state.letters.map(l=>{return this.renderMarker(l)});  
      return letterArray;
    } else {
      return [];
    }
    
  }

  render() {
    return (
      <GoogleMapReact
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        bootstrapURLKeys={{ key: "AIzaSyCfyWQ_dsbZvIyYUVMwPAuXTuM5wwJprXg" }}
        options={{ styles: mapStyles, mapTypeControl: false, zoomControl: false, fullscreenControl: false, streetViewControl: false }}
        onChange={this.onChange}
      >
       {this.renderMarkers()}
      </GoogleMapReact>
    );
  }
}
