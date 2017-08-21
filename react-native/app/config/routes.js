import { TabNavigator, StackNavigator } from 'react-navigation';
// import { Easing, Animated } from 'react-native';

import Stream from '../screens/single/Stream';
import Challenges from '../screens/vote/Challenges';
import ChallengeSelector from '../screens/vote/ChallengeSelector';
import Info from '../screens/single/Info';

import MapOverview from '../screens/map/MapOverview';
import MapCamera from '../screens/map/MapCamera';
import LetterSelector from '../screens/map/LetterSelector';
import QRCodeGet from '../screens/map/QRCodeGet';
import QRCodeSend from '../screens/map/QRCodeSend';

import { TabBar } from '../components/general/TabBar';

const MapStack = StackNavigator(
  {
    MapOverview: {
      screen: MapOverview,
    },
    MapCamera: {
      screen: MapCamera,
    },
    LetterSelector: {
      screen: LetterSelector,
    },
    QRCodeGet: {
      screen: QRCodeGet,
    },
    QRCodeSend: {
      screen: QRCodeSend,
    },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

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
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

const tabNavigator = TabNavigator(
  {
    Vote: {
      screen: VoteStack,
    },
    Become: {
      screen: MapStack,
    },
    Stream: {
      screen: Stream,
    },
    Info: {
      screen: Info,
    },
  },
  {
    tabBarPosition: 'top',
    tabBarComponent: TabBar,
    navigationOptions: {
      tabBarVisible: true,
    },
    lazy: true,
    swipeEnabled: false,
    animationEnabled: false,
    // tabBarPosition: 'bottom',
    initialRouteName: 'Become',
  },
);

// for language selection at start
const rootNavigator = StackNavigator({
  Root: {
    screen: tabNavigator,
    navigationOptions: {
      header: null,
    },
  },
});

export default rootNavigator;
