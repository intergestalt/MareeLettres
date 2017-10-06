import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import _ from 'underscore';

import AdminWrapper from '../components/AdminWrapper';
import FluxMap from '../components/fluxmap/Map';

import { Letters } from '../../api/letters/letters';
import { SystemConfig } from '../../api/systemConfig/systemConfig';

class LettersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    Session.setDefault('requestObject', {});
    this.handleMarkerClicked = this.handleMarkerClicked.bind(this)
  }

  handleRegionChange(requestObject) {
    Session.set('requestObject', requestObject);
  }

  handleMarkerClicked(id) {
    console.log(id)
    Session.set('DetailsLetterId', id)
  }

  render() {
    return (
      <AdminWrapper>
        <div>
          <div>Letter: {this.props.detailLetter ? this.props.detailLetter.character : ''}</div>
          <div>Origin: {this.props.detailLetter ?
            <Link to={'/admin/players/' + this.props.detailLetter.origin_id}>{this.props.detailLetter.origin_id}</Link>
            : ''}</div>
        </div>
        <div className="map-container">
          {this.props.dataIsReady && <FluxMap config={this.props.config} letters={this.props.letters} onRegionChange={this.handleRegionChange} onClickMarker={this.handleMarkerClicked} highlightIds={this.props.highlightLettersIds} />}
        </div>
      </AdminWrapper>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('get.letters', Session.get('requestObject'));
  const dataHandle = Meteor.subscribe('get.config.current');
  const dataIsReady = dataHandle.ready();
  const detailsId = Session.get('DetailsLetterId');
  const detailLetter = Letters.findOne(detailsId);
  const highlightLetters = detailLetter && detailLetter.origin_id ? Letters.find({ origin_id: detailLetter.origin_id }, { fields: { origin_id: 1, _id: 1 } }).fetch() : {};
  const highlightLettersIds = _.pluck(highlightLetters, '_id');

  console.log(detailLetter, highlightLettersIds);

  return {
    letters: Letters.find().fetch(),
    config: SystemConfig.find({}).fetch()[0],
    detailsId,
    dataIsReady,
    detailLetter,
    highlightLettersIds,
  };
}, LettersPage);
