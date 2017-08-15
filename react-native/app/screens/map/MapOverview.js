import React, { PropTypes, Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';

import { Screen } from '../../components/general/Container';
import { NativeMap } from '../../components/map/Map';
import { TabBar } from '../../components/general/TabBar';

import { loadLettersServiceProxy } from '../../helper/apiProxy';

// 1. Get letters from API_PREFIX
// 2. Map function to spit out Components
// 3. ???

class MapOverview extends Component {
  static navigationOptions = {
    title: 'Map',
  };

  static propTypes = {
    navigation: PropTypes.object,
  };

  componentDidMount() {
    loadLettersServiceProxy(this.props);
  }

  render() {
    return (
      <Screen backgroundColor={'#00aaaa'}>
        <StatusBar />
        <NativeMap />
        <TabBar navigation={this.props.navigation} />
      </Screen>
    );
  }
}

export default connect()(MapOverview);
