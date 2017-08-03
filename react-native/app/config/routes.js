import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { View } from 'react-native';

import Home from '../screens/single/Home';
import Stream from '../screens/single/Stream';
import Challenges from '../screens/vote/Challenges';
import ChallengeSelector from '../screens/vote/ChallengeSelector';
import MapOverview from '../screens/map/MapOverview';
import How from '../screens/single/How';
import About from '../screens/single/About';
import { TabBar } from '../components/general/TabBar';

const VoteStack = StackNavigator(
  {
    Challenges: {
      screen: Challenges,
    },
    ChallengeSelector: {
      screen: ChallengeSelector,
    },
  },
  {
    headerMode: 'none',
  },
);

export default TabNavigator(
  {
    Home: {
      screen: Home,
    },
    Vote: {
      screen: VoteStack,
    },
    Become: {
      screen: MapOverview,
    },
    Stream: {
      screen: Stream,
    },
    About: {
      screen: About,
    },
    How: {
      screen: How,
    },
  },
  {
    tabBarComponent: TabBar,
    navigationOptions: {
      tabBarVisible: true,
    },
    lazy: true,
    //    tabBarPosition: 'bottom',
    // swipeEnabled: true,
    // Change this to start on a different tab
    initialRouteName: 'Home',
  },
);
