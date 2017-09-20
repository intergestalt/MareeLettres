import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import mapStyles from './google-maps-style.json';
import './style.css';

import { serverUri } from '../../config/config.js';
const axios = require('axios');

class Letter extends React.Component {
  render() {
    return <div style={{opacity:this.props.opacity}} className="letter">{this.props.character}</div>
  }
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
    let requestUri = serverUri + '/api/letters?centerLat=' + params.center.lat + '&centerLng=' + params.center.lng + '&radius=500';
    console.log(requestUri);
    axios.get(requestUri)
      .then(response=>{
        this.setState({letters: response.data.letters});
      })
      .catch(error=>{
        console.log(error);
      });
  }

  renderMarker(l) {
    return(
      <Letter
        key={l._id}
        lat={l.coords.lat}
        lng={l.coords.lng}
        character={l.character}
        opacity={0.5} // todo calculate from date like in app
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
