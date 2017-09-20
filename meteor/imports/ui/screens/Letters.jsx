import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import Menu from '../components/menu';

import AdminWrapper from '../components/AdminWrapper';
import { Letters } from '../../api/letters/letters';
import { SystemConfig } from '../../api/systemConfig/systemConfig';

class LettersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.updatePosition = this.updatePosition.bind(this);
  }

  updatePosition(id) {
    // const { lat, lng } = this.refs[id].leafletElement.getLatLng();
    // console.log(id);
    // console.log(this.refs[id]);
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

  renderMap() {
    if (!this.props.dataIsReady) return;

    const position = [this.props.config.map_default_center_lat, this.props.config.map_default_center_lng];
    return (
      <Map center={position} zoom={13}>
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {this.renderMarkers()}
      </Map>
    );
  }

  renderDefaultPosition() {
    if (!this.props.dataIsReady) return;

    return (
      <div>
        <tt>Default Center: {this.props.config.map_default_center_lat}, {this.props.config.map_default_center_lng}</tt>
      </div>
    )
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
          {this.renderMap()}
          {this.renderDefaultPosition()}
        </div>
      </AdminWrapper>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('get.letters');
  const dataHandle = Meteor.subscribe('get.config.current');
  const dataIsReady = dataHandle.ready();

  return {
    letters: Letters.find().fetch(),
    config: SystemConfig.find({}).fetch()[0],
    dataIsReady,
  };
}, LettersPage);
