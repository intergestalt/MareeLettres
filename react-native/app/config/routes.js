import { TabNavigator, StackNavigator } from 'react-navigation';

import Home from '../screens/single/Home';
import Stream from '../screens/single/Stream';
import Challenges from '../screens/vote/Challenges';
import Dummy1 from '../screens/vote/Dummy1';
import Dummy2 from '../screens/vote/Dummy2';
import MapOverview from '../screens/map/MapOverview';
import How from '../screens/single/How';
import About from '../screens/single/About';

const VoteStack = StackNavigator(
  {
    Challenges: {
      screen: Challenges,
    },
    Dummy1: {
      screen: Dummy1,
    },
    Dummy2: {
      screen: Dummy2,
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
    navigationOptions: {
      tabBarVisible: false,
    },
    // Change this to start on a different tab
    initialRouteName: 'Home',
  },
);
