import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Timeline } from 'react-twitter-widgets'

import { SystemConfig } from '../../api/systemConfig/systemConfig';

import AdminWrapper from '../components/AdminWrapper';
import Menu from '../components/menu';

class FeedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const feed = this.props.dataIsReady ? (
      <Timeline
        dataSource={{
          sourceType: 'profile',
          screenName: this.props.config.stream_twitter_handle
        }}
        options={{
          username: this.props.config.stream_twitter_handle,
          height: '400'
        }}
        onLoad={() => console.log('Timeline is loaded!')}
      />
    ) : "loading";

    console.log(this.props.config)
    return (
      <AdminWrapper>
        <Menu />
        {feed}
      </AdminWrapper>
    );
  }
}

export default createContainer(() => {
  const dataHandle = Meteor.subscribe('get.config.current');
  const dataIsReady = dataHandle.ready();
  return {
    dataIsReady,
    config: SystemConfig.find({}).fetch()[0],
  };
}, FeedPage);
