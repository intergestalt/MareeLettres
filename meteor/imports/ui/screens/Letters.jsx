import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import Menu from '../components/menu';

import AdminWrapper from '../components/AdminWrapper';
import { Letters } from '../../api/letters/letters';

class LettersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.position = [48.864716, 2.349014];
    this.updatePosition = this.updatePosition.bind(this);
  }

  updatePosition(id) {
    // const { lat, lng } = this.refs[id].leafletElement.getLatLng();
    console.log(id);
    console.log(this.refs[id]);
    // console.log(lat, lng);
  }

  renderMarkers() {
    return this.props.letters.map(l =>
      <Marker
        key={l._id}
        draggable={false}
        ondragend={this.updatePosition(l._id)}
        ref={l._id}
        position={l.coords}
      >
        <Popup>
          <div>
            {JSON.stringify(l)}
          </div>
        </Popup>
      </Marker>,
    );
  }

  render() {
    return (
      <AdminWrapper>
        <Menu />
        <div className="map-container">
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.1.0/leaflet.css"
          />
          <Map center={this.position} zoom={13}>
            <TileLayer
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            {this.renderMarkers()}
          </Map>
        </div>
      </AdminWrapper>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('get.letters');

  return {
    letters: Letters.find().fetch(),
  };
}, LettersPage);
