import React, { PropTypes, Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';

import { Screen } from '../../components/general/Container';
import { NativeMap } from '../../components/map/Map';
import { TabBar } from '../../components/general/TabBar';
import TABS from '../../consts/tab';

import { loadLettersServiceProxy } from '../../helper/apiProxy';

class MapOverview extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  componentWillMount() {
    
  }

  componentDidMount() {
    loadLettersServiceProxy(this.props);
  }

  render() {
    return (
      <Screen backgroundColor={'#00aaaa'}>
        <StatusBar />
        <NativeMap navigation={this.props.navigation} />
        <TabBar selectedTab={TABS.BECOME_TAB} navigation={this.props.navigation} />
      </Screen>
    );
  }
}

export default connect()(MapOverview);
