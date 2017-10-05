import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import mapStyles from './google-maps-style.json';
import './style.css';

import { serverUri } from '../../config/config.js';
const axios = require('axios');

class Letter extends React.Component {
  render() {
    return <div style={this.props.style} className="letter">{this.props.character}</div>
  }
}

const default_map_letter_decay_time = 172800;

const calculateRadius = function(latitudeDelta) {
  let radius = 200;
  if (latitudeDelta >= 0.002) {
    radius = 300;
  }
  if (latitudeDelta >= 0.003) {
    radius = 400;
  }
  if (latitudeDelta >= 0.004) {
    radius = 500;
  }
  if (latitudeDelta >= 0.005) {
    radius = 600;
  }
  if (latitudeDelta >= 0.006) {
    radius = 1000;
  }  
  return radius;
}

const defaultProps = {
  center: {lat: 48.856788, lng: 2.3447006},
  zoom: 16
};

export default class FluxMap extends Component {

  constructor() {
    super();
    this.state = {
      letters: [],
      zoom: defaultProps.zoom,
      mapParams: null
    }
    this.onChange = this.onChange.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.renderMarker = this.renderMarker.bind(this);
    this.pollLetters = this.pollLetters.bind(this);
    this.updateLetters = this.updateLetters.bind(this);
  }

  with3Decimals(num) {
    return num.toString().match(/^-?\d+(?:\.\d{0,3})?/)[0];
  }

  resizeLetters(params = null) {
    if(!this.props.config) {
      console.log("no config found, aborting letter update on map");
      return;
    }
    if(!params) {
      params = this.state.mapParams;
    }
    let latitudeDelta = params.bounds.ne.lat - params.bounds.se.lat;
    let zoomFactor = (params.size.height / latitudeDelta) / 100000; 
    let size = zoomFactor * this.props.config.map_letter_base_size * 0.8; // 0.8 is weird offset for browser sizing
    this.setState({letterSize: size});
  }

  updateLetters(params = null) {
    if(!this.props.config) {
      console.log("no config found, aborting letter update on map");
      return;
    }
    if(!params) {
      params = this.state.mapParams;
    }
    let latitudeDelta = params.bounds.ne.lat - params.bounds.se.lat;
    let limit = 500;
    let radius = calculateRadius(latitudeDelta);
    let requestUri = serverUri + '/api/letters?limit='+limit+'&centerLat=' + this.with3Decimals(params.center.lat) + '&centerLng=' + this.with3Decimals(params.center.lng) + '&radius=' + radius;
    console.log(requestUri);
    axios.get(requestUri)
      .then(response=>{
        console.log("number of letters received from server: " + response.data.letters.length);
        let lettersForMap = response.data.letters.slice(0, limit);
        console.log("putting on map: " + lettersForMap.length);
        this.setState({letters: lettersForMap});
      })
      .catch(error=>{
        console.log(error);
      });
  }

  onChange(params) {
    console.log("on change");
    this.setState({mapParams: params});
    this.resizeLetters(params);
    setTimeout(()=>{
      this.updateLetters(params);  
    }, 200);
  }

  pollLetters() {
    let timeout = 10000;
    if(this.props.config) {
      if(this.props.config.map_update_interval) {
        timeout = this.props.config.map_update_interval * 1000
      }
    }
   
    setTimeout(()=>{
      console.log("polling map letters");
      this.updateLetters();
      this.pollLetters();
    }, timeout);
  }

  componentDidMount() {
    this.pollLetters();
  }

  zoomIn() {
    console.log("zoom in");
    if(this.state.zoom < 20) {
      this.setState({zoom: this.state.zoom + 1});  
    }
  }

  zoomOut() {
    console.log("zoom out");
    if(this.state.zoom > 5) {
      this.setState({zoom: this.state.zoom - 1});  
    }
  }

  renderMarker(l) {
    const t = new Date().getTime() - new Date(l.created_at).getTime();
    const opacity = Math.max(0, 1 - t / (1000 * (this.props.config ? this.props.config.map_letter_decay_time : default_map_letter_decay_time)));

    const markerStyle = {
      position: 'absolute',
      width: this.state.letterSize,
      height: this.state.letterSize,
      left: -this.state.letterSize / 2,
      top: -this.state.letterSize / 2,
      opacity: opacity, 
      fontSize: this.state.letterSize
    }

    return(
      <Letter
        style={markerStyle}
        key={l._id}
        lat={l.coords.lat}
        lng={l.coords.lng}
        character={l.character}
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
    let center = this.props.screenId && this.props.config ? 
        {lat: this.props.config["screen_" + this.props.screenId + "_lat"], lng: this.props.config["screen_" + this.props.screenId + "_lng"]}
        : defaultProps.center;
    let zoom = this.props.screenId && this.props.config ? this.props.config["screen_" + this.props.screenId + "_zoom"] : this.state.zoom;
    console.log("map render with zoom: " + zoom);
    return (
      <div 
        style={this.props.display ? {display: this.props.display} : null}
        className="mapContainer"
      >
        <GoogleMapReact
          id="map"
          center={center}
          zoom={zoom}
          bootstrapURLKeys={{ key: "AIzaSyA5D5Qxs0fDKabuxgLp_1tuFt1_eECJDR0" }}
          options={{ styles: mapStyles, mapTypeControl: false, zoomControl: false, fullscreenControl: false, streetViewControl: false }}
          onChange={this.onChange}
          resetBoundsOnResize={true}
        >
         {this.renderMarkers()}
        </GoogleMapReact>
        
        {!this.props.screenId ? (<img id="zoom_in" className="mapButton" src="assets/zoom_in.svg" alt="zoom in control" onClick={this.zoomIn}/>):null}
        {!this.props.screenId ? (<img id="zoom_out" className="mapButton" src="assets/zoom_out.svg" alt="zoom out control" onClick={this.zoomOut}/>):null}
        {!this.props.screenId ? (<img 
            id="fullscreen" 
            className="mapButton" 
            src={this.props.mapExpansion < 2 ? "assets/fullscreen.svg" : "assets/minimize.svg"}
            alt="fullscreen control" 
            onClick={this.props.expandMap}
          />
        ) : null}
      </div>
    );
  }
}
