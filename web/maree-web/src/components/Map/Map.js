import React from 'react';
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
} from "react-google-maps";
import mapStyles from "./google-maps-style.json";

const FluxMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCfyWQ_dsbZvIyYUVMwPAuXTuM5wwJprXg",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, width: `100%`}} />,
    mapElement: <div style={{ height: `100%` }} />,
    center: { lat: 25.03, lng: 121.6 },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{lat: 48.856788, lng: 2.3447006}}
    defaultOptions={{ styles: mapStyles, mapTypeControl: false, zoomControl: false, fullscreenControl: false, streetViewControl: false }}
  
AIzaSyCfyWQ_dsbZvIyYUVMwPAuXTuM5wwJprXg

  >
  </GoogleMap>
);

export default FluxMap;