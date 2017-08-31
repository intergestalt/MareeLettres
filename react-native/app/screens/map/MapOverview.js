import React, { PropTypes, Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';

import { Screen } from '../../components/general/Container';
import { TabBar } from '../../components/general/TabBar';
import { Map } from '../../components/map/Map';
import { LettersMenu, CameraButton, MapScreenMenu } from '../../components/map/Overlay';

import { loadLettersServiceProxy, loadLettersIntervalServiceProxy } from '../../helper/apiProxy';

// NOTE: rm camera until properly implemented
// <CameraButton navigation={this.props.navigation} />

class MapOverview extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    interval: PropTypes.number,
  }

  componentDidMount() {
    loadLettersServiceProxy(this.props);
    this.pollLetters();
  }

  pollLetters() {
    console.ignoredYellowBox = ['Setting a timer'];
    setInterval(() => {
        loadLettersIntervalServiceProxy(this.props);
      },
      this.props.interval
    );
  }

  render() {
    return (
      <Screen backgroundColor={'#00aaaa'}>
        <StatusBar />
        <Map navigation={this.props.navigation} />
        <LettersMenu navigation={this.props.navigation}/>
        <MapScreenMenu navigation={this.props.navigation} />
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const interval = state.config.config.map_update_interval * 1000;

  return {
    interval
  };
}

export default connect(mapStateToProps)(MapOverview);
