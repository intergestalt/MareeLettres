import React, { PropTypes, Component } from 'react';
import { StatusBar } from 'react-native';

import { Screen } from '../../components/general/Container';
import { TabBar } from '../../components/general/TabBar';

import { Map } from '../../components/map/Map';
import { LettersMenu, CameraButton, MapScreenMenu } from '../../components/map/Overlay';

import { loadLettersServiceProxy } from '../../helper/apiProxy';
import { loadMyLettersProxy } from '../../helper/mapHelper';

class MapOverview extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  componentDidMount() {
    loadLettersServiceProxy(this.props);
    loadMyLettersProxy(this.props);
  }

  render() {
    return (
      <Screen backgroundColor={'#00aaaa'}>
        <StatusBar />
        <Map navigation={this.props.navigation} />
        <CameraButton navigation={this.props.navigation} />
        <LettersMenu
          letterSelectorPress={() => this.handleLetterSelectorPress()}
          shareLettersPress={() => this.handleShareLettersPress()}
          getLettersPress={() => this.handleGetLettersPress()}
          />
        <MapScreenMenu navigation={this.props.navigation} />
      </Screen>
    );
  }
}

export default MapOverview;
